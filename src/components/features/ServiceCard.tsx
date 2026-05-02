import React from "react";
import { motion } from "framer-motion";
import { Service } from "@/lib/data";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

interface ServiceCardProps {
  service: Service;
  index: number;
}

export const ServiceCard = React.memo(function ServiceCard({ service, index }: ServiceCardProps) {
  const Icon = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-full"
    >
      <Card className="h-full glass-card hover-glow group transition-all duration-500 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <CardHeader>
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
            <Icon className="w-6 h-6 text-primary group-hover:text-accent transition-colors duration-500" />
          </div>
          <CardTitle className="text-xl tracking-tight">{service.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-muted-foreground text-base">
            {service.description}
          </CardDescription>
        </CardContent>
        
        {/* Decorative corner accent */}
        <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-gradient-signature opacity-0 group-hover:opacity-20 blur-xl rounded-full transition-opacity duration-500" />
      </Card>
    </motion.div>
  );
});
