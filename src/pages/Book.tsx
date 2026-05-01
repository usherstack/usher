import { PageTransition } from "@/components/shared/PageTransition";
import { motion } from "framer-motion";
import { CalendlyWidget } from "@/components/features/CalendlyWidget";
import { Link } from "wouter";

export default function Book() {
  return (
    <PageTransition>
      <div className="pt-32 pb-20 relative overflow-hidden bg-background">
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-foreground mb-6 leading-tight">
                Schedule a <br />
                <span className="text-primary">Consultation</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Book a free 30-minute consultation with our technical team.
                We'll discuss your project requirements and how we can help
                bring your vision to life.
              </p>
            </motion.div>

            {/* Calendly Widget */}
            <CalendlyWidget showInfoCards={true} />

            {/* Direct Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-8 text-center"
            >
              <p className="text-muted-foreground mb-4">
                Prefer to reach out directly?
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="mailto:info.usherstack@gmail.com"
                  className="inline-flex items-center justify-center rounded-full bg-primary/10 hover:bg-primary/20 text-primary px-6 py-3 transition-colors"
                >
                  Email Us
                </a>
                <a
                  href="https://wa.me/918948552234"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-primary/10 hover:bg-primary/20 text-primary px-6 py-3 transition-colors"
                >
                  WhatsApp
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-primary hover:text-primary-foreground text-primary-foreground px-6 py-3 transition-colors"
                >
                  Back to Contact
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
