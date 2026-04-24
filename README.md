# monitoring-hub 🚀

**Project Tagline:** A premium, secure API proxy and health monitoring dashboard for modern developers.

[![Angular](https://img.shields.io/badge/Angular-19-DD0031?style=flat&logo=angular)](https://angular.dev)
[![Node.js](https://img.shields.io/badge/Node.js-20-339933?style=flat&logo=node.js)](https://nodejs.org)
[![Firebase](https://img.shields.io/badge/Firebase-Hosting-FFCA28?style=flat&logo=firebase)](https://firebase.google.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org)

---

## 📺 Demo
- **Live URL:** [Coming Soon]
- **Screenshots:** [Placeholders for Dashboard, Proxy Tester, History]

---

## 💡 Problem Statement
Developers often face CORS (Cross-Origin Resource Sharing) restrictions when testing APIs directly from the browser. This project provides a secure, server-side "Safe-Pass" proxy that bypasses these restrictions while providing real-time health monitoring and request history, allowing developers to debug and monitor their APIs effortlessly.

---

## ✨ Features
- **Secure API Proxy:** Bypass CORS with a robust Node.js backend.
- **Real-time Monitoring:** Track success rates, average response times, and failure counts.
- **Request History:** Detailed log of all proxied requests for easy debugging.
- **Interactive Dashboard:** Premium UI with instant feedback and visual stats.
- **WOW FACTOR: Adaptive Theming:** The entire UI dynamically changes its color palette based on your local time of day (Sunrise, Day, Sunset, Night).
- **Zoneless Performance:** Built with Angular 19 signals and zoneless change detection for maximum speed.

---

## 🛠 Tech Stack
| Layer | Technology | Why |
|-------|------------|-----|
| **Frontend** | Angular 19 | Standalone components, Signals, Zoneless detection. |
| **Backend** | Node.js / Express | Fast, scalable, and perfect for proxying. |
| **Styling** | Vanilla CSS | Custom design system using CSS Variables. |
| **Proxy** | Axios | Robust HTTP client for Node.js. |
| **Deployment** | Firebase Hosting | Fast, secure, and easy to scale. |

---

## 🏗 Architecture
```
[User Browser] <---> [Angular Frontend]
                          |
                          v
                  [Express Backend Proxy] <---> [External APIs]
                          |
                  [In-Memory Data Store]
```

---

## 🚀 Quick Start

### 1. Clone the repo
```bash
git clone https://github.com/vikasshengale89/monitoring-hub.git
cd monitoring-hub
```

### 2. Install & Run Backend
```bash
cd backend
npm install
npm run dev
```

### 3. Install & Run Frontend
```bash
cd frontend
npm install
npm run start
```
The app will be available at `http://localhost:4200`.

---

## 📂 Project Structure
```
monitoring-hub/
├── frontend/           # Angular 19 standalone app
│   ├── src/app/core    # Services (Proxy, Theme)
│   ├── src/app/features # Dashboard component
│   └── src/app/shared  # Reusable UI components
├── backend/            # Node.js + Express + TypeScript
│   ├── src/routes      # Proxy routes
│   └── src/controllers # Proxy & Stats logic
└── firebase.json       # Deployment configuration
```

---

## 🔒 Security Measures
- **SSRF Protection:** Backend blocks requests to localhost and private IPs.
- **Input Validation:** Strict validation of URLs and request bodies.
- **Security Headers:** Implemented via Helmet middleware.
- **Sanitization:** Built-in Angular XSS protection.

---

## ♿ Accessibility
- **WCAG 2.1 AA Compliant**
- Semantic HTML5 structure.
- Full keyboard navigation support.
- ARIA labels for interactive elements.

---

## 🔮 Future Roadmap
- **Persistence:** Move from in-memory to Firestore for persistent history.
- **Auth:** Add user accounts and private API keys.
- **Alerting:** Email/Slack notifications when an API goes down.
- **Advanced Mocking:** Allow users to mock responses for specific endpoints.

---

**Built for Google Antigravity PromptWars Competition.**
Author: Vikas Shengale
