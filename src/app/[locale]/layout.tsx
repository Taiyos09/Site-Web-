import type { Metadata } from "next";
import Script from "next/script";

import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";

import CookieBanner from "@/components/CookieBanner";

export const metadata: Metadata = {
  title: "L'Auberge de St Aubin",
  description: "Bar - Restaurant - Chambres d'hôtes",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <>
      <NextIntlClientProvider messages={messages}>
        {children}
        <CookieBanner />
      </NextIntlClientProvider>

      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Hotel",
            name: "Auberge de St Aubin",
            description: "Hôtel restaurant convivial au cœur du Bourbonnais.",
            telephone: "+33470665097",
            email: "contact@auberge-st-aubin.fr",
            address: {
              "@type": "PostalAddress",
              streetAddress: "21 Rue Saint-Barnabé",
              addressLocality: "Saint-Aubin-le-Monial",
              postalCode: "03160",
              addressCountry: "FR",
            },
            url: "https://auberge-st-aubin.fr",
            image: "https://auberge-st-aubin.fr/images/auberge-de-saint-aubin.jpg",
            servesCuisine: [
              "Cuisine française",
              "Cuisine traditionnelle",
            ],
            priceRange: "€€",
          }),
        }}
      />
    </>
  );
}