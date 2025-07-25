// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Cormorant_Garamond, Open_Sans } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";

const cormorant = Cormorant_Garamond({
    subsets: ["latin"],
    variable: "--font-cormorant",
    weight: ["300", "400", "500", "600", "700"],
});

const openSans = Open_Sans({
    subsets: ["latin"],
    variable: "--font-open-sans",
    weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
    title: "Der Gartenbock - Natürliche Gartenprodukte",
    description:
        "Entdecken Sie unsere hochwertigen Gartenprodukte für Ihren Traumgarten. Natürlich, nachhaltig und liebevoll ausgewählt.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="de" suppressHydrationWarning>
        <body className={`${cormorant.variable} ${openSans.variable} font-open-sans`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <div className="min-h-screen bg-background text-foreground">
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
            </div>
            <Toaster />
        </ThemeProvider>
        </body>
        </html>
    );
}
