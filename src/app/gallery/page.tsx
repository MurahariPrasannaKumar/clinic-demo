import type { Metadata } from "next";
import { Gallery } from "@/components/gallery/gallery";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "A look inside Alder Clinic — our waiting areas, exam rooms, and care spaces in Portland.",
};

export default function Page() {
  return <Gallery />;
}
