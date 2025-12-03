import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { X } from 'lucide-react';

import portfolioCafe from '@/assets/portfolio-cafe-1.jpg';
import portfolioWedding from '@/assets/portfolio-wedding-1.jpg';
import portfolioTruckArt from '@/assets/portfolio-truck-art-1.jpg';
import portfolioGym from '@/assets/portfolio-gym-1.jpg';
import portfolioKids from '@/assets/portfolio-kids-1.jpg';
import portfolioIslamic from '@/assets/portfolio-islamic-1.jpg';
import portfolioRestaurant from '@/assets/portfolio-restaurant-1.jpg';
import portfolioOutdoor from '@/assets/portfolio-outdoor-1.jpg';

const categories = ['All', 'Cafés', 'Homes', 'Outdoor', 'Truck Art', 'Weddings'];

const portfolioItems = [
  { id: 1, image: portfolioCafe, category: 'Cafés', title: 'Eagle Mural - Islamabad Café' },
  { id: 2, image: portfolioWedding, category: 'Weddings', title: 'Islamic Wedding Backdrop' },
  { id: 3, image: portfolioTruckArt, category: 'Truck Art', title: 'Traditional Truck Art Design' },
  { id: 4, image: portfolioGym, category: 'Outdoor', title: 'Gym Eagle Mural' },
  { id: 5, image: portfolioKids, category: 'Homes', title: 'Kids Space Theme Room' },
  { id: 6, image: portfolioIslamic, category: 'Homes', title: 'Islamic Calligraphy Art' },
  { id: 7, image: portfolioRestaurant, category: 'Cafés', title: 'Mountain View Restaurant' },
  { id: 8, image: portfolioOutdoor, category: 'Outdoor', title: 'Building Eagle Mural' },
];

export default function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const filteredItems =
    activeCategory === 'All'
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeCategory);

  return (
    <section id="portfolio" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 truck-art-pattern opacity-10" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">
            Our Work
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-6">
            <span className="text-foreground">Portfolio </span>
            <span className="gradient-text">Gallery</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore our stunning wall transformations across Pakistan
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-primary text-primary-foreground shadow-[0_0_20px_hsl(174_100%_50%/0.4)]'
                  : 'bg-card text-muted-foreground hover:text-primary hover:bg-card/80 border border-border'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Masonry Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={`group relative cursor-pointer rounded-xl overflow-hidden ${
                  index % 5 === 0 ? 'md:col-span-2 md:row-span-2' : ''
                }`}
                onClick={() => setSelectedImage(item.image)}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className="text-primary text-sm font-medium">{item.category}</span>
                    <h3 className="text-foreground font-display font-bold text-lg mt-1">
                      {item.title}
                    </h3>
                  </div>
                </div>

                {/* Neon Border on Hover */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/50 rounded-xl transition-all duration-300 group-hover:shadow-[inset_0_0_30px_hsl(174_100%_50%/0.2)]" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/95 backdrop-blur-xl z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 p-2 text-foreground hover:text-primary transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              src={selectedImage}
              alt="Portfolio"
              className="max-w-full max-h-[90vh] object-contain rounded-xl neon-border"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
