// File: services/components/headerService.ts

export const searchIndex = [
    { keywords: ["startseite", "home", "video"], href: "/" },
    { keywords: ["galerie", "gallery", "bilder", "videos"], href: "/#gallery" },
    { keywords: ["produkte", "products", "shop"], href: "/#products" },
    { keywords: ["stellt sich vor", "introduces himself"], href: "/#about" },
    { keywords: ["über uns", "about", "unternehmen"], href: "/about" },
    { keywords: ["kontakt", "contact", "anfrage", "email", "phonenumber"], href: "/contact" },
    { keywords: ["impressum", "legal"], href: "/impressum" },
    { keywords: ["datenschutz", "privacy"], href: "/datenschutz" },
];

export function matchSearchQuery(query: string): string | null {
    const normalized = query.toLowerCase().trim();

    const match = searchIndex.find(item =>
        item.keywords.some(kw =>
            kw.toLowerCase().includes(normalized) ||
            kw.toLowerCase().startsWith(normalized) ||
            kw.toLowerCase().endsWith(normalized)
        )
    );

    return match?.href || null;
}
