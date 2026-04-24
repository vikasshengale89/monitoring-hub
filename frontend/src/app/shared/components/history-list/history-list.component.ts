import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { RequestLog } from '../../../core/services/proxy.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-history-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card">
      <h3>Recent Activity</h3>
      <div class="history-table-wrapper">
        <table class="history-table">
          <thead>
            <tr>
              <th>Method</th>
              <th>URL</th>
              <th>Status</th>
              <th>Duration</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let item of history()">
              <td><span class="method-tag">{{ item.method }}</span></td>
              <td class="url-cell" [title]="item.url">{{ item.url }}</td>
              <td>
                <span class="badge" [ngClass]="getStatusClass(item.status)">
                  {{ item.status }}
                </span>
              </td>
              <td>{{ item.duration }}ms</td>
              <td>{{ item.timestamp | date:'shortTime' }}</td>
            </tr>
            <tr *ngIf="history().length === 0">
              <td colspan="5" class="empty-state">No requests yet.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .history-table-wrapper {
      overflow-x: auto;
    }
    .history-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.875rem;
    }
    .history-table th {
      text-align: left;
      padding: 0.75rem;
      border-bottom: 2px solid var(--border-color);
      color: var(--text-muted);
    }
    .history-table td {
      padding: 0.75rem;
      border-bottom: 1px solid var(--border-color);
    }
    .method-tag {
      font-weight: 700;
      color: var(--primary-color);
    }
    .url-cell {
      max-width: 300px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .empty-state {
      text-align: center;
      padding: 2rem;
      color: var(--text-muted);
    }
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
