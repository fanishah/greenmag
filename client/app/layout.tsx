import Navbar from "./components/navbar";
import "./globals.css";
import { Vazirmatn } from "next/font/google";
const vazir = Vazirmatn({ subsets: ["latin"] });

export const metadata = {
  icons: {
    icon: {
      url: "/favicon.png",
      type: "image/png",
    },
  },
  title: "گرین مگ - خانه عاشقان فناوری",
  keywords: ["گرین مگ", "greanmag", "grean mag"],
  description:
    "مرجع اخبار فناوری، آموزش، راهنمای خرید و بررسی‌ تخصصی محصولات الکترونیک، ویدیو و مشخصات فنی و مقایسه موبایل، لپ تاپ، کامپیوتر",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa-IR" dir="rtl">
      <body className={`bg-gray-950 text-white ${vazir.className}`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
