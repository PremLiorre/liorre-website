"use client";

import { useState } from "react";
import { products } from "@/lib/products";
import { SITE } from "@/lib/site";

// Submissions are emailed to SITE.email via FormSubmit (no backend needed).
// The very first submission triggers a one-time activation email to that inbox.
const ENDPOINT = `https://formsubmit.co/ajax/${SITE.email}`;

export default function FeedbackForm() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setStatus("sending");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...data,
          rating: rating ? `${rating} / 5` : "Not given",
          _subject: `New Liorre feedback${rating ? ` — ${rating}★` : ""}`,
          _template: "table",
        }),
      });
      if (!res.ok) throw new Error();
      form.reset();
      setRating(0);
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="bg-white rounded-3xl p-8 shadow text-center">
        <p className="text-2xl font-bold">Thank you! 🙏</p>
        <p className="mt-2 text-gray-600">Your feedback has reached the Liorre team.</p>
        <button onClick={() => setStatus("idle")} className="mt-6 text-amber-700 font-semibold hover:underline">
          Send another
        </button>
      </div>
    );
  }

  const input = "w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:border-black";

  return (
    <form onSubmit={onSubmit} className="bg-white rounded-3xl p-6 sm:p-8 shadow space-y-4">
      {/* Honeypot for spam bots */}
      <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />

      <div>
        <p className="font-semibold mb-2">Your Rating</p>
        <div className="flex gap-1" onMouseLeave={() => setHover(0)}>
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              type="button"
              key={n}
              onClick={() => setRating(n)}
              onMouseEnter={() => setHover(n)}
              aria-label={`${n} star${n > 1 ? "s" : ""}`}
              className={`text-3xl leading-none transition ${n <= (hover || rating) ? "text-amber-600" : "text-gray-300"}`}
            >
              ★
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input name="name" required placeholder="Your name" className={input} />
        <input name="email" type="email" required placeholder="Email" className={input} />
        <input name="city" placeholder="City (optional)" className={input} />
        <select name="product" defaultValue="" className={input}>
          <option value="">Product (optional)</option>
          {products.map((p) => (
            <option key={p.slug} value={p.name}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      <textarea name="message" required rows={4} placeholder="Tell us about your experience…" className={input} />
      <textarea
        name="wishlist"
        rows={2}
        placeholder="Any new product you wish to see in Liorre? (optional)"
        aria-label="Any new product you wish to see in Liorre?"
        className={input}
      />

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full sm:w-auto bg-black text-white font-semibold px-8 py-3 rounded-xl hover:bg-gray-800 transition disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Submit Feedback"}
      </button>
      {status === "error" && (
        <p className="text-sm text-red-600">
          Couldn&apos;t send right now. Please email us at {SITE.email}.
        </p>
      )}
    </form>
  );
}
