/**
 * v0 by Vercel.
 * @see https://v0.dev/t/vyAUApUsCcM
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export default function AccordionItems() {
  return (
    <section className="mx-auto w-full max-w-3xl py-12 md:py-24">
      <div className="space-y-6">
        <h2 className="text-center text-3xl font-bold tracking-tighter md:text-4xl">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible>
          <AccordionItem value="faq-1">
            <AccordionTrigger className="flex w-full items-center justify-between rounded-lg bg-white px-4 py-3 text-left shadow-sm hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-gray-300 dark:bg-gray-950 dark:text-gray-50 dark:hover:bg-gray-800 dark:focus-visible:ring-gray-700">
              <span className="text-base font-medium">
                What is the refund policy?
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-4 py-3 text-gray-500 dark:text-gray-400">
              We offer a 30-day money-back guarantee on all our products. If you
              are not satisfied, you can return the item for a full refund.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="faq-2">
            <AccordionTrigger className="flex w-full items-center justify-between rounded-lg bg-white px-4 py-3 text-left shadow-sm hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-gray-300 dark:bg-gray-950 dark:text-gray-50 dark:hover:bg-gray-800 dark:focus-visible:ring-gray-700">
              <span className="text-base font-medium">
                How long does shipping take?
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-4 py-3 text-gray-500 dark:text-gray-400">
              We offer standard shipping that typically takes 5-7 business days.
              Expedited shipping is also available for an additional fee.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="faq-3">
            <AccordionTrigger className="flex w-full items-center justify-between rounded-lg bg-white px-4 py-3 text-left shadow-sm hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-gray-300 dark:bg-gray-950 dark:text-gray-50 dark:hover:bg-gray-800 dark:focus-visible:ring-gray-700">
              <span className="text-base font-medium">
                Do you offer a warranty?
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-4 py-3 text-gray-500 dark:text-gray-400">
              Yes, all our products come with a 1-year warranty. If you
              experience any issues, please contact our customer support team.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="faq-4">
            <AccordionTrigger className="flex w-full items-center justify-between rounded-lg bg-white px-4 py-3 text-left shadow-sm hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-gray-300 dark:bg-gray-950 dark:text-gray-50 dark:hover:bg-gray-800 dark:focus-visible:ring-gray-700">
              <span className="text-base font-medium">
                Can I cancel my order?
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-4 py-3 text-gray-500 dark:text-gray-400">
              Yes, you can cancel your order within 24 hours of placing it.
              After that, we may not be able to cancel the order, but you can
              still return the item for a refund.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}
