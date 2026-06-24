import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "तर्केश्वर डेन्टल क्लिनिक | आधुनिक दंत चिकित्सा सेवा",
  description: "तर्केश्वर डेन्टल क्लिनिकमा आधुनिक दंत चिकित्सा सेवा। अनुभवी डाक्टर र आधुनिक उपकरण।",
  robots: "index, follow",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ne" className="scroll-smooth">
      <body className="bg-white text-gray-900">{children}</body>
    </html>
  );
}
