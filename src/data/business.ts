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
  // The footer only shows a social link when its URL is filled in.
  social: {
    instagram: "https://www.instagram.com/jamestravelrd",
    facebook: "",
  },
  // Deposit accounts exactly as printed on James Travel's own
  // "Números de cuentas para depósitos" flyer. The site only displays
  // them; it never processes a payment.
  payments: {
    domestic: {
      holder: "Jaime José González",
      idNumber: "031-0408454-0",
      banks: [
        {
          name: "Banco Popular",
          accounts: [
            {
              number: "738-758077",
              currency: "RD$",
              type: { es: "Cuenta corriente", en: "Checking account" },
            },
            {
              number: "765-458088",
              currency: "US$",
              type: { es: "Cuenta corriente", en: "Checking account" },
            },
          ],
        },
        {
          name: "Banreservas",
          accounts: [
            {
              number: "120-124 622 9",
              currency: "RD$",
              type: { es: "Cuenta de ahorro", en: "Savings account" },
            },
            {
              number: "252-0005286",
              currency: "US$",
              type: { es: "Cuenta de ahorro", en: "Savings account" },
            },
          ],
        },
        {
          name: "Banco BHD León",
          accounts: [
            {
              number: "17837690018",
              currency: "RD$",
              type: { es: "Cuenta de ahorro", en: "Savings account" },
            },
          ],
        },
        {
          name: "Asociación Cibao",
          accounts: [
            {
              number: "100300062768",
              type: { es: "Cuenta James Travel", en: "James Travel account" },
            },
            {
              number: "100110079554",
              type: { es: "Cuenta de ahorros", en: "Savings account" },
            },
          ],
        },
      ],
    },
    international: {
      bank: "Bank of America",
      beneficiary: "ETB Tours, LLC",
      address: "950 S Pine Island Road, A-150, Plantation, FL 33324",
      zelle: "michelle@etbtours.net",
      accountNumber: "898029946085",
      ach: "063100277",
      wire: "026009593",
      swift: "BOFAUS3N",
    },
  },
} as const;

export function buildWhatsAppLink(message: string) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${business.whatsappNumber}?text=${encoded}`;
}
