import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Anek_Bangla, Geist } from "next/font/google";
import Footer from "./component/Footer/footer";
import Navbar from "./component/header/Navbar";
import ToastMessage from "./component/ToastMessage";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const anikBangla = Anek_Bangla({
  variable: "--font-anik_bangla",
  subsets: ["latin", "bengali"],
});

export const metadata: Metadata = {
  title: "BazarDor",
  description: "A Details of Full Bazar",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        anikBangla.variable,
        "font-sans",
        geist.variable,
      )}
    >
      <body className="flex min-h-screen flex-col bg-base-300">
        <Navbar />
        <ToastMessage />
        {children}
        <Footer />
      </body>
    </html>
  );
}
