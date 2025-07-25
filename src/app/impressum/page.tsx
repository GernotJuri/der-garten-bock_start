// src/app/impressum/page.tsx
import { ImpressumContent } from "@/content/impressumContent";
import { Leaf, MapPin, Phone, Mail } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ImpressumPage() {
  const c = ImpressumContent;

  return (
      <div className="min-h-screen bg-background py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                  <Leaf className="w-8 h-8 text-primary" />
                </div>
              </div>
              <h1 className="text-4xl font-cormorant font-bold text-foreground mb-4">{c.header.title}</h1>
            </div>

            <div className="grid gap-8">
              {/* Anschrift */}
              <Card className="organic-border garden-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-cormorant">
                    <MapPin className="w-5 h-5 text-primary" />
                    {c.address.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <h3 className="font-semibold">{c.address.person}</h3>
                  <p className="text-muted-foreground">
                    {c.address.street}<br />
                    {c.address.city}<br />
                    {c.address.country}
                  </p>
                </CardContent>
              </Card>

              {/* Kontakt */}
              <Card className="organic-border garden-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-cormorant">
                    <Phone className="w-5 h-5 text-primary" />
                    {c.contact.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold mb-2">Telefon</h3>
                    <p className="text-muted-foreground">{c.contact.phone}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">E-Mail</h3>
                    <p className="text-muted-foreground">{c.contact.email}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Rechtliches */}
              <Card className="organic-border garden-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-cormorant">
                    <Mail className="w-5 h-5 text-primary" />
                    {c.legal.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">{c.legal.disclaimerTitle}</h3>
                    <p className="text-muted-foreground text-sm">{c.legal.disclaimerText}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">{c.legal.copyrightTitle}</h3>
                    <p className="text-muted-foreground text-sm">{c.legal.copyrightText}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
  );
}
