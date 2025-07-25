import { useState, useEffect } from "react";
import { toast } from "sonner";
import { getCookie, setCookie } from "@/lib/cookies";

interface ContactFormData {
  name: string;
  email: string;
  product: string;
  message: string;
  privacy: boolean;
  files: FileList | null;
}

export function useContactLogic() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    product: "",
    message: "",
    privacy: false,
    files: null,
  });

  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const productParam = urlParams.get("product");

    const savedName = getCookie("contact_name") || "";
    const savedEmail = getCookie("contact_email") || "";

    setFormData((prev) => ({
      ...prev,
      product: productParam ?? prev.product,
      name: savedName,
      email: savedEmail,
    }));
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.email || !formData.message) {
      toast.error("Bitte füllen Sie alle Pflichtfelder aus.");
      return;
    }

    if (!formData.privacy) {
      toast.error("Bitte akzeptieren Sie die Datenschutzbestimmungen.");
      return;
    }

    setIsSending(true);

    try {
      const data = new FormData();

      for (const [key, value] of Object.entries(formData)) {
        if (key === "files" && value instanceof FileList) {
          Array.from(value).forEach((file) => data.append("file", file));
        } else if (typeof value === "string" || typeof value === "boolean") {
          data.append(key, value.toString());
        }
      }

      data.append("context", "contact");

      const response = await fetch("/api/contact", {
        method: "POST",
        body: data,
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.error || "Fehler beim Senden der Nachricht.");
        return;
      }

      setCookie("contact_name", formData.name);
      setCookie("contact_email", formData.email);

      toast.success("Ihre Nachricht wurde erfolgreich gesendet!");
      resetForm();
    } catch (error) {
      console.error("Fehler beim Submit:", error);
      toast.error("Ein unerwarteter Fehler ist aufgetreten.");
    } finally {
      setIsSending(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: getCookie("contact_name") || "",
      email: getCookie("contact_email") || "",
      product: "",
      message: "",
      privacy: false,
      files: null,
    });
  };

  const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, type } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
    } else if (type === "file") {
      setFormData((prev) => ({ ...prev, [name]: (e.target as HTMLInputElement).files }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: e.target.value }));
    }
  };

  const setPrivacyChecked = (checked: boolean) =>
      setFormData((prev) => ({ ...prev, privacy: checked }));

  return {
    formData,
    isSending,
    handleSubmit,
    handleChange,
    setPrivacyChecked,
  };
}
