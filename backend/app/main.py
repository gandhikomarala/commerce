"""NovaCommerce 360 - Enterprise Omnichannel E-Commerce Engine."""
from fastapi import FastAPI, HTTPException, Query, Body
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional
import time

app = FastAPI(
    title="NovaCommerce 360 API Engine",
    version="4.5.0",
    description="High-scale headless e-commerce backend with product catalog, cart session management, Stripe checkout, and omnichannel order fulfillment."
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

PRODUCTS = [
    {
        "id": "prod-001",
        "title": "Quantum Pro Neural Headset",
        "category": "AI Hardware",
        "price_usd": 499.99,
        "rating": 4.9,
        "reviews_count": 342,
        "stock": 48,
        "image": "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&auto=format&fit=crop&q=80",
        "badge": "Top Seller"
    },
    {
        "id": "prod-002",
        "title": "CyberMatrix OLED Smartwatch",
        "category": "Cyber Electronics",
        "price_usd": 329.50,
        "rating": 4.8,
        "reviews_count": 219,
        "stock": 85,
        "image": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80",
        "badge": "New Arrival"
    },
    {
        "id": "prod-003",
        "title": "AeroGlow Mechanical Cyber Keyboard",
        "category": "Gaming Gear",
        "price_usd": 189.00,
        "rating": 4.7,
        "reviews_count": 512,
        "stock": 120,
        "image": "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&auto=format&fit=crop&q=80",
        "badge": "Staff Pick"
    },
    {
        "id": "prod-004",
        "title": "Titanium Carbon Minimalist Wallet",
        "category": "Luxury Apparel",
        "price_usd": 89.99,
        "rating": 4.9,
        "reviews_count": 184,
        "stock": 64,
        "image": "https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&auto=format&fit=crop&q=80",
        "badge": "Trending"
    },
    {
        "id": "prod-005",
        "title": "NovaSound Spatial Audio Pods",
        "category": "Cyber Electronics",
        "price_usd": 249.99,
        "rating": 4.8,
        "reviews_count": 420,
        "stock": 92,
        "image": "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&auto=format&fit=crop&q=80",
        "badge": "Hot"
    },
    {
        "id": "prod-006",
        "title": "HyperCore RTX External Neural GPU",
        "category": "AI Hardware",
        "price_usd": 1299.00,
        "rating": 5.0,
        "reviews_count": 96,
        "stock": 14,
        "image": "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=600&auto=format&fit=crop&q=80",
        "badge": "Limited Edition"
    }
]

@app.get("/health")
def health_check():
    return {
        "status": "HEALTHY",
        "service": "NovaCommerce 360 Platform Engine",
        "version": "4.5.0",
        "catalog_size": len(PRODUCTS),
        "payment_gateways": ["Stripe", "PayPal", "Crypto (USDC)"],
        "currency_base": "USD"
    }

@app.get("/api/products")
def get_products(category: Optional[str] = None):
    if category and category != "All":
        filtered = [p for p in PRODUCTS if p["category"].lower() == category.lower()]
        return {"count": len(filtered), "products": filtered}
    return {"count": len(PRODUCTS), "products": PRODUCTS}

@app.get("/api/analytics/store")
def get_store_analytics():
    return {
        "gross_merchandise_value_usd": 4_850_200,
        "monthly_orders_count": 18_450,
        "average_order_value_usd": 262.80,
        "conversion_rate_pct": 3.84,
        "cart_abandonment_rate_pct": 24.1,
        "customer_satisfaction_score": 4.9
    }
