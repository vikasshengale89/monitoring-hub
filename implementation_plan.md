# Implementation Plan - monitoring-hub

## 1. Overview
Building a high-performance API Proxy and Monitoring Hub using Angular 19 and Node.js. The app will feature a sleek UI for testing APIs, bypassing CORS, and monitoring API health in real-time.

## 2. Architecture

### System Diagram
```
[User Browser] <---> [Angular Frontend]
                          |
                          v
                  [Express Backend Proxy] <---> [External APIs]
                          |
                  [Internal In-Memory Cache/Store]
```

### Key Design Decisions
| Decision | Choice | Rationale |
|----------|--------|-----------|
| State Management | Angular Signals | Modern, efficient, built-in to Angular 19. |
| Communication | HttpClient + RxJS | Standard Angular way for API calls. |
| Styling | Vanilla CSS + Variables | Maximum control and performance. |
| Proxy Lib | Axios | Robust handling of HTTP requests in Node.js. |

## 3. Data Model

### Entities
| Entity | Fields | Types |
|--------|--------|-------|
| RequestLog | id, url, method, status, timestamp, duration, responseSize | string, string, string, number, number, number, number |
| ApiHealth | url, successCount, failCount, avgDuration, lastStatus | string, number, number, number, number |

## 4. API Endpoints

| Method | Path | Purpose | Auth Required |
|--------|------|---------|---------------|
| POST | /api/v1/proxy | Execute an external API call | No (for hackathon) |
| GET | /api/v1/history | Get recent request history | No |
| GET | /api/v1/stats | Get monitoring statistics | No |

## 5. Files to Create

### Backend
- `backend/src/index.ts`: Entry point
- `backend/src/app.ts`: Express app setup
- `backend/src/routes/proxy.routes.ts`: Proxy routing
- `backend/src/controllers/proxy.controller.ts`: Proxy logic
- `backend/src/services/monitoring.service.ts`: Health tracking
- `backend/src/middleware/error.middleware.ts`: Global error handler
- `backend/src/utils/validator.ts`: SSRF and input validation

### Frontend
- `frontend/src/app/core/services/proxy.service.ts`: API interaction
- `frontend/src/app/core/services/theme.service.ts`: Adaptive theming
- `frontend/src/app/features/dashboard/dashboard.component.ts`: Main UI
- `frontend/src/app/features/history/history.component.ts`: History list
- `frontend/src/app/shared/components/header/header.component.ts`: Navigation
- `frontend/src/app/shared/components/request-form/request-form.component.ts`: API tester form
- `frontend/src/app/shared/components/response-view/response-view.component.ts`: Results display

## 6. Dependencies

### Backend
- `express`: Web framework
- `axios`: HTTP client for proxying
- `cors`: CORS middleware
- `dotenv`: Env variables
- `helmet`: Security headers
- `morgan`: Request logging

### Frontend
- `@angular/common/http`: API calls
- `@angular/forms`: Reactive forms
- `lucide-angular`: Premium icons

## 7. Build Order

### Phase 1: Foundation (MVP)
- Set up Express server with a basic `/proxy` endpoint.
- Create Angular project with `proxy.service`.
- Basic UI with URL input and response display.

### Phase 2: Core Features
- Implement Request History (In-memory on backend).
- Create Dashboard with success/failure stats.
- Add headers and body support to the proxy.

### Phase 3: Polish & Quality
- Add CSS animations and transitions.
- Implement responsive design.
- Full error handling and loading states.
- WCAG 2.1 AA compliance check.

### Phase 4: WOW Factor (Adaptive Theming)
- **Time-of-day adaptive theming:** The UI changes colors and background based on the user's local time (Sunrise, Day, Sunset, Night).
- **Weather-aware backgrounds:** Subtle CSS animations representing "clear", "cloudy", or "starry" skies based on simulated or real weather data.

## 8. Security Considerations
- [x] Input validation for URLs (SSRF protection).
- [x] Restricted header passing (don't pass sensitive server headers).
- [x] Rate limiting to prevent abuse.
- [x] CORS configured for the frontend.

## 9. Testing Strategy
- [x] Backend unit tests for proxy logic.
- [x] Integration tests for `/proxy` endpoint using Supertest.
- [x] Frontend component tests.
- [x] Manual verification of various API types (REST, JSON, XML).

## 10. Time Allocation
| Phase | Estimated Time |
|-------|----------------|
| Planning | 0.5h |
| Backend MVP | 1.0h |
| Frontend MVP | 1.0h |
| Features | 2.0h |
| Polish & WOW | 1.5h |
| Testing & Docs | 1.0h |
| **Total** | **7.0h** |
