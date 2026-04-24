import { Component, ChangeDetectionStrategy, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProxyService, ProxyRequest, ProxyResponse } from '../../core/services/proxy.service';
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
    <div class="dashboard">
      <section class="stats-grid" *ngIf="proxyService.stats() as stats">
        <div class="stat-card">
          <label>Total Requests</label>
          <div class="value">{{ stats.totalRequests }}</div>
        </div>
        <div class="stat-card">
          <label>Success Rate</label>
          <div class="value success">{{ getSuccessRate(stats) }}%</div>
        </div>
        <div class="stat-card">
          <label>Avg Response Time</label>
          <div class="value">{{ stats.avgResponseTime | number:'1.0-0' }}ms</div>
        </div>
        <div class="stat-card">
          <label>Failed</label>
          <div class="value error">{{ stats.failedRequests }}</div>
        </div>
      </section>

      <div class="main-content">
        <div class="tester-column">
          <app-request-form 
            (submitRequest)="handleRequest($event)"
            [loading]="proxyService.loading()">
          </app-request-form>
          
          <app-response-view [response]="currentResponse()"></app-response-view>
        </div>

        <div class="history-column">
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
    }
    .stat-card label {
      display: block;
      font-size: 0.875rem;
      color: var(--text-muted);
      margin-bottom: 0.5rem;
    }
    .stat-card .value {
      font-size: 1.5rem;
      font-weight: 700;
    }
    .stat-card .value.success { color: var(--success-color); }
    .stat-card .value.error { color: var(--error-color); }

    .main-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
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

  getSuccessRate(stats: any) {
    if (stats.totalRequests === 0) return 0;
    return Math.round((stats.successfulRequests / stats.totalRequests) * 100);
  }
}
