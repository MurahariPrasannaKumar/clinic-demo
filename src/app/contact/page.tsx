import type { Metadata } from "next";
import { Contact } from "@/components/contact/contact";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a visit at Alder Clinic in Portland, or reach our care team by phone, email, or the contact form below.",
};

export default function Page() {
  return <Contact />;
}
