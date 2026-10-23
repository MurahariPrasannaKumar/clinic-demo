"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { faqs } from "@/lib/content";

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div>
      {faqs.map((item, i) => {
        const open = openIndex === i;
        return (
          <div key={item.q} className={i > 0 ? "border-t border-line" : ""}>
            <button
              type="button"
              onClick={() => setOpenIndex(open ? null : i)}
              aria-expanded={open}
              className="flex w-full items-center justify-between gap-6 py-7 text-left md:py-8"
            >
              <span className="font-display text-xl tracking-tight text-ink md:text-2xl">
                {item.q}
              </span>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-mist text-green-text">
                {open ? (
                  <Minus size={16} strokeWidth={1.75} />
                ) : (
                  <Plus size={16} strokeWidth={1.75} />
                )}
              </span>
            </button>
            <div
              className={`grid transition-all duration-300 ease-out ${
                open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
              style={{ display: "grid" }}
            >
              <div className="overflow-hidden">
                <p className="max-w-2xl pb-8 text-pretty text-[1.0625rem] leading-relaxed text-ink-soft md:pb-10">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
