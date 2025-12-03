import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Palette, ScanLine, Bot, Shield } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Palette,
    title: 'Choose Design',
    description: 'Browse our gallery or share your own vision. We create custom mockups tailored to your space.',
  },
  {
    number: '02',
    icon: ScanLine,
    title: 'We Visit & Scan',
    description: 'Our team visits your location, measures the wall, and prepares the surface for perfect printing.',
  },
  {
    number: '03',
    icon: Bot,
    title: 'Robot Prints Live',
    description: 'Watch as our UV printer robot brings your design to life in real-time. Pure magic!',
  },
  {
    number: '04',
    icon: Shield,
    title: 'Waterproof & Done',
    description: 'UV-cured ink is instantly dry, waterproof, and scratch-resistant. Ready to enjoy!',
  },
];

export default function ProcessSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="process" className="section-padding relative overflow-hidden bg-card/30">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">
            Our Process
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-6">
            <span className="text-foreground">How It </span>
            <span className="gradient-text">Works</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From concept to completion in 4 simple steps
          </p>
        </motion.div>

        {/* Timeline */}
        <div ref={ref} className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2" />
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-primary to-accent -translate-y-1/2 origin-left"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative"
              >
                {/* Step Card */}
                <div className="glass-card p-8 text-center hover-glow group h-full">
                  {/* Number Badge */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-[0_0_20px_hsl(174_100%_50%/0.5)]">
                    <span className="text-primary-foreground font-bold text-sm">{step.number}</span>
                  </div>

                  {/* Icon */}
                  <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300 group-hover:shadow-[0_0_30px_hsl(174_100%_50%/0.3)]">
                    <step.icon className="w-10 h-10 text-primary" />
                  </div>

                  {/* Content */}
                  <h3 className="font-display text-xl font-bold text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
