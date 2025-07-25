import { Leaf, Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";
import { footerContent } from "@/content/components/footerContent";
import { contactContent } from "@/content/contactContent";

export function Footer() {
  const { company, service, copyright } = footerContent;

  return (
      <footer className="bg-card border-t border-border mt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo & Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Leaf className="w-6 h-6 text-primary" />
                <h3 className="text-lg font-cormorant font-semibold">{company.name}</h3>
              </div>
              <p className="text-muted-foreground text-sm">{company.slogan}</p>
            </div>

            {/* Service */}
            <div>
              <h4 className="font-cormorant font-semibold mb-4">{footerContent.serviceTitle}</h4>
              <ul className="space-y-2">
                {service.map((item, index) => (
                    <li key={index}>
                      <Link href={item.href} className="text-muted-foreground hover:text-foreground transition-colors">
                        {item.label}
                      </Link>
                    </li>
                ))}
              </ul>
            </div>

            {/* Kontakt */}
            <div>
              <h4 className="font-cormorant font-semibold mb-4">{contactContent.contactInfo.contectTitel}</h4>
              <div className="space-y-3 text-muted-foreground text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>{contactContent.contactInfo.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>{contactContent.contactInfo.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <div className="flex flex-col">
                    <span>{contactContent.contactInfo.address.line1}</span>
                    <span>{contactContent.contactInfo.address.zip + " " + contactContent.contactInfo.address.city}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>{copyright}</p>
          </div>
        </div>
      </footer>
  );
}
