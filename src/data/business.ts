// Business contact & payment details. Phone numbers below are the real
// numbers printed on James Travel's own tour flyers ("Para reservar debe
// de llamar"). Confirm which of the two is WhatsApp-enabled and update
// whatsappNumber if needed — everything marked [PLACEHOLDER] is still
// example data to replace before launch. Nothing else in the app needs
// to change; every page reads from this file.
export const business = {
  whatsappNumber: "18098541113", // from flyers (809-854-1113) — confirm this line has WhatsApp
  whatsappDisplay: "+1 (809) 854-1113",
  phones: ["809-854-1113", "809-241-7012"], // from flyers
  phoneDisplay: "+1 (809) 854-1113 / +1 (809) 241-7012",
  email: "jaimegonzalez1@hotmail.com", // printed on James Travel flyers
  address: {
    es: "Santiago de los Caballeros, República Dominicana",
    en: "Santiago de los Caballeros, Dominican Republic",
  },
  // Leave empty until the client confirms the real accounts; the footer
  // only shows a social link when its URL is filled in.
  social: {
    instagram: "",
    facebook: "",
  },
  payments: {
    zelle: {
      recipient: "James Travel SRL", // [PLACEHOLDER]
      emailOrPhone: "pagos@jamestravel.example.com", // [PLACEHOLDER]
    },
    bankTransferRD: {
      bankName: "Banco Popular Dominicano", // [PLACEHOLDER]
      accountName: "James Travel SRL", // [PLACEHOLDER]
      accountType: { es: "Cuenta de ahorros", en: "Savings account" },
      accountNumber: "000-000000-0", // [PLACEHOLDER]
      rnc: "000-00000-0", // [PLACEHOLDER]
    },
  },
} as const;

export function buildWhatsAppLink(message: string) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${business.whatsappNumber}?text=${encoded}`;
}
