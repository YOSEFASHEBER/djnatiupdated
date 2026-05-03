import "./globals.css";
import ConditionalNavbar from "@/components/ConditionalNavBar";
import ConditionalFooter from "@/components/ConditionalFooter";
import FloatingContact from "./(public)/contact/FloatingContact";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

export const metadata = {
  title: {
    default: "DJ NATI Cars | Buy Cars in Ethiopia",
    template: "%s | DJ NATI Cars",
  },
  description:
    "Browse verified cars in Addis Ababa with transparent pricing and trusted sellers.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white text-slate-900 antialiased">
        <ConditionalNavbar />

        <main>
          {children}
          <FloatingContact />
        </main>

        <ConditionalFooter />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
