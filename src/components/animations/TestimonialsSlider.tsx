import React, { useState, useEffect, useCallback } from "react";
import { Testimonial } from "@/lib/data";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface TestimonialsSliderProps {
  testimonials: Testimonial[];
}

export function TestimonialsSlider({ testimonials }: TestimonialsSliderProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [isHovered, setIsHovered] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi || isHovered) return;
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [emblaApi, isHovered]);

  return (
    <div 
      className="relative max-w-5xl mx-auto px-4 md:px-12 py-8"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
        <div className="flex touch-pan-y">
          {testimonials.map((testimonial, idx) => (
            <div className="flex-[0_0_100%] min-w-0" key={testimonial.id}>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center text-center px-4 md:px-8 py-6"
              >
                <Quote className="w-12 h-12 text-primary/40 mb-6" />
                <p className="text-xl md:text-3xl font-medium text-foreground mb-10 leading-relaxed max-w-4xl">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center flex-col">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-primary/20 mb-4 p-1 bg-background/50 backdrop-blur-sm">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name} 
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <h4 className="text-lg font-bold text-foreground">{testimonial.name}</h4>
                  <p className="text-muted-foreground text-sm uppercase tracking-wider mt-1 font-mono">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-3 mt-8">
        <button
          onClick={scrollPrev}
          className="w-12 h-12 rounded-full border border-border/50 flex items-center justify-center text-foreground hover:bg-muted transition-colors hover:border-primary/50"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={scrollNext}
          className="w-12 h-12 rounded-full border border-border/50 flex items-center justify-center text-foreground hover:bg-muted transition-colors hover:border-primary/50"
          aria-label="Next testimonial"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="flex justify-center gap-2 mt-6">
        {testimonials.map((_, idx) => (
          <div 
            key={idx} 
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              idx === selectedIndex ? "bg-primary w-6" : "bg-border/50"
            }`} 
          />
        ))}
      </div>
    </div>
  );
}
