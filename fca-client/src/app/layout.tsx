import "./globals.css";

import type { Metadata } from "next";
import { font } from "@/libs/fonts";

export const metadata: Metadata = {
    title: "FCA",
    description: "A Simple Flash-Cards App",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en">
            <body className={`${font.className} flex flex-col h-screen bg-zinc-800 text-white`}>
                {children}
            </body>
        </html>
    );
}
