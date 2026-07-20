import "./globals.css";

import {
  Libre_Baskerville,
  Poppins
} from "next/font/google";

const libre = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-title",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      suppressHydrationWarning
      lang="fr"
      className={`${libre.variable} ${poppins.variable}`}
    >
      <body className="min-h-screen bg-[#f5f1ea] text-[#2f241d] font-sans">
        {children}
      </body>
    </html>
  );
}