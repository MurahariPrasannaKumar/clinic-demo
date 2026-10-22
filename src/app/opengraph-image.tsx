import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          background: "#0a3d2c",
          color: "#ffffff",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 56,
              height: 56,
              background: "#0e6b4c",
              color: "#ffffff",
              fontSize: 24,
              fontWeight: 600,
            }}
          >
            A
          </div>
          <div style={{ display: "flex", fontSize: 40, fontWeight: 600, letterSpacing: "-0.02em" }}>
            Alder Clinic
          </div>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 40,
            fontSize: 52,
            fontWeight: 600,
            letterSpacing: "-0.02em",
            lineHeight: 1.15,
            maxWidth: 900,
          }}
        >
          Attentive care, unhurried by design.
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 24,
            fontSize: 24,
            color: "rgba(255,255,255,0.7)",
            maxWidth: 760,
          }}
        >
          Independent primary &amp; specialty care in Portland, Oregon.
        </div>
      </div>
    ),
    { ...size },
  );
}
