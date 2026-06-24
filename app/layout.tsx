import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "तर्केश्वर डेन्टल क्लिनिक",
  description: "आधुनिक दंत चिकित्सा सेवा",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ne">
      <body>{children}</body>
    </html>
  );
}
