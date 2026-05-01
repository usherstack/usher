import React from "react";
import { PageTransition } from "@/components/shared/PageTransition";
import { motion } from "framer-motion";
import { Link } from "wouter";

export default function TermsOfService() {
  const sections = [
    {
      title: "1. Services & Engagement",
      content: `USHER provides end-to-end digital solutions including web design, graphic design, and related creative services (the "Services") as outlined in the Statement of Work (SOW).
      • Project Kickoff: Work begins only after the initial deposit is received and the SOW is signed.
      • Guidelines: Design guidelines, etc.) are provided only if quoted in the scope. Additional changes will be billed at our standard hourly rate.`,
    },
    {
      title: "2. Intellectual Property (IP) Rights",
      content: `We believe in clear ownership to build trust with our partners.
      • Client Ownership: Upon full and final payment, the final design assets are exclusively yours for their exclusive use.
      • Agency Rights: USHER retains the right to display the work in our portfolio, case studies, and social media for purposes, unless a non-disclosure agreement (NDA) is in place.
      • Respect for Third Parties: The Client agrees not to reproduce, distribute, or claim credit for all sketches, rejected concepts, and unused design iterations.`,
    },
    {
      title: "3. Payment Terms",
      content: `• Structure: Payments are typically 50% upfront / 50% upon completion for smaller projects, or milestone-based payments for large-term builds.
      • Late Payments: Payments delayed beyond 14 days from the invoice date may incur a late fee of 5% per month.
      • Design Deposits: The non-refundable nature of creative design deposits are non-refundable. Refunds are available for framework phases have commenced.`,
    },
    {
      title: "4. Client Responsibilities",
      content: `The success of the "Bridge" between design and development depends on collaboration.
      • Feedback: The Client agrees to provide feedback within 3-5 business days to keep the project on schedule.
      • Final Approval: While we strive for perfection, the Client is responsible for final approval of all text, data, and functioning logic before assets are handed off for assignment.`,
    },
    {
      title: "5. Termination",
      content: `Either party may terminate the project with 7 days' written notice. If terminated, the Client is responsible for payment for all work completed up to the termination date.`,
    },
    {
      title: "6. Third-Party Assets & Licensing",
      content: `• Procurement: The Client is responsible for the purchase and maintenance of licenses for premium fonts, stock imagery, or third party.
      • Transparency: USHER will provide all necessary acquisition times. We do not "bundle" stock to ensure the Client maintains direct legal agreements.
      • Open Source: We utilize high-quality open-source libraries and fonts to ensure zero cost margins to improve budgets.`,
    },
    {
      title: "7. Showcase & Portfolio Rights",
      content: `• Showcase: USHER request to include your design work in our portfolio and showcase our final outcomes on usher.agency. Behavior, and Dribbble.
      • Credit: Upon launch, a discount "Designed by USHER" attribution may be included in the site footer to verify the project's design pedigree.
      • Privacy Provision: Projects requiring total confidentiality exclusion from all portfolios may be subject to a "Privacy Provision fee."`,
    },
  ];

  return (
    <PageTransition>
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/90 to-primary text-white pt-32 pb-16">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
              Terms & Conditions
            </h1>
            <p className="text-lg text-white/80 max-w-2xl">
              Please read these terms carefully before engaging with USHER
              services.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold text-foreground mb-4">
                {section.title}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {section.content}
              </p>
            </motion.div>
          ))}

          {/* Footer Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-16 pt-8 border-t border-border flex flex-wrap gap-4 justify-center text-sm text-muted-foreground"
          >
            <Link href="/privacy">
              <a className="hover:text-primary transition-colors">
                Privacy Policy
              </a>
            </Link>
            <span>|</span>
            <a
              href="#disclaimer"
              className="hover:text-primary transition-colors"
            >
              Disclaimer
            </a>
            <span>|</span>
            <Link href="/">
              <a className="hover:text-primary transition-colors">
                Back to Top
              </a>
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center text-xs text-muted-foreground mt-8"
          >
            © 2026 USHER. All Rights Reserved.
          </motion.p>
        </div>
      </div>
    </PageTransition>
  );
}
