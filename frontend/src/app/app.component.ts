import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './core/services/theme.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  template: `
    <div class="app-container">
      <header class="main-header">
        <h1>Monitoring Hub</h1>
        <p>Secure API Proxy & Monitoring Dashboard</p>
        <div class="theme-badge">Mode: {{ themeService.currentTheme() | titlecase }}</div>
      </header>
      <main>
        <router-outlet></router-outlet>
      </main>
      <footer>
        <p>&copy; 2026 Monitoring Hub - Built for PromptWars</p>
      </footer>
    </div>
  `,
  styles: [`
    .app-container {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      font-family: 'Inter', sans-serif;
      background: var(--bg-color, #f8fafc);
      color: var(--text-color, #1e293b);
      transition: all 0.5s ease;
    }
    .main-header {
      padding: 2rem;
      background: var(--header-bg, #ffffff);
      border-bottom: 1px solid var(--border-color);
      text-align: center;
      position: relative;
      transition: all 0.5s ease;
    }
    .theme-badge {
      position: absolute;
      top: 1rem;
      right: 1rem;
      font-size: 0.75rem;
      padding: 0.25rem 0.5rem;
      background: rgba(0,0,0,0.05);
      border-radius: 4px;
      text-transform: capitalize;
    }
    .main-header h1 {
      margin: 0;
      font-size: 2rem;
      color: var(--primary-color, #3b82f6);
    }
    main {
      flex: 1;
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
      width: 100%;
    }
    footer {
      padding: 1.5rem;
      text-align: center;
      border-top: 1px solid var(--border-color);
      font-size: 0.875rem;
      color: var(--text-muted);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  themeService = inject(ThemeService);
}
