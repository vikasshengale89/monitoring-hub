import { Component, ChangeDetectionStrategy, output, inject, signal, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProxyRequest } from '../../../core/services/proxy.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-request-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="card">
      <h3>Test API</h3>
      <form (submit)="handleSubmit()">
        <div class="form-group">
          <label>URL</label>
          <input type="url" [(ngModel)]="request.url" name="url" placeholder="https://api.example.com/data" required>
        </div>
        
        <div class="row">
          <div class="form-group half">
            <label>Method</label>
            <select [(ngModel)]="request.method" name="method">
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
              <option value="PATCH">PATCH</option>
            </select>
          </div>
          <div class="form-group half">
             <button type="submit" class="btn-primary" [disabled]="loading()">
               {{ loading() ? 'Sending...' : 'Send Request' }}
             </button>
          </div>
        </div>

        <div class="form-group">
          <label>Request Body (JSON)</label>
          <textarea [(ngModel)]="bodyJson" name="body" rows="4" placeholder='{"key": "value"}'></textarea>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
      font-size: 0.875rem;
    }
    .row {
      display: flex;
      gap: 1rem;
      align-items: flex-end;
    }
    .half {
      flex: 1;
    }
    .btn-primary {
      width: 100%;
      height: 46px;
      background: var(--primary-color);
      color: white;
      font-size: 1rem;
    }
    .btn-primary:hover:not(:disabled) {
      background: var(--primary-hover);
    }
    .btn-primary:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
    textarea {
      font-family: monospace;
      resize: vertical;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestFormComponent {
  submitRequest = output<ProxyRequest>();
  loading = input<boolean>(false);

  request: ProxyRequest = {
    url: '',
    method: 'GET',
    headers: {},
    body: null
  };

  bodyJson = '';

  handleSubmit() {
    if (!this.request.url) return;

    try {
      this.request.body = this.bodyJson ? JSON.parse(this.bodyJson) : null;
    } catch (e) {
      alert('Invalid JSON in body');
      return;
    }

    this.submitRequest.emit({ ...this.request });
  }
}
