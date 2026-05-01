import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Video } from "lucide-react";
import { config } from "@/lib/data";

// Calendly global type declaration
interface CalendlyGlobal {
  initInlineWidget: (options: {
    url: string;
    parentElement: HTMLElement;
    prefill?: Record<string, unknown>;
    utm?: Record<string, unknown>;
  }) => void;
}

declare global {
  interface Window {
    Calendly?: CalendlyGlobal;
  }
}

interface CalendlyWidgetProps {
  showInfoCards?: boolean;
}

export function CalendlyWidget({ showInfoCards = true }: CalendlyWidgetProps) {
  const widgetRef = useRef<HTMLDivElement>(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  // Load Calendly widget CSS and JS
  useEffect(() => {
    // Load CSS
    const existingLink = document.querySelector(
      'link[href="https://assets.calendly.com/assets/external/widget.css"]',
    );
    if (!existingLink) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://assets.calendly.com/assets/external/widget.css";
      document.head.appendChild(link);
    }

    // Load JS
    const existingScript = document.querySelector(
      'script[src="https://assets.calendly.com/assets/external/widget.js"]',
    );
    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      script.onload = () => setIsScriptLoaded(true);
      document.body.appendChild(script);
    } else {
      // Script already exists, check if Calendly is available
      if (window.Calendly) {
        setIsScriptLoaded(true);
      }
    }
  }, []);

  // Initialize widget when script is loaded
  useEffect(() => {
    if (isScriptLoaded && widgetRef.current && window.Calendly) {
      // Clear previous widget content
      if (widgetRef.current) {
        widgetRef.current.innerHTML = "";
      }

      // Initialize the inline widget
      window.Calendly.initInlineWidget({
        url: config.calendlyUrl,
        parentElement: widgetRef.current,
        prefill: {},
        utm: {},
      });
    }
  }, [isScriptLoaded]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col justify-center"
    >
      {showInfoCards && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-4 text-center">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
              <Clock className="w-5 h-5 text-primary" />
            </div>
            <h4 className="text-sm font-bold text-foreground mb-1">
              30 Minutes
            </h4>
            <p className="text-muted-foreground text-xs">Free consultation</p>
          </div>

          <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-4 text-center">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
              <Video className="w-5 h-5 text-primary" />
            </div>
            <h4 className="text-sm font-bold text-foreground mb-1">
              Video Call
            </h4>
            <p className="text-muted-foreground text-xs">Via Google Meet</p>
          </div>

          <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-4 text-center">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
              <Calendar className="w-5 h-5 text-primary" />
            </div>
            <h4 className="text-sm font-bold text-foreground mb-1">Flexible</h4>
            <p className="text-muted-foreground text-xs">Book anytime</p>
          </div>
        </div>
      )}

      <div
        ref={widgetRef}
        className="calendly-inline-widget"
        data-url={config.calendlyUrl}
        style={{ minWidth: "320px", height: "700px" }}
      />
    </motion.div>
  );
}
