import type { Metadata } from "next";
import { Red_Hat_Text, Inter } from "next/font/google";
import { headers, cookies } from "next/headers";
import { getDictionary } from "@/i18n";
import { parseLocale } from "@/i18n/config";
import { DictionaryProvider } from "@/i18n/DictionaryProvider";
import type { Locale } from "@/i18n/config";
import CustomCursor from "@/ui/CustomCursor";
import "./globals.css";

const redHatText = Red_Hat_Text({
  variable: "--font-red-hat-text",
  subsets: ["latin", "latin-ext"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
});

const SEO = {
  ru: {
    title: "NIRO DEV — Fullstack веб-разработчик",
    description:
      "Fullstack веб-разработчик с большим опытом. Создаю современные сайты, лендинги и веб-приложения на React, Next.js, Node.js. Портфолио, отзывы клиентов и прозрачный процесс работы.",
    keywords: [
      "fullstack разработчик",
      "веб-разработчик",
      "создание сайтов",
      "лендинг",
      "React",
      "Next.js",
      "фронтенд",
      "бэкенд",
      "портфолио",
    ],
  },
  en: {
    title: "NIRO DEV — Fullstack Web Developer",
    description:
      "Experienced fullstack web developer. I build modern websites, landing pages and web applications with React, Next.js, Node.js. Portfolio, client reviews and a transparent workflow.",
    keywords: [
      "fullstack developer",
      "web developer",
      "website development",
      "landing page",
      "React",
      "Next.js",
      "frontend",
      "backend",
      "portfolio",
    ],
  },
} as const;

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const saved = cookieStore.get("locale")?.value as Locale | undefined;
  const headersList = await headers();
  const acceptLang = headersList.get("accept-language");
  const locale: Locale =
    saved && (saved === "en" || saved === "ru") ? saved : parseLocale(acceptLang);
  const seo = SEO[locale];

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://niro.studio"),
    title: {
      default: seo.title,
      template: `%s | NIRO DEV`,
    },
    description: seo.description,
    keywords: [...seo.keywords],
    authors: [{ name: "NIRO DEV", url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://nirodev.com" }],
    creator: "NIRO DEV",
    openGraph: {
      type: "website",
      locale: locale === "ru" ? "ru_RU" : "en_US",
      alternateLocale: locale === "ru" ? "en_US" : "ru_RU",
      title: seo.title,
      description: seo.description,
      siteName: "NIRO DEV",
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/favicon.png", type: "image/png", sizes: "32x32" },
      ],
      apple: "/favicon.png",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const saved = cookieStore.get("locale")?.value as Locale | undefined;

  let locale: Locale;
  if (saved && (saved === "en" || saved === "ru")) {
    locale = saved;
  } else {
    const headersList = await headers();
    const acceptLang = headersList.get("accept-language");
    locale = parseLocale(acceptLang);
  }

  const dictionary = await getDictionary(locale);

  return (
    <html lang={locale}>
      <body
        className={`${redHatText.variable} ${inter.variable} ${redHatText.className} antialiased`}
      >
        <CustomCursor />
        <DictionaryProvider dictionary={dictionary}>
          {children}
        </DictionaryProvider>
      </body>
    </html>
  );
}
