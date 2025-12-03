import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const packages = [
  {
    name: 'Basic',
    subtitle: 'Indoor Wall',
    price: '₹300',
    unit: '/sq ft',
    features: [
      'Indoor wall printing',
      'Standard resolution',
      'Basic design selection',
      '1-year color warranty',
      'Free wall preparation',
    ],
    popular: false,
  },
  {
    name: 'Premium',
    subtitle: 'Outdoor + Waterproof',
    price: '₹550',
    unit: '/sq ft',
    features: [
      'Indoor & outdoor printing',
      'HD resolution',
      'Custom design creation',
      '5-year waterproof warranty',
      'UV protection coating',
      'Free 3D mockup',
      'Priority support',
    ],
    popular: true,
  },
  {
    name: 'Wedding',
    subtitle: 'Backdrop + Floor',
    price: '₹85,000',
    unit: ' flat',
    features: [
      'Stage backdrop (up to 20x10 ft)',
      'Floor printing included',
      'Premium design customization',
      'Same-day installation',
      'On-site touch-ups',
      'Event coordinator included',
    ],
    popular: false,
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 truck-art-pattern opacity-10" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">
            Pricing
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-6">
            <span className="text-foreground">Simple </span>
            <span className="gradient-text">Pricing</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Transparent pricing with no hidden fees. Choose the package that fits your project.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className={`relative ${pkg.popular ? 'md:-mt-8 md:mb-8' : ''}`}
            >
              {/* Popular Badge */}
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <div className="flex items-center gap-2 bg-primary px-4 py-2 rounded-full shadow-[0_0_30px_hsl(174_100%_50%/0.5)]">
                    <Sparkles className="w-4 h-4 text-primary-foreground" />
                    <span className="text-primary-foreground text-sm font-semibold">Most Popular</span>
                  </div>
                </div>
              )}

              <div
                className={`h-full rounded-2xl p-8 transition-all duration-300 ${
                  pkg.popular
                    ? 'bg-gradient-to-b from-primary/20 via-card to-card border-2 border-primary shadow-[0_0_40px_hsl(174_100%_50%/0.3)]'
                    : 'glass-card hover-glow'
                }`}
              >
                {/* Header */}
                <div className="text-center mb-8">
                  <h3 className="font-display text-2xl font-bold text-foreground mb-1">
                    {pkg.name}
                  </h3>
                  <p className="text-muted-foreground text-sm">{pkg.subtitle}</p>
                </div>

                {/* Price */}
                <div className="text-center mb-8">
                  <div className="flex items-end justify-center">
                    <span className={`text-5xl font-bold font-display ${pkg.popular ? 'neon-text' : 'text-foreground'}`}>
                      {pkg.price}
                    </span>
                    <span className="text-muted-foreground ml-1 mb-2">{pkg.unit}</span>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-4 mb-8">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        pkg.popular ? 'bg-primary' : 'bg-primary/20'
                      }`}>
                        <Check className={`w-3 h-3 ${pkg.popular ? 'text-primary-foreground' : 'text-primary'}`} />
                      </div>
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button
                  variant={pkg.popular ? 'neon' : 'neon-outline'}
                  className="w-full"
                  size="lg"
                  asChild
                >
                  <a href="#contact">Get Quote</a>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center text-muted-foreground text-sm mt-12"
        >
          * Prices may vary based on wall condition and design complexity. Free consultation available.
        </motion.p>
      </div>
    </section>
  );
}
