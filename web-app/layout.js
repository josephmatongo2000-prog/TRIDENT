import "./globals.css";

export const metadata = {
  title: "QuotePro Dashboard",
  description: "Quotation Automation SaaS Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-gray-100 min-h-screen">
        {children}
      </body>
    </html>
  );
}
