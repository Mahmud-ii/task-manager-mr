import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/lib/Provider";
import { Main, Navbar } from "./components/layouts";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Task Manager",
  description: "Save and keep track of your tasks",
};

export default function RootLayout({ children }) {
  return (
    <ReduxProvider>
      <html lang="en">
        <body className={`${inter.className}`}>
          <main className="flex min-h-screen sm:max-h-screen justify-between gap-3 p-4 sm:p-0 sm:relative md:pr-0">
            <Navbar />
            <Main />
            {children}
          </main>
        </body>
      </html>
    </ReduxProvider>
  );
}
