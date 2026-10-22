"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";

type Status = "idle" | "submitting" | "success" | "error";

const departments = [
  "Not sure yet",
  "Primary Care",
  "Pediatrics",
  "Cardiology",
  "Dermatology",
  "Behavioral Health",
  "Physical Therapy",
];

const fieldClasses =
  "w-full border-0 border-b border-line bg-transparent py-3 text-[0.9375rem] text-ink placeholder:text-ink-soft/55 focus:border-green focus:outline-none";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      phone: String(formData.get("phone") ?? "").trim(),
      department: String(formData.get("department") ?? ""),
      message: String(formData.get("message") ?? "").trim(),
    };

    setStatus("submitting");
    setErrorMessage(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as { ok: boolean; error?: string };

      if (!response.ok || !data.ok) {
        setStatus("error");
        setErrorMessage(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMessage("We couldn't reach the server. Please try again in a moment.");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-white px-7 py-10">
        <p className="font-display text-2xl italic text-green">Message sent.</p>
        <p className="mt-3 max-w-sm text-[0.9375rem] leading-relaxed text-ink-soft">
          Someone from our care team will reply within one business day. For anything urgent,
          please call the clinic directly.
        </p>
        <Button
          variant="ghost"
          className="mt-6 px-0"
          showArrow={false}
          type="button"
          onClick={() => setStatus("idle")}
        >
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-7" noValidate>
      <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
        <label className="flex flex-col gap-1">
          <span className="text-[0.6875rem] font-medium tracking-[0.16em] text-ink-soft uppercase">
            Full name
          </span>
          <input
            required
            name="name"
            type="text"
            autoComplete="name"
            className={fieldClasses}
            placeholder="Jordan Lee"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-[0.6875rem] font-medium tracking-[0.16em] text-ink-soft uppercase">
            Email
          </span>
          <input
            required
            name="email"
            type="email"
            autoComplete="email"
            className={fieldClasses}
            placeholder="jordan@email.com"
          />
        </label>
      </div>

      <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
        <label className="flex flex-col gap-1">
          <span className="text-[0.6875rem] font-medium tracking-[0.16em] text-ink-soft uppercase">
            Phone (optional)
          </span>
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            className={fieldClasses}
            placeholder="(503) 555-0100"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-[0.6875rem] font-medium tracking-[0.16em] text-ink-soft uppercase">
            Department
          </span>
          <select name="department" defaultValue={departments[0]} className={fieldClasses}>
            {departments.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="flex flex-col gap-1">
        <span className="text-[0.6875rem] font-medium tracking-[0.16em] text-ink-soft uppercase">
          Message
        </span>
        <textarea
          required
          name="message"
          rows={4}
          className={`${fieldClasses} resize-none`}
          placeholder="Tell us what you'd like to be seen for, and a few times that work for you."
        />
      </label>

      {status === "error" && errorMessage && (
        <p className="text-[0.875rem] text-green">{errorMessage}</p>
      )}

      <Button type="submit" className="mt-2 w-fit">
        {status === "submitting" ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
