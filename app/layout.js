import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/components/ReduxProvider";
import Menu from "@/components/Menu";
import AuthLoader from "@/components/auth/AuthLoader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Hoortrade Product Manager",
  description: "Application de gestion de produit Hoortrade",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <ReduxProvider>
          <AuthLoader />
          <div className=" bg-zinc-100 dark:bg-zinc-800 min-h-screen">
            <Menu />
            <main className="container mx-auto min-h-screen p-4">
              {children}
            </main>
          </div>
        </ReduxProvider>
      </body>
    </html>
  );
}
