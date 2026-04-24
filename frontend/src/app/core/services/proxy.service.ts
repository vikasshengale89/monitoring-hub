import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, map, Observable, of } from 'rxjs';

export interface ProxyRequest {
  url: string;
  method?: string;
  headers?: Record<string, string>;
  body?: any;
}

export interface ProxyResponse {
  status: number;
  headers: Record<string, string>;
  body: any;
  duration: number;
}

export interface RequestLog {
  id: string;
  url: string;
  method: string;
  status: number;
  timestamp: number;
  duration: number;
  responseSize?: number;
  error?: string;
}

export interface Stats {
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  avgResponseTime: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProxyService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  history = signal<RequestLog[]>([]);
  stats = signal<Stats | null>(null);
  loading = signal<boolean>(false);

  executeProxy(request: ProxyRequest): Observable<ProxyResponse> {
    this.loading.set(true);
    return this.http.post<ProxyResponse>(`${this.apiUrl}/v1/proxy`, request).pipe(
      map(res => {
        this.refreshHistory();
        this.refreshStats();
        this.loading.set(false);
        return res;
      }),
      catchError(err => {
        this.refreshHistory();
        this.refreshStats();
        this.loading.set(false);
        throw err;
      })
    );
  }

  refreshHistory() {
    this.http.get<RequestLog[]>(`${this.apiUrl}/v1/history`).subscribe(history => {
      this.history.set(history);
    });
  }

  refreshStats() {
    this.http.get<Stats>(`${this.apiUrl}/v1/stats`).subscribe(stats => {
      this.stats.set(stats);
    });
  }
}
