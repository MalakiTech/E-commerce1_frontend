import { useState, useMemo } from "react";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";



const INITIAL_ITEMS = [
  {
    id: 1,
    name: "SUITA",
    variant: "Blue | L",
    price: 15.0,
    qty: 2,
    img: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=120&h=120&fit=crop",
  },
  {
    id: 2,
    name: "MARIATA",
    variant: "White | S",
    price: 25.0,
    qty: 2,
    img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&h=120&fit=crop",
  },
  {
    id: 3,
    name: "CIKALA",
    variant: "Blue | M",
    price: 35.0,
    qty: 2,
    img: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=120&h=120&fit=crop",
  },
];

const DISCOUNT_RATE = 0.1;

function formatMoney(n) {
  return `$${n.toFixed(2)}`;
}

function CartRow({ item, onIncrement, onDecrement, onRemove }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-neutral-100 py-4 last:border-b-0">
      <div className="flex flex-1 items-center gap-3">
        <img
          src={item.img}
          alt={item.name}
          className="h-14 w-14 rounded-lg object-cover"
        />
        <div>
          <p className="text-sm font-semibold tracking-wide text-neutral-900">
            {item.name}
          </p>
          <p className="text-xs text-neutral-400">{item.variant}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => onDecrement(item.id)}
          className="flex h-7 w-7 items-center justify-center rounded-full border border-neutral-300 text-neutral-500 transition-colors hover:bg-neutral-100"
          aria-label={`Decrease quantity of ${item.name}`}
        >
          <Minus size={13} />
        </button>
        <span className="w-5 text-center text-sm font-medium text-neutral-800">
          {String(item.qty).padStart(2, "0")}
        </span>
        <button
          onClick={() => onIncrement(item.id)}
          className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-900 text-white transition-colors hover:bg-neutral-700"
          aria-label={`Increase quantity of ${item.name}`}
        >
          <Plus size={13} />
        </button>
      </div>

      <p className="w-16 text-right text-sm font-semibold text-neutral-900">
        {formatMoney(item.price)}
      </p>

      <button
        onClick={() => onRemove(item.id)}
        className="flex h-7 w-7 items-center justify-center rounded-full bg-red-50 text-red-500 transition-colors hover:bg-red-100"
        aria-label={`Remove ${item.name}`}
      >
        <Trash2 size={14} />
      </button>
    </div>
  );
}

export default function Cart({ onClose }) {
  const [items, setItems] = useState(INITIAL_ITEMS);
  const [voucher, setVoucher] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);

  const subTotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.qty, 0),
    [items]
  );

  const discountAmount = subTotal * appliedDiscount;
  const grandTotal = subTotal - discountAmount;

  const increment = (id) =>
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );

  const decrement = (id) =>
    setItems((prev) =>
      prev.map((item) =>
        item.id === id && item.qty > 1
          ? { ...item, qty: item.qty - 1 }
          : item
      )
    );

  const remove = (id) =>
    setItems((prev) => prev.filter((item) => item.id !== id));

  const applyVoucher = () => {
    if (voucher.trim().length > 0) {
      setAppliedDiscount(DISCOUNT_RATE);
    } else {
      setAppliedDiscount(0);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-200 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl sm:p-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold tracking-wide text-neutral-900">
            SHOPPING CART
          </h2>
          <button
            onClick={onClose}
            className="text-neutral-400 transition-colors hover:text-neutral-700"
            aria-label="Close cart"
          >
           <Link to="/"><X size={20} /></Link> 
          </button>
        </div>

        <div className="mb-2 flex justify-between text-xs font-semibold uppercase tracking-wide text-neutral-400">
          <span>Product</span>
          <div className="flex gap-16">
            <span>Quantity</span>
            <span>Price</span>
          </div>
        </div>

        <div>
          {items.length === 0 ? (
            <p className="py-8 text-center text-sm text-neutral-400">
              Your cart is empty.
            </p>
          ) : (
            items.map((item) => (
              <CartRow
                key={item.id}
                item={item}
                onIncrement={increment}
                onDecrement={decrement}
                onRemove={remove}
              />
            ))
          )}
        </div>

        <div className="mt-6 rounded-xl border border-neutral-200 p-5">
          <h3 className="mb-4 text-sm font-bold tracking-wide text-neutral-900">
            ORDER SUMMARY
          </h3>

          <div className="mb-5 flex gap-2">
            <input
              type="text"
              value={voucher}
              onChange={(e) => setVoucher(e.target.value)}
              placeholder="Discount Voucher"
              className="flex-1 rounded-full border border-neutral-300 px-4 py-2 text-sm text-neutral-700 placeholder:text-neutral-400 focus:border-neutral-500 focus:outline-none"
            />
            <button
              onClick={applyVoucher}
              className="rounded-full border border-neutral-300 px-5 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100"
            >
              Apply
            </button>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-neutral-500">
              <span>Sub Total</span>
              <span className="font-medium text-neutral-900">
                {formatMoney(subTotal)}
              </span>
            </div>
            <div className="flex justify-between text-neutral-500">
              <span>Discount ({Math.round(appliedDiscount * 100)}%)</span>
              <span className="font-medium text-emerald-500">
                {formatMoney(discountAmount)}
              </span>
            </div>
          </div>

          <div className="my-4 border-t border-dashed border-neutral-200" />

          <div className="flex justify-between text-sm font-bold text-neutral-900">
            <span>Grand Total</span>
            <span>{formatMoney(grandTotal)}</span>
          </div>

          <button className="mt-5 w-full rounded-full bg-neutral-900 py-3 text-sm font-semibold text-white transition-colors hover:bg-neutral-800">
            Checkout Now
          </button>
        </div>
      </div>
    </div>
  );
}
