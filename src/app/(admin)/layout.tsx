import "../../styles/globals.css";

export const metadata = {
  title: "Zyverra Admin",
  robots: { index: false, follow: false },
  icons: { icon: "/favicon-32.png", apple: "/apple-icon.png" },
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-background text-foreground">{children}</body>
    </html>
  );
}
