"use client";

import { ChevronLeft, ChevronRight, Info } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export default function GallerySection() {
    useEffect(() => {
        // Beispiel-Effekt: später mit Logik befüllen
        console.log("GallerySection mounted");

        return () => {
            console.log("GallerySection unmounted");
        };
    }, []);

    return (
        <section className="space-y-12">
            <p className="text-muted-foreground mb-8 text-center max-w-3xl mx-auto">
                Galerie folgt in Kürze...
            </p>
        </section>
    );
}
