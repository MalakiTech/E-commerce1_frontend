import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  User,
  ShoppingCart,
  Star,
  Plus,
  Minus,
  Trash2,
  X,
  Truck,
  ShieldCheck,
  Mail,
  House,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const PRODUCTS = [
  {
    id: 1,
    name: "Wool Blend Coat",
    price: 35,
    originalPrice: null,
    rating: 5,
    reviews: 12,
    badge: "New",
    badgeColor: "bg-neutral-900",
    img: "https://placehold.co/400x500/e8ddd0/262626?text=Wool+Coat",
  },
  {
    id: 2,
    name: "Leather Handbag",
    price: 28,
    originalPrice: null,
    rating: 5,
    reviews: 8,
    badge: "Best Seller",
    badgeColor: "bg-neutral-900",
    img: "https://placehold.co/400x500/ddd0c4/262626?text=Handbag",
  },
  {
    id: 3,
    name: "Classic Sneakers",
    price: 45,
    originalPrice: 60,
    rating: 4,
    reviews: 20,
    badge: "On Sale",
    badgeColor: "bg-rose-600",
    img: "https://placehold.co/400x500/f0ebe3/262626?text=Sneakers",
  },
  {
    id: 4,
    name: "Men's Jacket",
    price: 55,
    originalPrice: null,
    rating: 4,
    reviews: 15,
    badge: "New",
    badgeColor: "bg-neutral-900",
    img: "https://placehold.co/400x500/2b2b2b/f5f5f5?text=Jacket",
  },
  {
    id: 5,
    name: "Sunglasses",
    price: 18,
    originalPrice: null,
    rating: 5,
    reviews: 10,
    badge: "Popular",
    badgeColor: "bg-neutral-900",
    img: "https://placehold.co/400x500/e3d9c8/262626?text=Sunglasses",
  },
  {
    id: 6,
    name: "Watch",
    price: 60,
    originalPrice: 80,
    rating: 4,
    reviews: 14,
    badge: "Sale",
    badgeColor: "bg-rose-600",
    img: "https://placehold.co/400x500/e8ddd0/262626?text=Watch",
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const money = (n) => `$${n.toFixed(2)}`;

function Stars({ count }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={13}
          className={i < count ? "fill-amber-400 text-amber-400" : "text-neutral-300"}
        />
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Product card (Image 1)
// ---------------------------------------------------------------------------

function ProductCard({ product, onAdd }) {
  return (
    <div className="group">
      <div className="relative overflow-hidden rounded-lg bg-neutral-100">
        <span
          className={`absolute left-3 top-3 z-10 rounded px-2 py-1 text-[11px] font-medium text-white ${product.badgeColor}`}
        >
          {product.badge}
        </span>
        <img
          src={product.img}
          alt={product.name}
          className="h-56 w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </div>
      <div className="mt-3 space-y-1">
        <h3 className="text-sm font-medium text-neutral-900">{product.name}</h3>
        <div className="flex items-baseline gap-2">
          {product.originalPrice && (
            <span className="text-sm text-neutral-400 line-through">
              {money(product.originalPrice)}
            </span>
          )}
          <span
            className={`text-sm font-semibold ${
              product.originalPrice ? "text-rose-600" : "text-neutral-900"
            }`}
          >
            {money(product.price)}
          </span>
        </div>
        <div className="flex items-center gap-1.5 pt-0.5">
          <Stars count={product.rating} />
          <span className="text-xs text-neutral-500">({product.reviews})</span>
        </div>
      </div>
      <button
        onClick={() => onAdd(product)}
        className="mt-3 flex w-full items-center justify-center gap-2 rounded-md bg-neutral-900 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-800"
      >
        <ShoppingCart size={15} />
        Add to Cart
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Filters sidebar (Image 1)
// ---------------------------------------------------------------------------

function FilterGroup({ title, options }) {
  return (
    <div className="border-b border-neutral-200 py-5 first:pt-0">
      <h4 className="mb-3 text-sm font-semibold text-neutral-900">{title}</h4>
      <div className="space-y-2.5">
        {options.map((opt) => (
          <label
            key={opt}
            className="flex cursor-pointer items-center gap-2.5 text-sm text-neutral-600"
          >
            <input
              type="checkbox"
              defaultChecked={opt === "All"}
              className="h-4 w-4 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900"
            />
            {opt}
          </label>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Cart modal (Image 2)
// ---------------------------------------------------------------------------

function CartModal({ items, onClose, onQty, onRemove }) {
  const [voucher, setVoucher] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);

  const subtotal = useMemo(
    () => items.reduce((sum, it) => sum + it.price * it.qty, 0),
    [items]
  );
  const discount = discountApplied ? subtotal * 0.1 : 0;
  const grandTotal = subtotal - discount;

  const applyVoucher = () => {
    if (voucher.trim().length > 0) setDiscountApplied(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-xl rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-100 px-6 py-5">
          <h2 className="font-serif text-xl font-bold tracking-tight text-neutral-900">
            Shopping Cart
          </h2>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-900"
          >
            <X size={18} />
          </button>
        </div>

        {/* Items */}
        <div className="max-h-[45vh] overflow-y-auto px-6">
          {items.length === 0 ? (
            <p className="py-10 text-center text-sm text-neutral-500">
              Your cart is empty.
            </p>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs font-semibold uppercase tracking-wide text-neutral-400">
                  <th className="py-3 font-semibold">Product</th>
                  <th className="py-3 font-semibold">Quantity</th>
                  <th className="py-3 text-right font-semibold">Price</th>
                  <th className="py-3"></th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="border-t border-neutral-100">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.img}
                          alt={item.name}
                          className="h-14 w-14 rounded-lg object-cover"
                        />
                        <div>
                          <p className="text-sm font-semibold uppercase tracking-wide text-neutral-900">
                            {item.name}
                          </p>
                          {item.variant && (
                            <p className="text-xs text-neutral-400">{item.variant}</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onQty(item.id, -1)}
                          className="flex h-7 w-7 items-center justify-center rounded-full border border-neutral-300 text-neutral-600 transition hover:bg-neutral-100"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-6 text-center text-sm font-medium">
                          {String(item.qty).padStart(2, "0")}
                        </span>
                        <button
                          onClick={() => onQty(item.id, 1)}
                          className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-900 text-white transition hover:bg-neutral-700"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </td>
                    <td className="py-4 text-right text-sm font-semibold text-neutral-900">
                      {money(item.price)}
                    </td>
                    <td className="py-4 pl-3 text-right">
                      <button
                        onClick={() => onRemove(item.id)}
                        className="flex h-7 w-7 items-center justify-center rounded-full bg-rose-50 text-rose-500 transition hover:bg-rose-100"
                      >
                        <Trash2 size={13} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Order summary */}
        <div className="mx-6 mb-6 mt-4 rounded-xl border border-neutral-100 bg-neutral-50 p-5">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-neutral-900">
            Order Summary
          </h3>
          <div className="mb-4 flex gap-2">
            <input
              value={voucher}
              onChange={(e) => setVoucher(e.target.value)}
              placeholder="Discount voucher"
              className="flex-1 rounded-full border border-neutral-300 bg-white px-4 py-2 text-sm outline-none focus:border-neutral-900"
            />
            <button
              onClick={applyVoucher}
              className="rounded-full border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 transition hover:bg-neutral-100"
            >
              Apply
            </button>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-neutral-600">
              <span>Sub Total</span>
              <span>{money(subtotal)}</span>
            </div>
            {discountApplied && (
              <div className="flex justify-between text-emerald-600">
                <span>Discount (10%)</span>
                <span>-{money(discount)}</span>
              </div>
            )}
            <div className="flex justify-between border-t border-neutral-200 pt-2 text-base font-bold text-neutral-900">
              <span>Grand Total</span>
              <span>{money(grandTotal)}</span>
            </div>
          </div>
          <button
            disabled={items.length === 0}
            className="mt-4 w-full rounded-full bg-neutral-900 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Checkout Now
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// App — ties the shop page and the cart modal together
// ---------------------------------------------------------------------------

export default function Products() {
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  const cartCount = cartItems.reduce((sum, it) => sum + it.qty, 0);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((it) => it.id === product.id);
      if (existing) {
        return prev.map((it) =>
          it.id === product.id ? { ...it, qty: it.qty + 1 } : it
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setCartOpen(true);
  };

  const changeQty = (id, delta) => {
    setCartItems((prev) =>
      prev
        .map((it) => (it.id === id ? { ...it, qty: it.qty + delta } : it))
        .filter((it) => it.qty > 0)
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((it) => it.id !== id));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-neutral-100 px-6 py-4 sm:px-10">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-neutral-900 text-sm font-bold text-white">
            S
          </div>
          <span className="text-lg font-semibold text-neutral-900">StyleHaven</span>
        </div>
       
        <div className="flex items-center gap-5 text-neutral-700">
          <div className="flex items-center gap-4 text-neutral-700">
          <Search size={19} className="cursor-pointer" />
          <Link to="/login" ><User size={19} className="cursor-pointer" /></Link> 
          <Link to="/"><House size={19} className="cursor-pointer" /></Link>
          <Link to="/cont"><Mail size={19} className="cursor-pointer" /></Link> 
          </div>

          <button
            onClick={() => setCartOpen(true)}
            className="relative cursor-pointer"
          >
            <ShoppingCart size={19} />
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-neutral-900 text-[10px] font-semibold text-white">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-6 mt-6 grid overflow-hidden rounded-2xl bg-[#efe6d8] sm:mx-10 md:grid-cols-2">
        <div className="flex flex-col justify-center gap-4 px-8 py-10 md:px-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
            New Collection
          </span>
          <h1 className="font-serif text-4xl font-bold leading-tight text-neutral-900 md:text-5xl">
            Style That <em className="italic">Speaks You</em>
          </h1>
          <p className="max-w-sm text-sm text-neutral-600">
            Discover the latest trends in fashion, designed for your everyday style.
          </p>
         {/* <button className="mt-2 w-fit rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-neutral-800">
            Shop Now →
          </button>*/}
        </div>
        <img
          src="https://placehold.co/700x420/8a1f2b/f5ede4?text=StyleHaven"
          alt="Style That Speaks You"
          className="h-full w-full object-cover"
        />
      </section>

      {/* Shop layout */}
      <section className="mx-6 my-10 flex flex-col gap-10 sm:mx-10 lg:flex-row">
        {/* Filters */}
        <aside className="w-full shrink-0 lg:w-56">
          <h3 className="mb-4 text-sm font-bold text-neutral-900">Filter Products</h3>
          <FilterGroup title="Category" options={["All", "Women", "Men", "Accessories"]} />
          <FilterGroup
            title="Price Range"
            options={["Under $20", "$20 - $50", "$50 - $100", "Above $100"]}
          />
          <FilterGroup title="Size" options={["XS", "S", "M", "L", "XL"]} />
        </aside>

        {/* Products */}
        <div className="flex-1">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-serif text-2xl font-bold text-neutral-900">
              Shop Our Collection
            </h2>
            <select className="rounded-md border border-neutral-200 px-3 py-1.5 text-sm text-neutral-600">
              <option>Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3">
            {PRODUCTS.map((p) => (
              <ProductCard key={p.id} product={p} onAdd={addToCart} />
            ))}
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <div className="mx-6 mb-10 flex flex-wrap gap-6 border-t border-neutral-100 pt-6 text-sm text-neutral-500 sm:mx-10">
        <div className="flex items-center gap-2">
          <Truck size={16} /> Free shipping on all orders over $50
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheck size={16} /> 100% safe & secure payment
        </div>
      </div>

      {cartOpen && (
        <CartModal
          items={cartItems}
          onClose={() => setCartOpen(false)}
          onQty={changeQty}
          onRemove={removeItem}
        />
      )}
    </div>
  );
}
