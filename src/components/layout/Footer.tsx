import React from "react";
import { Link } from "wouter";
import { Mail, ArrowRight, Phone, MapPin } from "lucide-react";
import {
  FaGithub,
  FaTwitter,
  FaLinkedin,
  FaYoutube,
  FaInstagram,
  FaFacebook,
} from "react-icons/fa";
import { Button } from "@/components/ui/button";

export function Footer() {
  const currentYear = new Date().getFullYear();

  // Company contact information
  const contactInfo = {
    email: "info.usherstack@gmail.com",
    phone: "+91 8948552234",
    address: "Lucknow, Uttar Pradesh, India",
    youtube: "https://youtube.com/@usherinc-h5p",
    instagram: "https://www.instagram.com/usher.tech",
    facebook: "https://www.facebook.com/share/1c3UAy4gjt/",
    twitter: "https://twitter.com",
    linkedin: "https://www.linkedin.com/company/usr-pixelwork/",
    github: "<not-found>",
  };

  return (
    <footer className="bg-background border-t border-border/50 pt-20 pb-10 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          <div className="lg:col-span-5 flex flex-col">
            <Link href="/">
              <div className="cursor-pointer flex items-center gap-2 mb-6">
                <img
                  src="/usher-logo.jpg"
                  alt="USHER — IT Services & Consulting"
                  className="h-12 w-auto rounded-md object-contain"
                />
              </div>
            </Link>
            <p className="text-muted-foreground text-lg mb-8 max-w-md">
              Unified Solutions for High-performance Engineering & Research. We
              build tomorrow's digital infrastructure today.
            </p>
            <div className="flex gap-4">
              <a
                href={contactInfo.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-foreground hover:bg-primary hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <FaTwitter className="w-5 h-5" />
              </a>
              <a
                href={contactInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-foreground hover:bg-primary hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-5 h-5" />
              </a>
              <a
                href={contactInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-foreground hover:bg-primary hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <FaGithub className="w-5 h-5" />
              </a>
              <a
                href={contactInfo.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-foreground hover:bg-primary hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram className="w-5 h-5" />
              </a>
              <a
                href={contactInfo.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-foreground hover:bg-primary hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <FaFacebook className="w-5 h-5" />
              </a>
              <a
                href={contactInfo.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-foreground hover:bg-primary hover:text-white transition-colors"
                aria-label="YouTube"
              >
                <FaYoutube className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-foreground font-semibold mb-6">Services</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/services">
                  <span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                    Web Development
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/services">
                  <span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                    App Development
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/services">
                  <span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                    Graphic Design
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/services">
                  <span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                    AI Integration
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/services">
                  <span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                    Digital Marketing
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-foreground font-semibold mb-6">Company</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/about">
                  <span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                    About Us
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/portfolio">
                  <span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                    Portfolio
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                    Contact
                  </span>
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Careers
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-foreground font-semibold mb-6">
              Ready to start?
            </h4>
            <p className="text-muted-foreground mb-4">
              Let's discuss your next big project.
            </p>
            <Link href="/contact">
              <Button className="w-full bg-foreground hover:bg-primary text-background hover:text-white transition-colors group flex justify-between items-center px-6">
                <span>Contact Us</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <div className="mt-6 flex flex-col gap-3 text-muted-foreground">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary" />
                <a
                  href="mailto:info.usherstack@gmail.com"
                  className="hover:text-foreground transition-colors"
                >
                  info.usherstack@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary" />
                <a
                  href={`tel:${contactInfo.phone}`}
                  className="hover:text-foreground transition-colors"
                >
                  {contactInfo.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-primary" />
                <span className="hover:text-foreground transition-colors">
                  {contactInfo.address}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            &copy; {currentYear} USHER Agency. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a
              href="/terms"
              className="hover:text-foreground transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="/privacy"
              className="hover:text-foreground transition-colors"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
