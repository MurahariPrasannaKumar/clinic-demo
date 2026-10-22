import type { Metadata } from "next";
import { Doctors } from "@/components/doctors/doctors";

export const metadata: Metadata = {
  title: "Doctors",
  description:
    "Meet the five physicians of Alder Clinic across primary care, cardiology, pediatrics, dermatology, and behavioral health.",
};

export default function Page() {
  return <Doctors />;
}
