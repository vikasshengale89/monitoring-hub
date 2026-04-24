import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { RequestLog } from '../../../core/services/proxy.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-history-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card history-card">
      <div class="card-header">
        <h3>Recent Activity</h3>
      </div>
      <div class="history-table-wrapper">
        <table class="history-table">
          <thead>
            <tr>
              <th>Method</th>
              <th>Status</th>
              <th>URL</th>
              <th class="text-right">Time</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let item of history()" class="history-row">
              <td>
                <span class="method-tag" [ngClass]="item.method.toLowerCase()">
                  {{ item.method }}
                </span>
              </td>
              <td>
                <span class="status-badge" [ngClass]="getStatusClass(item.status)">
                  {{ item.status }}
                </span>
              </td>
              <td class="url-cell">
                <span class="url-text" [title]="item.url">{{ item.url }}</span>
              </td>
              <td class="text-right time-cell">
                <span class="duration">{{ item.duration }}ms</span>
                <span class="time">{{ item.timestamp | date:'HH:mm' }}</span>
              </td>
            </tr>
            <tr *ngIf="history().length === 0">
              <td colspan="4" class="empty-state">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="empty-icon"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                <p>No activity recorded yet</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .history-card { padding: 0; overflow: hidden; }
    .card-header { padding: 1.5rem; border-bottom: 1px solid var(--border-color); }
    .card-header h3 { margin: 0; font-size: 1.1rem; }
    
    .history-table-wrapper { overflow-x: auto; }
    .history-table { width: 100%; border-collapse: collapse; }
    .history-table th {
      text-align: left;
      padding: 1rem 1.5rem;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--text-muted);
      background: rgba(0,0,0,0.02);
    }
    .history-row:hover { background: rgba(0,0,0,0.02); }
    .history-table td { padding: 1rem 1.5rem; border-bottom: 1px solid var(--border-color); }
    
    .method-tag {
      font-size: 0.7rem;
      font-weight: 700;
      padding: 0.2rem 0.4rem;
      border-radius: 4px;
      background: #e2e8f0;
      color: #475569;
    }
    .method-tag.get { background: #dcfce7; color: #15803d; }
    .method-tag.post { background: #dbeafe; color: #1d4ed8; }
    .method-tag.put { background: #fef3c7; color: #b45309; }
    .method-tag.delete { background: #fee2e2; color: #b91c1c; }

    .status-badge {
      font-size: 0.75rem;
      font-weight: 600;
    }
    .status-badge.badge-success { color: var(--success-color); }
    .status-badge.badge-error { color: var(--error-color); }

    .url-cell { max-width: 200px; }
    .url-text {
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 0.85rem;
      color: var(--text-muted);
    }

    .text-right { text-align: right; }
    .time-cell { display: flex; flex-direction: column; align-items: flex-end; gap: 0.2rem; }
    .duration { font-size: 0.75rem; font-weight: 600; color: var(--text-color); }
    .time { font-size: 0.7rem; color: var(--text-muted); }

    .empty-state {
      text-align: center;
      padding: 4rem 2rem;
      color: var(--text-muted);
    }
    .empty-icon { margin-bottom: 1rem; opacity: 0.2; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistoryListComponent {
  history = input.required<RequestLog[]>();

  getStatusClass(status: number) {
    if (status >= 200 && status < 300) return 'badge-success';
    if (status >= 400) return 'badge-error';
    return 'badge-warning';
  }
}
