import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "TrustNova - brand, website and digital marketing studio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* The picture Google, WhatsApp, LinkedIn and X show for trustnova.in: the logo, what we do and where, in the brand's
   charcoal, terracotta and soft cream. */
const INK = "#221D1A", TERRA = "#B5482A", CREAM = "#F6EDE6", MUTED = "#5E5650";

export default async function Image() {
  const logo = await fetch(new URL("../public/logo-ink-tight.png", import.meta.url)).then((r) => r.arrayBuffer());
  const chips = ["Logos & brand identity", "Websites in 2-4 weeks", "SEO & social media"];
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: "#FFFFFF", fontFamily: "sans-serif" }}>
        <div style={{ flex: 1, display: "flex", alignItems: "center", padding: "0 64px", gap: 44,
                      background: `linear-gradient(120deg, #FFFFFF 0%, #FFFFFF 46%, ${CREAM} 100%)` }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logo as unknown as string} width={240} height={198} alt="" />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 92, fontWeight: 900, color: INK, letterSpacing: "-3px", lineHeight: 1 }}>
              Trust<span style={{ color: TERRA }}>Nova</span>
            </div>
            <div style={{ display: "flex", fontSize: 36, fontWeight: 700, color: INK, marginTop: 18 }}>Brand, Website &amp; Digital Marketing Studio</div>
            <div style={{ display: "flex", fontSize: 28, color: MUTED, marginTop: 10 }}>Based in India · Working with clients worldwide</div>
            <div style={{ display: "flex", gap: 10, marginTop: 30 }}>
              {chips.map((c) => (
                <div key={c} style={{ display: "flex", fontSize: 20, fontWeight: 700, color: TERRA, background: "#FFFFFF",
                                      border: `2px solid ${TERRA}`, borderRadius: 999, padding: "7px 16px" }}>{c}</div>
              ))}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: TERRA, color: "#FFFFFF",
                      padding: "22px 72px", fontSize: 26, fontWeight: 700 }}>
          <span>trustnova.in</span>
          <span>Free demo · WhatsApp +91 95022 24444</span>
        </div>
      </div>
    ),
    size,
  );
}
