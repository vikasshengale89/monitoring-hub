import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { ProxyResponse } from '../../../core/services/proxy.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-response-view',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card" *ngIf="response()">
      <div class="response-header">
        <h3>Response</h3>
        <span class="badge" [ngClass]="getStatusClass(response()!.status)">
          Status: {{ response()!.status }}
        </span>
        <span class="duration">{{ response()!.duration }}ms</span>
      </div>

      <div class="tabs">
        <button class="tab-btn active">Body</button>
      </div>

      <div class="tab-content">
        <pre><code>{{ response()!.body | json }}</code></pre>
      </div>
    </div>
  `,
  styles: [`
    .response-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1rem;
    }
    .response-header h3 { margin: 0; }
    .duration {
      font-size: 0.875rem;
      color: var(--text-muted);
      margin-left: auto;
    }
    .tab-content {
      background: #f1f5f9;
      padding: 1rem;
      border-radius: var(--radius-md);
      max-height: 400px;
      overflow: auto;
      border: 1px solid var(--border-color);
    }
    pre { margin: 0; font-size: 0.875rem; }
    code { font-family: monospace; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResponseViewComponent {
  response = input<ProxyResponse | null>(null);

  getStatusClass(status: number) {
    if (status >= 200 && status < 300) return 'badge-success';
    if (status >= 400) return 'badge-error';
    return 'badge-warning';
  }
}
