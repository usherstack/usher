import React from "react";
import { PageTransition } from "@/components/shared/PageTransition";
import { motion } from "framer-motion";
import { Link } from "wouter";

export default function PrivacyPolicy() {
  const sections = [
    {
      title: "1. Information We Collect",
      content: `We collect the minimum data that is essential for delivering high-end USHER services. This includes:
      • Contact Information: Name, email, and phone number from inquiries and contact forms.
      • Project Assets: Files, brand guidelines, and proprietary data shared for the purposes of project development.
      • Technical Data: IP addresses and site usage behavior (via cookies) to improve user agency's digital presence.`,
    },
    {
      title: "2. How We Use Your Data",
      content: `The information we collect is used strictly for:
      • Project Execution: Communicating during the 30-day build sprint and to discuss scope changes.
      • Relationship Management: Sending invoices, project updates, and legal correspondences.
      • Portfolio Showcase: Displaying completed work with per Section 7 of our Terms & Conditions unless an NDA is in place.`,
    },
    {
      title: "3. Data Security & Storage",
      content: `We employ strict and independent "Bridge" to our users. We protect them by:
      • Data Protection: Using industry-standard tools like Figma, Notion, and tools to secure data transfers.
      • Limited Access: Only USHER core team members assigned to your project can access proprietary files.
      • Data Retention: We securely purge project files 90 days after project completion, unless contractually required otherwise.`,
    },
    {
      title: "4. Third-Party Disclosure",
      content: `We share your information with trusted third-party services necessary for project completion, such as:
      • Project Management Tools: To handle client collaborations and workflows.
      • Cloud Storage: To archive development artifacts and files securely.`,
    },
    {
      title: "5. AI Usage & Ethics Policy",
      content: `We leverage AI between human creativity and technical excellence in code generation and code optimization. However, we assure that AI shall not be used for:
      • Generating Creative Output: All brand identities and code leveraging is custom-crafted by our designers to ensure unique, copyright-safe assets for our clients.`,
    },
    {
      title: "6. Communication & Office Hours Policy",
      content: `To maintain the high quality of our design sprints, USHER between 9 AM to 6 PM (IST). While our "Vision Status" is 24/7, our design team typically responds to inquiries within 24-48 business hours. We prioritize "Deep Work" sessions to ensure our engineers have uninterrupted focus time for elite delivery.`,
    },
    {
      title: "7. Your Rights",
      content: `You have the right to request access to the data we hold or to ask for the deletion of your personal contact information from our contact database for a project is finalized and paid in full.`,
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
              Privacy Policy
            </h1>
            <p className="text-lg text-white/80 max-w-2xl">
              We take your privacy seriously. Here's how we protect your data.
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
            <Link href="/terms">
              <a className="hover:text-primary transition-colors">
                Terms & Conditions
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
