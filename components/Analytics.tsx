import Script from "next/script";

/** Google Analytics 4 for www.trustnova.in. The measurement ID is public; NEXT_PUBLIC_GA_ID overrides it. */
const DEFAULT_GA_ID = "G-CXS2SW1NFX";

export default function Analytics() {
  const id = process.env.NEXT_PUBLIC_GA_ID || DEFAULT_GA_ID;
  if (process.env.NODE_ENV !== "production") return null;   // keep local development out of the numbers

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" />
      <Script id="ga4" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${id}');`}
      </Script>
    </>
  );
}
