// Cookie setzen
export function setCookie(name: string, value: string, days: number = 30): void {
    if (typeof document === "undefined") return; // nur im Browser
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}

// Cookie auslesen
export function getCookie(name: string): string | null {
    if (typeof document === "undefined") return null; // verhindert SSR-Fehler
    const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
    return match ? decodeURIComponent(match[1]) : null;
}

