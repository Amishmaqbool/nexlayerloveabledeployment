import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Ahmed Khan',
    role: 'Owner, Chai Khana Café',
    location: 'Abbottabad',
    content: 'The eagle mural transformed our café completely! Customers take photos with it daily. Best investment we made for our business.',
    rating: 5,
  },
  {
    name: 'Sarah Malik',
    role: 'Event Planner',
    location: 'Islamabad',
    content: 'We used their wedding backdrop service for multiple events. The quality is unmatched and the team is super professional.',
    rating: 5,
  },
  {
    name: 'Imran Shah',
    role: 'Hotel Manager',
    location: 'Mansehra',
    content: 'Our hotel lobby now features a stunning mountain landscape. Guests constantly compliment the wall art. Highly recommended!',
    rating: 5,
  },
  {
    name: 'Fatima Hussain',
    role: 'Homeowner',
    location: 'Abbottabad',
    content: 'Got Islamic calligraphy printed in our prayer room. The detail and colors are beautiful. Worth every rupee spent.',
    rating: 5,
  },
  {
    name: 'Zain Restaurant',
    role: 'Restaurant Chain',
    location: 'Islamabad',
    content: 'They did all 3 of our branches with different truck art themes. Consistent quality and always on time. Great service!',
    rating: 5,
  },
  {
    name: 'Ali Fitness Gym',
    role: 'Gym Owner',
    location: 'Abbottabad',
    content: 'The motivational eagle mural in our gym gets compliments every day. It really sets the energy for workouts!',
    rating: 5,
  },
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const goTo = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section id="testimonials" className="section-padding relative overflow-hidden bg-card/30">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">
            Testimonials
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-6">
            <span className="text-foreground">What Clients </span>
            <span className="gradient-text">Say</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Real reviews from our happy customers across Pakistan
          </p>
        </motion.div>

        {/* Testimonial Carousel */}
        <div
          className="max-w-4xl mx-auto relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Navigation Arrows */}
          <button
            onClick={goToPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-16 p-3 rounded-full bg-card border border-border hover:border-primary hover:text-primary transition-all z-10"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-16 p-3 rounded-full bg-card border border-border hover:border-primary hover:text-primary transition-all z-10"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Cards */}
          <div className="overflow-hidden">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="glass-card p-8 md:p-12 relative"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 text-primary/20">
                <Quote className="w-16 h-16" />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>

              {/* Content */}
              <blockquote className="text-xl md:text-2xl text-foreground leading-relaxed mb-8 font-display">
                "{testimonials[currentIndex].content}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-primary font-bold text-xl">
                    {testimonials[currentIndex].name.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-foreground">
                    {testimonials[currentIndex].name}
                  </div>
                  <div className="text-muted-foreground text-sm">
                    {testimonials[currentIndex].role} • {testimonials[currentIndex].location}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goTo(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-primary w-8 shadow-[0_0_15px_hsl(174_100%_50%/0.6)]'
                    : 'bg-border hover:bg-primary/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
