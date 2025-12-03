import { motion } from 'framer-motion';
import { Instagram, Facebook, Youtube, Heart } from 'lucide-react';

const footerLinks = {
  services: [
    { name: '3D Murals', href: '#services' },
    { name: 'Truck Art Walls', href: '#services' },
    { name: 'Wedding Backdrops', href: '#services' },
    { name: 'Outdoor Printing', href: '#services' },
  ],
  company: [
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Process', href: '#process' },
    { name: 'Contact', href: '#contact' },
  ],
  social: [
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com' },
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com' },
    { name: 'TikTok', icon: () => (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
      </svg>
    ), href: 'https://tiktok.com' },
    { name: 'YouTube', icon: Youtube, href: 'https://youtube.com' },
  ],
};

export default function Footer() {
  return (
    <footer className="relative bg-card/50 border-t border-border">
      <div className="absolute inset-0 truck-art-pattern opacity-5" />

      <div className="container-custom relative z-10 py-16 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <a href="#" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">W</span>
              </div>
              <span className="font-display text-lg font-bold gradient-text">Wall Art</span>
            </a>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Transforming walls across Pakistan with cutting-edge UV printing technology.
              From cafés to weddings, we bring your vision to life.
            </p>
            <p className="text-muted-foreground text-sm">
              <span className="text-primary font-medium">Serving:</span> KPK & Islamabad
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-bold text-foreground mb-6">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display font-bold text-foreground mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Contact */}
          <div>
            <h4 className="font-display font-bold text-foreground mb-6">Connect</h4>
            <div className="flex gap-3 mb-6">
              {footerLinks.social.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-background/50 border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
            <div className="text-sm text-muted-foreground space-y-2">
              <p>
                <span className="text-foreground">Phone:</span>{' '}
                <a href="tel:+923001234567" className="hover:text-primary transition-colors">
                  +92 300 1234567
                </a>
              </p>
              <p>
                <span className="text-foreground">Email:</span>{' '}
                <a href="mailto:hello@wallart.pk" className="hover:text-primary transition-colors">
                  hello@wallart.pk
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Wall Art. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-destructive fill-destructive" /> in Pakistan
          </p>
        </div>
      </div>
    </footer>
  );
}
