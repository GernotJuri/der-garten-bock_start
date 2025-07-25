import { Shield, Leaf, Lock, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DatenschutzContent } from "@/content/datenschutzContent";
import { ImpressumContent } from "@/content/impressumContent";

type SectionContent =
    | { heading: string; text: string }
    | { heading: string; list: string[] };

type Section = {
  icon: "leaf" | "lock" | "eye" | "shield";
  title: string;
  content?: SectionContent[];
};

export default function DatenschutzPage() {
  return (
      <div className="min-h-screen bg-background py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
              </div>
              <h1 className="text-4xl font-cormorant font-bold text-foreground mb-4">
                {DatenschutzContent.header.title}
              </h1>
              <p className="text-xl text-muted-foreground">
                {DatenschutzContent.header.subtitle}
              </p>
            </div>

            {/* Sections */}
            <div className="grid gap-8">
              {(DatenschutzContent.sections as Section[]).map((section, index) => (
                  <Card key={index} className="organic-border garden-shadow">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 font-cormorant">
                        {section.icon === "leaf" && <Leaf className="w-5 h-5 text-primary" />}
                        {section.icon === "lock" && <Lock className="w-5 h-5 text-primary" />}
                        {section.icon === "eye" && <Eye className="w-5 h-5 text-primary" />}
                        {section.icon === "shield" && <Shield className="w-5 h-5 text-primary" />}
                        {section.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {section.content?.map((block, i) => (
                          <div key={i}>
                            {"heading" in block && <h3 className="font-semibold mb-2">{block.heading}</h3>}

                            {"text" in block && typeof block.text === "string" && (
                                <p className="text-muted-foreground text-sm">{block.text}</p>
                            )}

                            {"list" in block && Array.isArray(block.list) && (
                                <ul className="text-muted-foreground text-sm space-y-1">
                                  {block.list.map((item, j) => (
                                      <li key={j}>• {item}</li>
                                  ))}
                                </ul>
                            )}
                          </div>
                      ))}
                    </CardContent>
                  </Card>
              ))}

              {/* Kontakt-Abschnitt aus Impressum */}
              <Card className="organic-border garden-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-cormorant">
                    <Leaf className="w-5 h-5 text-primary" />
                    Kontakt
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground text-sm">
                    Bei Fragen zum Datenschutz können Sie sich jederzeit an uns wenden:
                  </p>
                  <div>
                    <p className="font-semibold">{ImpressumContent.address.company}</p>
                    <p className="text-muted-foreground text-sm">
                      {ImpressumContent.address.street}<br />
                      {ImpressumContent.address.city}<br />
                      E-Mail: {ImpressumContent.contact.email}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
  );
}
