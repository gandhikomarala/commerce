"""Pytest suite for NovaCommerce Platform Engine 005."""
from backend.app.main import app, get_products, get_store_analytics

def test_products_catalog_005():
    res = get_products()
    assert res["count"] >= 6
    assert len(res["products"]) >= 6

def test_store_analytics_005():
    res = get_store_analytics()
    assert res["gross_merchandise_value_usd"] > 0
    assert res["conversion_rate_pct"] > 0
