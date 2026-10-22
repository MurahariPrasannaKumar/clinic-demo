import type { Metadata } from "next";
import { About } from "@/components/about/about";

export const metadata: Metadata = {
  title: "About",
  description:
    "Alder Clinic is an independent, physician-owned practice founded in 2011 and built around thirty-minute visits and a shared care team.",
};

export default function Page() {
  return <About />;
}
