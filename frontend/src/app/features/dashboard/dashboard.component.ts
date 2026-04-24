import { Component, ChangeDetectionStrategy, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProxyService, ProxyRequest, ProxyResponse, Stats } from '../../core/services/proxy.service';
import { RequestFormComponent } from '../../shared/components/request-form/request-form.component';
import { ResponseViewComponent } from '../../shared/components/response-view/response-view.component';
import { HistoryListComponent } from '../../shared/components/history-list/history-list.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule, 
    RequestFormComponent, 
    ResponseViewComponent, 
    HistoryListComponent
  ],
  template: `
    <div class="dashboard fade-in">
      <section class="stats-grid">
        <div class="stat-card">
          <label>Total Requests</label>
          <div class="value">{{ (proxyService.stats()?.totalRequests || 0) }}</div>
        </div>
        <div class="stat-card">
          <label>Success Rate</label>
          <div class="value success">{{ getSuccessRate(proxyService.stats()) }}%</div>
        </div>
        <div class="stat-card">
          <label>Avg Response Time</label>
          <div class="value">{{ (proxyService.stats()?.avgResponseTime || 0) | number:'1.0-0' }}ms</div>
        </div>
        <div class="stat-card">
          <label>Failed</label>
          <div class="value error">{{ (proxyService.stats()?.failedRequests || 0) }}</div>
        </div>
      </section>

      <div class="main-content">
        <div class="tester-column slide-up">
          <app-request-form 
            (submitRequest)="handleRequest($event)"
            [loading]="proxyService.loading()">
          </app-request-form>
          
          <app-response-view [response]="currentResponse()"></app-response-view>
        </div>

        <div class="history-column slide-up" style="animation-delay: 0.1s">
          <app-history-list [history]="proxyService.history()"></app-history-list>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      animation: fadeIn 0.6s ease-out;
    }
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1.5rem;
    }
    .stat-card {
      background: var(--card-bg);
      padding: 1.5rem;
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-sm);
      border: 1px solid var(--border-color);
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .stat-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-md);
    }
    .stat-card label {
      display: block;
      font-size: 0.8rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--text-muted);
      margin-bottom: 0.5rem;
    }
    .stat-card .value {
      font-size: 1.75rem;
      font-weight: 800;
    }
    .stat-card .value.success { color: var(--success-color); }
    .stat-card .value.error { color: var(--error-color); }

    .main-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
    }

    .fade-in { animation: fadeIn 0.5s ease-in; }
    .slide-up { animation: slideUp 0.5s ease-out; }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes slideUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @media (max-width: 1024px) {
      .main-content {
        grid-template-columns: 1fr;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  proxyService = inject(ProxyService);
  currentResponse = signal<ProxyResponse | null>(null);

  ngOnInit() {
    this.proxyService.refreshHistory();
    this.proxyService.refreshStats();
  }

  handleRequest(request: ProxyRequest) {
    this.proxyService.executeProxy(request).subscribe({
      next: (res) => this.currentResponse.set(res),
      error: (err) => {
        console.error('Proxy Error:', err);
        // We could set a mock response here to show the error in the UI
        this.currentResponse.set({
          status: 500,
          headers: {},
          body: err.error || { message: 'Unknown error occurred' },
          duration: err.error?.duration || 0
        });
      }
    });
  }

  getSuccessRate(stats: Stats | null) {
    if (!stats || stats.totalRequests === 0) return 0;
    return Math.round((stats.successfulRequests / stats.totalRequests) * 100);
  }
}
