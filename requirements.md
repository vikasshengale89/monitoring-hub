# Requirements - monitoring-hub

## Challenge Description
**Challenge:** "The Secure API Proxy & Monitoring Hub"
**Context:** Most browsers block direct API calls (CORS). Your goal is to build a "Safe-Pass" application that allows developers to test APIs through a server-side proxy while tracking the health of those APIs.

## Functional Requirements
1. **API Proxy:** Users can submit an external API URL, method, headers, and body to be executed by the backend proxy.
2. **CORS Bypass:** The backend proxy must successfully fetch data from external APIs that would otherwise be blocked by CORS in the browser.
3. **Response Display:** Show the full response from the external API, including status code, headers, and body (formatted JSON/Text).
4. **Health Monitoring:** Automatically track the success/failure rate of proxied API calls.
5. **Request History:** Display a history of recent requests with their results.
6. **API Uptime Dashboard:** A visual dashboard showing the status of monitored APIs.
7. **Search/Filter:** Users can search through their request history.
8. **Copy to Clipboard:** One-click copying of request details or response bodies.
9. **Environment Management:** Ability to save and switch between different API base URLs (e.g., Dev, Staging, Prod).
10. **Error Handling:** Graceful display of proxy errors, timeouts, and external API failures.

## Non-Functional Requirements
1. **Performance:** Initial page load < 2s; proxy response overhead < 500ms.
2. **Security:**
    - Input validation to prevent SSRF (Server-Side Request Forgery).
    - Sanitization of all user inputs to prevent XSS.
    - Secure handling of headers (don't leak sensitive internal headers).
3. **Accessibility:** WCAG 2.1 AA compliant (semantic HTML, keyboard navigation, aria-labels).
4. **Responsive Design:** Mobile-first approach, fully functional on mobile, tablet, and desktop.
5. **Reliability:** 99.9% uptime for the monitoring dashboard.

## Tech Stack
- **Frontend:** Angular 19 (Standalone, Signals, Zoneless)
- **Backend:** Node.js + Express + TypeScript
- **Deployment:** Firebase Hosting (Spark Plan)
- **Styling:** Vanilla CSS with CSS Variables

## Deliverables Checklist
- [ ] Complete source code in `frontend/` and `backend/`
- [ ] `README.md` with project details and setup instructions
- [ ] `FLOW.md` documenting application architecture and data flow
- [ ] `LINKEDIN_POST.md` for social sharing
- [ ] Firebase configuration files (`firebase.json`, `.firebaserc`)

## Judging Criteria
| Criteria | Weight | Goal |
|----------|--------|------|
| **Functionality** | 30% | Proxy works perfectly, monitoring is accurate. |
| **UX/UI Design** | 30% | Premium look, smooth animations, "WOW" factor. |
| **Code Quality** | 20% | Clean, idiomatic Angular 19/Node.js, strict typing. |
| **Security** | 10% | No secrets, SSRF protection, input validation. |
| **Deployment** | 10% | Fully functional on Firebase Hosting. |
