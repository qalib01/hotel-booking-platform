import type { Metadata } from "next";
import "./globals.css";
import { Header } from "../components/layouts/header";
import { Footer } from "../components/layouts/footer";


export const metadata: Metadata = {
  title: "Hotel Booking System",
  description: "Reserve your hotel and enjoy your special days, taste our delicous meals made by our professional chefs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
