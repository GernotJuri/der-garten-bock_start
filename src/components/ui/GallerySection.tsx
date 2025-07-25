"use client";

import { ChevronLeft, ChevronRight, Info } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { accordionContent } from "@/content/components/accordionContent";
import { Button } from "@/components/ui/button";

export default function GallerySection() {
    const { gallery } = accordionContent;
    const [currentImageIndex, setCurrentImageIndex] = useState<Record<number, number>>({});
    const [showInfoId, setShowInfoId] = useState<number | null>(null);
    const infoRefs = useRef<Record<number, HTMLDivElement | null>>({});

    const prevImage = (id: number, total: number) => {
        setCurrentImageIndex(prev => ({
            ...prev,
            [id]: prev[id] != null ? (prev[id] - 1 + total) % total : total - 1,
        }));
    };

    const nextImage = (id: number, total: number) => {
        setCurrentImageIndex(prev => ({
            ...prev,
            [id]: prev[id] != null ? (prev[id] + 1) % total : 0,
        }));
    };

    const toggleInfo = (id: number) => {
        setShowInfoId(current => (current === id ? null : id));
    };

    useEffect(() => {
        function onOutside(e: MouseEvent) {
            if (
                showInfoId !== null &&
                infoRefs.current[showInfoId] &&
                !infoRefs.current[showInfoId]!.contains(e.target as Node) &&
                !(e.target as HTMLElement).closest('[aria-label="Information anzeigen"]')
            ) {
                setShowInfoId(null);
            }
        }

        document.addEventListener("mousedown", onOutside);
        return () => document.removeEventListener("mousedown", onOutside);
    }, [showInfoId]);

    return (
        <section className="space-y-12">
            <p className="text-muted-foreground mb-8 text-center max-w-3xl mx-auto" data-macaly="gallery-description">
                {gallery.description}
            </p>

            <div className="space-y-12">
                {gallery.imageGalleries.map((item, idx) => {
                    const total = item.images.length;
                    const index = currentImageIndex[item.id] ?? 0;
                    const isInfoVisible = showInfoId === item.id;
                    const isImageRight = idx % 2 === 0;

                    return (
                        <div
                            key={item.id}
                            className={`flex flex-col md:items-center md:gap-10 border border-border rounded-2xl shadow-lg overflow-hidden garden-shadow organic-border ${
                                isImageRight ? "md:flex-row-reverse" : "md:flex-row"
                            }`}
                        >
                            {/* Bildbereich */}
                            <div className="relative w-full md:w-1/2 aspect-video md:aspect-square overflow-hidden rounded-3xl">
                                <img
                                    src={item.images[index]}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-all duration-500 rounded-3xl"
                                />

                                {/* Info-Button */}
                                <Button
                                    onClick={() => toggleInfo(item.id)}
                                    variant="ghost"
                                    className="absolute top-2 left-2 p-2 bg-white/30 backdrop-blur-md rounded-full hover:bg-white/60 z-20"
                                    aria-label="Information anzeigen"
                                >
                                    <Info className="h-5 w-5 text-black" />
                                </Button>

                                {/* Info-Box */}
                                {isInfoVisible && (
                                    <div
                                        ref={(el) => { infoRefs.current[item.id] = el; }}
                                        className="absolute z-[35] top-4 left-2 max-w-xs md:max-w-md bg-white/20 backdrop-blur-sm p-4 rounded-2xl shadow-lg text-sm text-black overflow-y-auto max-h-[600px] pointer-events-auto"
                                    >
                                        {item.information}
                                    </div>
                                )}

                                {/* Navigation Pfeile */}
                                {total > 1 && (
                                    <>
                                        <button
                                            onClick={() => prevImage(item.id, total)}
                                            aria-label="Vorheriges Bild"
                                            className="absolute top-1/2 left-3 -translate-y-1/2 bg-primary/70 hover:bg-primary text-white rounded-full p-2 z-10"
                                        >
                                            <ChevronLeft className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => nextImage(item.id, total)}
                                            aria-label="Nächstes Bild"
                                            className="absolute top-1/2 right-3 -translate-y-1/2 bg-primary/70 hover:bg-primary text-white rounded-full p-2 z-10"
                                        >
                                            <ChevronRight className="w-5 h-5" />
                                        </button>
                                    </>
                                )}
                            </div>

                            {/* Textbereich */}
                            <div className="flex-1 p-6 space-y-4">
                                <h3 className="text-2xl font-cormorant font-semibold text-foreground">{item.title}</h3>
                                <p className="text-muted-foreground text-sm">{item.description}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
