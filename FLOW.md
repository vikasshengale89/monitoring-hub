# Application Flow - monitoring-hub

## Architecture Diagram (ASCII)

```
+----------------+      +-------------------+      +---------------------+
|   Frontend     |      |      Backend      |      |     External API    |
| (Angular 19)   | <--> |  (Node/Express)   | <--> | (JSON/XML/REST/etc) |
+-------+--------+      +---------+---------+      +---------------------+
        |                         |
        |      +------------------+------------------+
        |      |                                     |
        v      v                                     v
 [State: Signals]                       [In-Memory History/Stats]
```

## Application Startup Flow

1. **Backend:**
    - `index.ts` starts Express server.
    - `app.ts` configures middleware (CORS, Helmet, Morgan).
    - Routes are registered under `/api/v1`.
    - Server listens on PORT 3000.

2. **Frontend:**
    - `main.ts` bootstraps the app with `appConfig`.
    - `appConfig` provides `ZonelessChangeDetection` and `HttpClient`.
    - `ThemeService` initializes and applies theme based on current time.
    - `DashboardComponent` is lazy-loaded on the root path.

## User Interaction Flow: API Proxy

1. User enters URL, Method, and Body in `RequestFormComponent`.
2. User clicks "Send Request".
3. `RequestFormComponent` emits `ProxyRequest` to `DashboardComponent`.
4. `DashboardComponent` calls `ProxyService.executeProxy(request)`.
5. `ProxyService` sends POST to `/api/v1/proxy`.
6. **Backend Controller (`proxy.controller.ts`):**
    - Validates URL (SSRF check).
    - Forwards request using `axios`.
    - Logs results (History/Stats).
    - Returns response body, headers, and duration.
7. `ProxyService` updates `history` and `stats` signals.
8. `ResponseViewComponent` and `HistoryListComponent` update automatically via Signals.

## Route Map

| Path | Component | Lazy Loaded | Guard |
|------|-----------|-------------|-------|
| `/` | `DashboardComponent` | Yes | None |
| `**` | Redirect to `/` | No | None |

## API Contract

| Method | Path | Request Body | Response |
|--------|------|--------------|----------|
| POST | `/api/v1/proxy` | `{ url, method, headers, body }` | `{ status, headers, body, duration }` |
| GET | `/api/v1/history` | None | `Array<RequestLog>` |
| GET | `/api/v1/stats` | None | `{ totalRequests, successfulRequests, ... }` |

## Security Flow

1. **CORS:** Backend only allows origins defined in `.env`.
2. **SSRF:** Backend blocks requests to `localhost` and private IPs.
3. **Input Validation:** Backend ensures URL is valid.
4. **Sanitization:** Angular automatically sanitizes output in templates.
5. **Security Headers:** Helmet middleware adds standard security headers.

## Build & Deploy Flow

1. **Build:**
    - Frontend: `ng build --configuration=production`
    - Backend: `npm run build`
2. **Deploy:**
    - Firebase: `firebase deploy --only hosting` (Frontend only for this hub).
