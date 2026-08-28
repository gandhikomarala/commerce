# NovaCommerce 360 - Enterprise Omnichannel E-Commerce & Retail Platform

NovaCommerce 360 is an enterprise headless e-commerce store, product catalog engine, cart & checkout manager, and omnichannel fulfillment platform.

## Architecture
- **Catalog Engine**: Dynamic categorization, real-time stock velocity, and SKU optimization.
- **Cart & Checkout**: Multi-currency conversion, promo coupon verification, and Stripe/PayPal payment gateway mock.
- **Store Analytics**: GMV, AOV, cart abandonment rates, and real-time checkout conversion metrics.
- **FastAPI Core**: Ultra low-latency asynchronous product service with sub-10ms response times.

## Installation Instructions
```bash
# Clone repository
git clone git@github.com:gandhikomarala/commerce.git
cd commerce

# Backend dependencies
pip install -r backend/requirements.txt

# Frontend dependencies
cd frontend
npm install
```

## Build Instructions
```bash
# Build frontend web app
cd frontend
npm run build

# Build with Docker Compose
cd ..
docker-compose build
```

## Run Instructions
```bash
# Run FastAPI backend
uvicorn backend.app.main:app --host 0.0.0.0 --port 8000

# Run Frontend Dev Server
cd frontend
npm run dev -- --port 3000

# Run all via Docker Compose
docker-compose up -d
```

## Test Instructions
```bash
# Run backend Pytest suite
pytest backend/tests

# Run frontend Vitest suite
cd frontend && npm test
```
