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
        <div class="header-actions">
          <span class="badge" [ngClass]="getStatusClass(response()!.status)">
            {{ response()!.status }}
          </span>
          <span class="duration">{{ response()!.duration }}ms</span>
          <button class="btn-icon" (click)="copyResponse()" title="Copy Body">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
          </button>
        </div>
      </div>

      <div class="tab-content">
        <pre><code class="code-block">{{ response()!.body | json }}</code></pre>
      </div>
    </div>
  `,
  styles: [`
    .response-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }
    .header-actions {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
    .response-header h3 { margin: 0; font-size: 1.1rem; }
    .duration {
      font-size: 0.8rem;
      color: var(--text-muted);
    }
    .btn-icon {
      background: none;
      border: none;
      padding: 0.4rem;
      border-radius: 4px;
      color: var(--text-muted);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .btn-icon:hover {
      background: rgba(0,0,0,0.05);
      color: var(--primary-color);
    }
    .tab-content {
      background: var(--code-bg, #1e293b);
      padding: 1.25rem;
      border-radius: var(--radius-md);
      max-height: 500px;
      overflow: auto;
      border: 1px solid var(--border-color);
      box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);
    }
    pre { margin: 0; }
    .code-block {
      font-family: 'Fira Code', 'Roboto Mono', monospace;
      font-size: 0.85rem;
      color: #e2e8f0;
      line-height: 1.6;
      white-space: pre-wrap;
      word-break: break-all;
    }
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

  copyResponse() {
    if (!this.response()) return;
    const body = JSON.stringify(this.response()?.body, null, 2);
    navigator.clipboard.writeText(body).then(() => {
      alert('Copied to clipboard!');
    });
  }
}
