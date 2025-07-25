import { useState, useEffect } from "react";

export function useAccordionLogic(initialValue: string = "gallery") {
    const [accordionValue, setAccordionValue] = useState<string>(initialValue);
    const [openVideoIndex, setOpenVideoIndex] = useState<number | null>(null);

    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash.replace("#", "");
            const validHashes = ["gallery", "products", "about"];

            if (validHashes.includes(hash)) {
                // Erzwinge das Setzen, selbst wenn der gleiche Wert bereits gesetzt ist
                setAccordionValue(""); // temporär leeren
                setTimeout(() => setAccordionValue(hash), 0); // dann korrekt setzen

                // Scrollen
                const el = document.getElementById(hash);
                if (el) {
                    setTimeout(() => {
                        el.scrollIntoView({ behavior: "smooth", block: "start" });

                        setTimeout(() => {
                            const yOffset = -200; 
                            const y = window.pageYOffset + yOffset;
                            window.scrollTo({ top: y, behavior: "smooth" });
                        }, 50);
                    }, 100);
                }
            }
        };

        handleHashChange(); 
        window.addEventListener("hashchange", handleHashChange);

        return () => window.removeEventListener("hashchange", handleHashChange);
    }, []);

    return {
        accordionValue,
        setAccordionValue,
        openVideoIndex,
        setOpenVideoIndex,
    };
}
