import type { Metadata } from "next";
import "@/app/globals.css";
import Header from "@/components/header";

export const metadata: Metadata = {
  title: "formic",
  description: "Create and use your own forms",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <section className="min-h-screen h-px flex flex-col">
            <Header/>
            <div className="grow h-px flex flex-col">
                {children}
            </div>
        </section>
      
  );
}
