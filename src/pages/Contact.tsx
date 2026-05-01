import { PageTransition } from "@/components/shared/PageTransition";
import { motion } from "framer-motion";
import { Mail, MapPin, MessageCircle, Calendar } from "lucide-react";
import { FaInstagram, FaTelegram, FaTwitter, FaDiscord } from "react-icons/fa";
import { CalendlyWidget } from "@/components/features/CalendlyWidget";

export default function Contact() {
  return (
    <PageTransition>
      <div className="pt-32 pb-20 relative overflow-hidden bg-background">
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 max-w-6xl mx-auto">
            {/* Left Column - Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col justify-center"
            >
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-foreground mb-6 leading-tight">
                Let's build <br />
                <span className="text-primary">the future.</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-12 max-w-md">
                Ready to transform your digital presence? Reach out and our
                technical team will be in touch.
              </p>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-1">
                      Email Us
                    </h3>
                    <a
                      href="mailto:info.usherstack@gmail.com"
                      className="text-muted-foreground hover:text-primary transition-colors text-lg"
                    >
                      info.usherstack@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-1">
                      WhatsApp
                    </h3>
                    <a
                      href="https://wa.me/918948552234"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors text-lg"
                    >
                      +91 8948552234
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <FaTelegram className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-1">
                      Telegram
                    </h3>
                    <a
                      href="https://t.me/usherstack"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors text-lg"
                    >
                      t.me/usherstack
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <FaTwitter className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-1">
                      X (Twitter)
                    </h3>
                    <a
                      href="https://x.com/usher_stack"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors text-lg"
                    >
                      @usher_stack
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <FaDiscord className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-1">
                      Discord
                    </h3>
                    <a
                      href="https://discord.gg/6rtZngEbv"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors text-lg"
                    >
                      Join Discord
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <FaInstagram className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-1">
                      Instagram
                    </h3>
                    <a
                      href="https://www.instagram.com/usher.tech"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors text-lg"
                    >
                      @usher.tech
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-1">
                      Headquarters
                    </h3>
                    <p className="text-muted-foreground text-lg">
                      35/67 new 132 Baluaghat, Prayagraj
                      <br />
                      Uttar Pradesh, India 211003
                    </p>
                  </div>
                </div>

                {/* Book Consultation Card */}
                <div className="flex items-start gap-4 pt-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Calendar className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-1">
                      Book a Consultation
                    </h3>
                    <p className="text-muted-foreground hover:text-primary transition-colors text-lg">
                      Schedule a call
                      <span className="text-primary text-sm ml-2"></span>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Calendly Widget Component */}
            <CalendlyWidget showInfoCards={true} />
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
