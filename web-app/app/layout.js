import "./globals.css";

export const metadata = {
  title: "QuotePro Automation Dashboard",
  description: "Smart quotation and inventory automation system",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="corporate">
      <body className="min-h-screen bg-vibrant-gradient bg-400 animate-gradientMove text-white font-sans">
        <div className="min-h-screen flex flex-col items-center justify-center p-10">
          <div className="w-full max-w-6xl bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-10">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
