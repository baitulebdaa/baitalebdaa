import "./reference.css";
import "./lab.css";

export const metadata = {
  title: "Design Lab | Bait Al Ebdaa",
  description: "Review service page designs, compare layouts and record studio design decisions.",
  robots: { index: false, follow: false },
};

export default function Layout({ children }) {
  return <html lang="en"><body className="bg-page font-sans antialiased">{children}</body></html>;
}
