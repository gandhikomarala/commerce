"""NovaCommerce 360 Enterprise Catalog Module 305.
Category: omnichannel_retail_inventory_management
Domain: dynamic_pricing_and_sku_optimization
"""
from typing import List, Dict, Any, Tuple
import math

class CommerceCatalogKernel305:
    """Omnichannel catalog optimization and stock replenishment model."""
    def __init__(self, kernel_tag: str = "sku-kernel-305"):
        self.kernel_tag = kernel_tag
        self.version = "4.5.305"
        self.reorder_threshold = 15
        self.safety_stock_factor = 1.25

    def compute_dynamic_markdown(self, base_price_usd: float, stock_days_on_hand: int) -> float:
        """Calculates optimal dynamic pricing based on inventory velocity."""
        decay = min(0.35, (stock_days_on_hand / 90.0) * (0.1 + 305 * 0.0001))
        return round(base_price_usd * (1 - decay), 2)

    def calculate_reorder_point(self, lead_time_days: int, avg_daily_sales: float) -> int:
        """Calculates exact replenishment reorder trigger quantity."""
        rop = lead_time_days * avg_daily_sales * self.safety_stock_factor + (305 % 5)
        return int(math.ceil(rop))

catalog_kernel_305 = CommerceCatalogKernel305()
