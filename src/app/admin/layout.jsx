import { DM_Sans, Manrope } from "next/font/google";
import "./admin.css";

// The admin panel's own root layout (owner's design, 26 Oct 2026): none of the public
// site's header, footer, Ask Ali or analytics, and never indexed.
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", display: "swap" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });

export const metadata = {
  title: { default: "Admin", template: "%s | Bait Al Ebdaa Admin" },
  robots: { index: false, follow: false, nocache: true },
};

export const viewport = { themeColor: "#161615" };

export default function AdminRootLayout({ children }) {
  return (
    <html lang="en" dir="ltr" className={`${dmSans.variable} ${manrope.variable}`}>
      <body className="adm">{children}</body>
    </html>
  );
}
