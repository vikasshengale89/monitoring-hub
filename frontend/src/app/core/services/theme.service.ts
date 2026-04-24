import { Injectable, signal, effect } from '@angular/core';

export type ThemeMode = 'sunrise' | 'day' | 'sunset' | 'night';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  currentTheme = signal<ThemeMode>('day');

  constructor() {
    this.updateThemeBasedOnTime();
    // Update theme every hour
    setInterval(() => this.updateThemeBasedOnTime(), 3600000);
  }

  private updateThemeBasedOnTime() {
    const hour = new Date().getHours();
    
    if (hour >= 5 && hour < 8) {
      this.currentTheme.set('sunrise');
    } else if (hour >= 8 && hour < 17) {
      this.currentTheme.set('day');
    } else if (hour >= 17 && hour < 20) {
      this.currentTheme.set('sunset');
    } else {
      this.currentTheme.set('night');
    }
    
    this.applyTheme(this.currentTheme());
  }

  private applyTheme(theme: ThemeMode) {
    const root = document.documentElement;
    
    const themes = {
      sunrise: {
        '--bg-color': '#fff7ed',
        '--header-bg': '#ffedd5',
        '--primary-color': '#f97316',
        '--primary-hover': '#ea580c',
        '--text-color': '#431407',
      },
      day: {
        '--bg-color': '#f8fafc',
        '--header-bg': '#ffffff',
        '--primary-color': '#3b82f6',
        '--primary-hover': '#2563eb',
        '--text-color': '#1e293b',
      },
      sunset: {
        '--bg-color': '#fdf2f8',
        '--header-bg': '#fce7f3',
        '--primary-color': '#db2777',
        '--primary-hover': '#be185d',
        '--text-color': '#500724',
      },
      night: {
        '--bg-color': '#0f172a',
        '--header-bg': '#1e293b',
        '--primary-color': '#818cf8',
        '--primary-hover': '#6366f1',
        '--text-color': '#f8fafc',
        '--card-bg': '#1e293b',
        '--border-color': '#334155',
        '--text-muted': '#94a3b8',
      }
    };

    const config = themes[theme];
    Object.entries(config).forEach(([prop, value]) => {
      root.style.setProperty(prop, value);
    });

    // Reset night-only properties if not night
    if (theme !== 'night') {
      root.style.setProperty('--card-bg', '#ffffff');
      root.style.setProperty('--border-color', '#e2e8f0');
      root.style.setProperty('--text-muted', '#64748b');
    }
  }
}
