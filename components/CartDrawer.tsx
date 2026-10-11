"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "./CartContext";
import { getProduct } from "@/lib/products";
import { SITE, formatPrice, whatsappLink } from "@/lib/site";

type Address = {
  name: string;
  phone: string;
  address: string;
  landmark: string;
  city: string;
  state: string;
  pincode: string;
};

const EMPTY_ADDRESS: Address = { name: "", phone: "", address: "", landmark: "", city: "", state: "", pincode: "" };
const ADDRESS_KEY = "liorre-address";

function validate(a: Address) {
  const errors: Partial<Record<keyof Address, string>> = {};
  if (!a.name.trim()) errors.name = "Enter your full name";
  if (!/^(\+?91[\s-]?)?[6-9]\d{9}$/.test(a.phone.replace(/\s/g, ""))) errors.phone = "Enter a valid 10-digit mobile number";
  if (a.address.trim().length < 8) errors.address = "Enter house no., street and area";
  if (!a.city.trim()) errors.city = "Enter your city";
  if (!a.state.trim()) errors.state = "Enter your state";
  if (!/^\d{6}$/.test(a.pincode.trim())) errors.pincode = "Enter a 6-digit pincode";
  return errors;
}

export default function CartDrawer() {
  const { items, total, isOpen, close, setQty, remove } = useCart();
  const [copied, setCopied] = useState(false);
  const [igStep, setIgStep] = useState(false);
  const [address, setAddress] = useState<Address>(EMPTY_ADDRESS);
  const [showErrors, setShowErrors] = useState(false);

  // Remember the address on this device for the next order.
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(ADDRESS_KEY) ?? "null");
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (saved) setAddress({ ...EMPTY_ADDRESS, ...saved });
    } catch {}
  }, []);

  const update = (field: keyof Address) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const next = { ...address, [field]: e.target.value };
    setAddress(next);
    localStorage.setItem(ADDRESS_KEY, JSON.stringify(next));
  };

  const errors = validate(address);
  const addressValid = Object.keys(errors).length === 0;

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, close]);

  const orderMessage = [
    "Hi Liorre! I'd like to order:",
    "",
    ...items.map((i, n) => {
      const p = getProduct(i.slug)!;
      return `${n + 1}. ${p.name} (${p.fit}, ${p.color}) — Size ${i.size} × ${i.qty} = ${formatPrice(p.price * i.qty)}`;
    }),
    "",
    `Total: ${formatPrice(total)}`,
    "",
    "Delivery address:",
    address.name.trim(),
    `Phone: ${address.phone.trim()}`,
    address.address.trim(),
    ...(address.landmark.trim() ? [`Landmark: ${address.landmark.trim()}`] : []),
    `${address.city.trim()}, ${address.state.trim()} - ${address.pincode.trim()}`,
  ].join("\n");

  // Order buttons only work once the address is complete.
  const requireAddress = (e?: React.MouseEvent) => {
    if (addressValid) return true;
    e?.preventDefault();
    setShowErrors(true);
    document.getElementById("cart-address")?.scrollIntoView({ behavior: "smooth", block: "start" });
    return false;
  };

  // Instagram can't prefill a DM, so copy the order first, then show a step with
  // real links the customer taps. A direct tap (not window.open after an await) lets
  // phones open the Instagram app chat instead of the Instagram website home page.
  const copyOrder = () => {
    const fallback = () => {
      const t = document.createElement("textarea");
      t.value = orderMessage;
      t.setAttribute("readonly", "");
      t.style.position = "fixed";
      t.style.opacity = "0";
      document.body.appendChild(t);
      t.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(t);
      return ok;
    };
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(orderMessage).then(() => setCopied(true), () => setCopied(fallback()));
    } else {
      setCopied(fallback());
    }
  };

  const orderOnInstagram = () => {
    if (!requireAddress()) return;
    copyOrder();
    setIgStep(true);
  };

  return (
    <div
      className={`fixed inset-0 z-[60] ${isOpen ? "" : "pointer-events-none"}`}
      aria-hidden={!isOpen}
    >
      <div
        onClick={close}
        className={`absolute inset-0 bg-black/40 transition-opacity ${isOpen ? "opacity-100" : "opacity-0"}`}
      />

      <aside
        role="dialog"
        aria-label="Shopping cart"
        className={`absolute right-0 top-0 h-full w-full sm:max-w-md bg-white shadow-2xl flex flex-col transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <h2 className="text-xl font-bold">Your Cart</h2>
          <button onClick={close} aria-label="Close cart" className="text-2xl leading-none p-2 -m-2">
            ×
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
            <p className="text-gray-500">Your cart is empty.</p>
            <Link
              href="/shop"
              onClick={close}
              className="mt-6 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition"
            >
              Shop Now
            </Link>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto">
            <ul className="divide-y divide-gray-100 px-6">
              {items.map((i) => {
                const p = getProduct(i.slug)!;
                return (
                  <li key={`${i.slug}-${i.size}`} className="py-4 flex gap-4">
                    <Image
                      src={p.images[0]}
                      alt={p.name}
                      width={80}
                      height={96}
                      className="w-20 h-24 object-contain rounded-xl bg-gray-100"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold truncate">{p.name}</p>
                      <p className="text-sm text-gray-500">
                        {p.fit} · Size {i.size}
                      </p>
                      <div className="mt-2 flex items-center gap-3">
                        <div className="flex items-center border border-gray-200 rounded-lg">
                          <button
                            onClick={() => setQty(i.slug, i.size, i.qty - 1)}
                            className="px-3 py-1"
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <span className="w-6 text-center">{i.qty}</span>
                          <button
                            onClick={() => setQty(i.slug, i.size, i.qty + 1)}
                            className="px-3 py-1"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => remove(i.slug, i.size)}
                          className="text-sm text-gray-400 hover:text-red-600"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <p className="font-semibold">{formatPrice(p.price * i.qty)}</p>
                  </li>
                );
              })}
            </ul>

            <div className="border-t border-gray-100 px-6 py-5 space-y-3">
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>

              <fieldset id="cart-address" className="pt-2 space-y-3 scroll-mt-4">
                <legend className="font-bold mb-1">Delivery Address</legend>
                {(
                  [
                    { field: "name", label: "Full name", autoComplete: "name" },
                    { field: "phone", label: "Mobile number", autoComplete: "tel", inputMode: "tel" },
                    { field: "address", label: "House no., street, area", autoComplete: "street-address", multiline: true },
                    { field: "landmark", label: "Landmark (optional)" },
                  ] as const
                ).map((f) => (
                  <AddressInput key={f.field} {...f} value={address[f.field]} onChange={update(f.field)} error={showErrors ? errors[f.field] : undefined} />
                ))}
                <div className="grid grid-cols-2 gap-3">
                  <AddressInput field="city" label="City" autoComplete="address-level2" value={address.city} onChange={update("city")} error={showErrors ? errors.city : undefined} />
                  <AddressInput field="state" label="State" autoComplete="address-level1" value={address.state} onChange={update("state")} error={showErrors ? errors.state : undefined} />
                </div>
                <AddressInput field="pincode" label="Pincode" autoComplete="postal-code" inputMode="numeric" value={address.pincode} onChange={update("pincode")} error={showErrors ? errors.pincode : undefined} />
              </fieldset>

              <p className="text-xs text-gray-500">
                Your order and address are sent to Liorre on chat. Our team will confirm
                availability and share payment details.
              </p>
              {showErrors && !addressValid && (
                <p className="text-sm text-red-600">Please complete the delivery address above to place your order.</p>
              )}

              {SITE.whatsappNumber && (
                <a
                  onClick={requireAddress}
                  href={whatsappLink(orderMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center bg-[#25D366] text-white font-semibold py-3 rounded-xl hover:brightness-95 transition"
                >
                  Order on WhatsApp
                </a>
              )}
              {!igStep ? (
                <button
                  onClick={orderOnInstagram}
                  className="w-full bg-black text-white font-semibold py-3 rounded-xl hover:bg-gray-800 transition"
                >
                  Order on Instagram
                </button>
              ) : (
                <div className="rounded-2xl border border-gray-200 p-4 space-y-3">
                  <p className="font-semibold">
                    {copied ? "✅ Order & address copied" : "Copy your order, then message us"}
                  </p>
                  <ol className="text-sm text-gray-600 list-decimal pl-5 space-y-1">
                    <li>Tap <b>Open Instagram chat</b> below.</li>
                    <li>If our profile opens instead, tap <b>Message</b>.</li>
                    <li>Paste the copied order and send it to <b>@{SITE.instagramHandle}</b>.</li>
                  </ol>
                  <a
                    href={SITE.instagramDmUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center bg-black text-white font-semibold py-3 rounded-xl hover:bg-gray-800 transition"
                  >
                    Open Instagram chat
                  </a>
                  <div className="flex justify-between text-sm">
                    <button onClick={copyOrder} className="text-amber-700 font-semibold hover:underline">
                      Copy order again
                    </button>
                    <button onClick={() => setIgStep(false)} className="text-gray-500 hover:text-black">
                      Back
                    </button>
                  </div>
                  {!copied && (
                    <textarea
                      readOnly
                      value={orderMessage}
                      rows={6}
                      onFocus={(e) => e.currentTarget.select()}
                      className="w-full text-xs rounded-xl border border-gray-200 p-3"
                      aria-label="Your order — copy this text"
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}

function AddressInput({
  field,
  label,
  value,
  onChange,
  error,
  autoComplete,
  inputMode,
  multiline,
}: {
  field: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  autoComplete?: string;
  inputMode?: "tel" | "numeric";
  multiline?: boolean;
}) {
  const cls = `w-full rounded-xl border px-4 py-2.5 focus:outline-none focus:border-black ${error ? "border-red-400" : "border-gray-200"}`;
  const id = `addr-${field}`;
  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      {multiline ? (
        <textarea id={id} rows={2} placeholder={label} value={value} onChange={onChange} autoComplete={autoComplete} className={cls} />
      ) : (
        <input id={id} placeholder={label} value={value} onChange={onChange} autoComplete={autoComplete} inputMode={inputMode} className={cls} />
      )}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
