import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  Mountain, 
  Truck, 
  Coffee, 
  Heart, 
  Cloud, 
  Baby 
} from 'lucide-react';

const services = [
  {
    icon: Mountain,
    title: '3D Murals & Eagles',
    description: 'Stunning depth and dimension with hyper-realistic eagle murals that command attention.',
    color: 'primary',
  },
  {
    icon: Truck,
    title: 'Pakistani Truck Art Walls',
    description: 'Traditional vibrant motifs, roses, peacocks, and geometric patterns brought to life.',
    color: 'accent',
  },
  {
    icon: Coffee,
    title: 'Café & Restaurant Walls',
    description: 'Transform your dining space into an Instagram-worthy destination.',
    color: 'primary',
  },
  {
    icon: Heart,
    title: 'Wedding & Event Backdrops',
    description: 'Create unforgettable memories with custom printed stage and photo backdrops.',
    color: 'accent',
  },
  {
    icon: Cloud,
    title: 'Outdoor Waterproof Printing',
    description: 'Weather-resistant UV prints that last years under sun and rain.',
    color: 'primary',
  },
  {
    icon: Baby,
    title: 'Kids Room & Islamic Art',
    description: 'Beautiful calligraphy, playful themes, and spiritual designs for every space.',
    color: 'accent',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

export default function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="services" className="section-padding relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 truck-art-pattern opacity-20" />

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
            Our Services
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-6">
            <span className="text-foreground">What We </span>
            <span className="gradient-text">Create</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From bold statement walls to intricate cultural art, we bring your vision to life
            with cutting-edge UV printing technology.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              variants={cardVariants}
              className="group relative"
            >
              <div
                className={`glass-card p-8 h-full hover-lift cursor-pointer ${
                  service.color === 'primary' ? 'hover:border-primary/50' : 'hover:border-accent/50'
                }`}
              >
                {/* Icon */}
                <div
                  className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 ${
                    service.color === 'primary'
                      ? 'bg-primary/10 group-hover:bg-primary/20 group-hover:shadow-[0_0_30px_hsl(174_100%_50%/0.3)]'
                      : 'bg-accent/10 group-hover:bg-accent/20 group-hover:shadow-[0_0_30px_hsl(45_100%_60%/0.3)]'
                  }`}
                >
                  <service.icon
                    className={`w-8 h-8 ${
                      service.color === 'primary' ? 'text-primary' : 'text-accent'
                    }`}
                  />
                </div>

                {/* Content */}
                <h3 className="font-display text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>

                {/* Hover Glow Effect */}
                <div
                  className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${
                    service.color === 'primary'
                      ? 'shadow-[inset_0_0_30px_hsl(174_100%_50%/0.1)]'
                      : 'shadow-[inset_0_0_30px_hsl(45_100%_60%/0.1)]'
                  }`}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
