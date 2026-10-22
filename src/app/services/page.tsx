import type { Metadata } from "next";
import { Services } from "@/components/services/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Primary care, pediatrics, cardiology, dermatology, behavioral health, and physical therapy, all coordinated from one shared patient record at Alder Clinic.",
};

export default function Page() {
  return <Services />;
}
