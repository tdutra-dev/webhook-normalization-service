# Webhook Normalization Service

<!-- Webhook ingestion + normalization pipeline with NestJS &amp; PostgreSQL. Receives external events, normalizes payloads, stores them, and exposes APIs. -->

A backend service built for ingesting webhook events from multiple providers, 
transforming them into a **canonical normalized schema**, and exposing APIs for querying, filtering, and pagination.  
Designed as an extensible integration layer for ecommerce platforms, billing systems, CRMs, or event-driven pipelines.

---

## ✨ Features

- 📥 Receive webhook events from any provider  
- 🗄 Store raw + normalized payloads in PostgreSQL  
- 🔄 Transform provider-specific payloads into a **canonical schema**  
- 🔍 Query events with **search + filtering + pagination**  
- 🚀 Built with **NestJS + TypeORM + PostgreSQL + Docker**  
- 🧩 Modular architecture, easy to extend with new providers  

---

## 🧱 Tech Stack

| Layer | Technology |
|---|---|
| Language | TypeScript |
| Framework | NestJS |
| Database | PostgreSQL (Docker) |
| ORM | TypeORM |
| Pattern | Webhooks → Canonical Data Model |
| Future UI | Next.js Dashboard (coming soon) |

---

## 🏗 Architecture Overview

```mermaid
flowchart LR
    A[External Providers] -->|POST /webhook/:provider| B[NestJS Controller]
    B --> C[Webhook Service]
    C -->|Normalize Payload| D[Normalizer Service]
    D --> E[(PostgreSQL)]
    F[Client/Admin] -->|GET /webhook?search=...| C


🔧 Endpoints
Receive event
POST /webhook/:provider

Query events
GET /webhook?page=1&limit=10&provider=shopify&
search=product

🛠 Setup & Run
1. Clone repo
bash
git clone https://github.com/your-username/webhook-normalization-service.git

cd webhook-normalization-service

2. Start PostgreSQL
bash
docker compose up -d

3. Install dependencies
bash
npm install

4. Start service
bash
npm run start:dev

📌 Next Iterations (roadmap)
🔔 Add notification engine (email / Slack / Telegram)

⚙ Provider adapters with mapping config

🕸 Web UI dashboard (Next.js + Tailwind)

📊 Analytics panel with metrics & throughput

🔐 JWT auth & API rate limiting

👩‍💻 Author
Tendresse Dutra – Backend & API Engineer
Specialized in e-commerce integrations, automation workflows, system architecture.