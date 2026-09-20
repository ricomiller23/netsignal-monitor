import "./globals.css";
import { Navbar } from "@/components/Navbar";

export const metadata = {
  title: "NETSIGNAL — Internet Outage & Network-Integrity Monitor",
  description: "Where connectivity is disrupted — and who is saying why. Observation and cause held as strictly separate facts.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-bg text-text min-h-screen flex flex-col font-ui antialiased">
        <Navbar />
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
        <footer className="border-t border-border bg-white py-6 text-xs text-text-muted">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <span className="font-bold text-text">NETSIGNAL</span> · The Monitor Series — Volume II (Part 18)
            </div>
            <div className="text-text-faint">
              An anomaly is not an outage. Causes are attributed assertions quoted verbatim. Ongoing disruptions report duration as unknown.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
