import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { business } from "@/data/business";

export async function HowToBook() {
  const t = await getTranslations("home");
  const [phone1, phone2] = business.phones;

  const steps = [
    { title: t("step1Title"), text: t("step1Text") },
    { title: t("step2Title"), text: t("step2Text", { phone1, phone2 }) },
    { title: t("step3Title"), text: t("step3Text") },
  ];

  return (
    <section className="bg-brand-primary-dark py-14 lg:py-24">
      <Container>
        <div className="flex flex-col gap-7 lg:gap-14">
          <h2 className="text-[40px] font-extrabold leading-none tracking-tight text-white lg:text-[56px]">
            {t("howTitle")} <span className="font-script text-brand-accent">{t("howScript")}</span>
          </h2>
          <ol className="grid gap-3.5 lg:grid-cols-3 lg:gap-7">
            {steps.map((step, i) => (
              <li
                key={step.title}
                className="flex items-start gap-[18px] rounded-3xl border border-[#2e5a9b] bg-[#1d4074] p-6 lg:flex-col lg:gap-4 lg:rounded-[28px] lg:p-9"
              >
                <span className="font-script w-9 shrink-0 text-[56px] leading-[0.9] text-brand-accent lg:w-auto lg:text-[72px]">
                  {i + 1}
                </span>
                <div className="flex flex-col gap-1.5 lg:gap-4">
                  <h3 className="text-2xl font-bold leading-tight text-white lg:text-[30px]">{step.title}</h3>
                  <p className="text-base leading-normal text-[#cfdcf0] lg:text-[17px] lg:leading-relaxed">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
