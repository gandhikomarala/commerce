import React, { useState } from 'react';
import { 
  ShoppingCart, Search, Star, ShieldCheck, Zap, 
  Trash2, Plus, Minus, CreditCard, CheckCircle2, 
  TrendingUp, Package, Sparkles, Filter, X, ArrowRight
} from 'lucide-react';

interface Product {
  id: string;
  title: string;
  category: string;
  price_usd: number;
  rating: number;
  reviews_count: number;
  stock: number;
  image: string;
  badge: string;
}

interface CartItem extends Product {
  quantity: number;
}

export default function App() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [promoCode, setPromoCode] = useState<string>("");
  const [discountApplied, setDiscountApplied] = useState<boolean>(false);
  const [orderConfirmed, setOrderConfirmed] = useState<boolean>(false);

  const products: Product[] = [
    {
      id: "prod-001",
      title: "Quantum Pro Neural Headset",
      category: "AI Hardware",
      price_usd: 499.99,
      rating: 4.9,
      reviews_count: 342,
      stock: 48,
      image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&auto=format&fit=crop&q=80",
      badge: "Top Seller"
    },
    {
      id: "prod-002",
      title: "CyberMatrix OLED Smartwatch",
      category: "Cyber Electronics",
      price_usd: 329.50,
      rating: 4.8,
      reviews_count: 219,
      stock: 85,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80",
      badge: "New Arrival"
    },
    {
      id: "prod-003",
      title: "AeroGlow Mechanical Keyboard",
      category: "Gaming Gear",
      price_usd: 189.00,
      rating: 4.7,
      reviews_count: 512,
      stock: 120,
      image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&auto=format&fit=crop&q=80",
      badge: "Staff Pick"
    },
    {
      id: "prod-004",
      title: "Titanium Minimalist RFID Wallet",
      category: "Luxury Apparel",
      price_usd: 89.99,
      rating: 4.9,
      reviews_count: 184,
      stock: 64,
      image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&auto=format&fit=crop&q=80",
      badge: "Trending"
    },
    {
      id: "prod-005",
      title: "NovaSound Spatial Audio Pods",
      category: "Cyber Electronics",
      price_usd: 249.99,
      rating: 4.8,
      reviews_count: 420,
      stock: 92,
      image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&auto=format&fit=crop&q=80",
      badge: "Hot"
    },
    {
      id: "prod-006",
      title: "HyperCore External RTX GPU",
      category: "AI Hardware",
      price_usd: 1299.00,
      rating: 5.0,
      reviews_count: 96,
      stock: 14,
      image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=600&auto=format&fit=crop&q=80",
      badge: "Limited Edition"
    }
  ];

  const categories = ["All", "AI Hardware", "Cyber Electronics", "Gaming Gear", "Luxury Apparel"];

  const filteredProducts = products.filter(p => {
    const matchesCat = activeCategory === "All" || p.category === activeCategory;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + item.price_usd * item.quantity, 0);
  const discount = discountApplied ? subtotal * 0.2 : 0;
  const tax = (subtotal - discount) * 0.08;
  const total = subtotal - discount + (subtotal > 0 ? tax : 0);

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === "NOVA20") {
      setDiscountApplied(true);
    }
  };

  const handleCheckout = () => {
    setOrderConfirmed(true);
    setCart([]);
    setIsCartOpen(false);
    setTimeout(() => setOrderConfirmed(false), 5000);
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-black">
      {/* Header */}
      <header className="border-b border-cyan-500/20 bg-[#070d1e]/80 backdrop-blur-xl px-6 py-4 flex items-center justify-between sticky top-0 z-40 shadow-2xl shadow-cyan-950/40">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-fuchsia-500 p-0.5 shadow-lg shadow-cyan-500/30 flex items-center justify-center">
            <div className="w-full h-full bg-[#070d1e] rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-cyan-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-black tracking-wider text-base bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-indigo-300 to-fuchsia-400">
                NOVACOMMERCE 360
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono">
                ENTERPRISE STORE
              </span>
            </div>
            <p className="text-xs text-slate-400">Next-Gen Cyber Storefront & Omnichannel Retail Engine</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex items-center relative w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3" />
          <input
            type="text"
            placeholder="Search AI hardware, cyber gear, audio..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900/80 border border-slate-700/80 focus:border-cyan-400 text-xs text-slate-100 rounded-xl pl-9 pr-4 py-2 outline-none transition-all placeholder:text-slate-500"
          />
        </div>

        {/* Cart Toggle */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative px-4 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-bold flex items-center space-x-2 transition-all active:scale-95"
        >
          <ShoppingCart className="w-4 h-4" />
          <span>Cart</span>
          {totalItems > 0 && (
            <span className="w-5 h-5 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500 text-black font-extrabold flex items-center justify-center text-[10px]">
              {totalItems}
            </span>
          )}
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 flex flex-col space-y-6">
        {/* Banner Alert if Order Confirmed */}
        {orderConfirmed && (
          <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 flex items-center justify-between shadow-2xl shadow-emerald-950/50 animate-bounce">
            <div className="flex items-center space-x-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              <div>
                <p className="font-bold text-sm">Order Confirmed Successfully!</p>
                <p className="text-xs text-emerald-400/80">Tracking ID: #NOVA-2026-8891 | Dispatched via NovaSpeed Logistics</p>
              </div>
            </div>
            <span className="text-xs font-mono bg-emerald-900/60 px-3 py-1 rounded-lg border border-emerald-700/50 font-bold">
              EST. DELIVERY: 2 DAYS
            </span>
          </div>
        )}

        {/* Category Filter Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-black shadow-lg shadow-cyan-500/20'
                  : 'bg-slate-900/80 border border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((p) => (
            <div
              key={p.id}
              className="rounded-2xl bg-[#091124]/90 border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 p-5 shadow-xl flex flex-col justify-between group overflow-hidden"
            >
              <div>
                {/* Image Container */}
                <div className="relative w-full h-48 rounded-xl overflow-hidden mb-4 bg-slate-950">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md border border-cyan-500/40 text-[10px] font-mono font-bold text-cyan-300 uppercase">
                    {p.badge}
                  </span>
                  <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-lg bg-slate-900/80 backdrop-blur-md text-[10px] font-mono text-slate-300 flex items-center space-x-1">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    <span>{p.rating}</span>
                  </span>
                </div>

                <div className="flex justify-between items-start mb-1">
                  <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wide">{p.category}</span>
                  <span className="text-[10px] font-mono text-slate-400">{p.stock} in stock</span>
                </div>

                <h3 className="font-bold text-sm text-white group-hover:text-cyan-300 transition-colors mb-2">
                  {p.title}
                </h3>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 font-mono">PRICE</span>
                  <p className="text-lg font-black text-cyan-300 font-mono">${p.price_usd.toFixed(2)}</p>
                </div>
                <button
                  onClick={() => addToCart(p)}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-black font-extrabold text-xs flex items-center space-x-1.5 transition-all shadow-lg shadow-cyan-500/20 active:scale-95"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#070d1e] border-l border-cyan-500/30 h-full p-6 flex flex-col justify-between shadow-2xl">
            {/* Header */}
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center space-x-2">
                  <ShoppingCart className="w-5 h-5 text-cyan-400" />
                  <h2 className="font-bold text-base text-white">Your Cart ({totalItems})</h2>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items List */}
              <div className="mt-4 space-y-3 max-h-[48vh] overflow-y-auto pr-1">
                {cart.length === 0 ? (
                  <div className="py-12 text-center text-slate-500 text-xs">
                    Your cart is currently empty.
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 flex items-center justify-between">
                      <img src={item.image} alt={item.title} className="w-12 h-12 rounded-lg object-cover" />
                      <div className="flex-1 ml-3">
                        <p className="font-bold text-xs text-white line-clamp-1">{item.title}</p>
                        <p className="text-xs font-mono text-cyan-300 font-bold">${(item.price_usd * item.quantity).toFixed(2)}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1 bg-slate-950 px-2 py-1 rounded-lg border border-slate-800">
                          <button onClick={() => updateQuantity(item.id, -1)} className="text-slate-400 hover:text-white">
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-mono font-bold px-1">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="text-slate-400 hover:text-white">
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} className="text-rose-400 hover:text-rose-300 p-1">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Cart Footer */}
            <div className="pt-4 border-t border-slate-800 space-y-3">
              {/* Promo Code Input */}
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Promo Code (Try NOVA20)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 bg-slate-900 border border-slate-700 text-xs px-3 py-2 rounded-lg outline-none uppercase font-mono placeholder:normal-case"
                />
                <button
                  onClick={handleApplyPromo}
                  className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-cyan-300 border border-slate-600"
                >
                  Apply
                </button>
              </div>

              {discountApplied && (
                <div className="flex justify-between text-xs text-emerald-400 font-mono font-bold">
                  <span>Discount (NOVA20 - 20% OFF):</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}

              <div className="space-y-1 font-mono text-xs text-slate-300">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Est. Tax (8%):</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-slate-800">
                  <span>Total Amount:</span>
                  <span className="text-cyan-300 text-base">${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={cart.length === 0}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-500 to-fuchsia-500 hover:from-cyan-400 hover:to-fuchsia-400 disabled:opacity-50 text-black font-extrabold text-xs flex items-center justify-center space-x-2 transition-all shadow-xl shadow-cyan-500/20 active:scale-95"
              >
                <CreditCard className="w-4 h-4" />
                <span>Instant Checkout (${total.toFixed(2)})</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
