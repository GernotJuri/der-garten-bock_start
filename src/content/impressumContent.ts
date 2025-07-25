// src/content/ImpressumContent.ts
export const ImpressumContent = {
    header: {
        title: "Impressum",
    },
    address: {
        title: "Anschrift",
        person: "Ing. Gernot Juri",
        street: "Oberwollanigerstr. 3",
        city: "9500 Villach",
        country: "Österreich"
    },
    contact: {
        title: "Kontakt",
        phone: "+43 (0) 664 8285716",
        email: "impressum@gartenbock.at",
        web: "www.gartenbock.at"
    },
    management: {
        title: "Unternehmensangaben",
        businessPurpose: "Wagnerei und Handel",
        chamber: "Magistrat Villach",
        legalBasis: "Gewerbeordnung (www.ris.bka.gv.at)",
        vatId: "Nicht erforderlich (Kleinunternehmer)",
        directors: ["Ing. Gernot Juri"]
    },
    legal: {
        title: "Rechtliche Hinweise",
        disclaimerTitle: "Haftungsausschluss",
        disclaimerText:
            "Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.",
        copyrightTitle: "Urheberrecht",
        copyrightText:
            "Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem österreichischen Urheberrecht.",
        reference: "Weitere Infos: https://www.wko.at/internetrecht/website-impressum"
    }
} as const;
