import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import beforeWall from '@/assets/before-wall.jpg';
import afterWall from '@/assets/after-wall.jpg';

export default function BeforeAfterSection() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  return (
    <section className="section-padding relative overflow-hidden bg-card/30">
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
            Transformation
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-6">
            <span className="text-foreground">See the </span>
            <span className="gradient-text">Magic</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Drag the slider to see how we transform boring walls into stunning masterpieces.
          </p>
        </motion.div>

        {/* Before/After Slider */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <div
            ref={containerRef}
            className="relative aspect-[4/3] rounded-2xl overflow-hidden cursor-ew-resize neon-border"
            onMouseMove={handleMouseMove}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onTouchMove={handleTouchMove}
          >
            {/* After Image (Full Background) */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${afterWall})` }}
            />

            {/* Before Image (Clipped) */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${beforeWall})`,
                clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
              }}
            />

            {/* Slider Handle */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-primary shadow-[0_0_20px_hsl(174_100%_50%/0.8)] z-10"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-[0_0_30px_hsl(174_100%_50%/0.6)]">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-primary-foreground"
                >
                  <path
                    d="M8 12H16M8 12L10 10M8 12L10 14M16 12L14 10M16 12L14 14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            {/* Labels */}
            <div className="absolute top-4 left-4 px-4 py-2 bg-background/80 backdrop-blur-sm rounded-lg border border-border">
              <span className="text-foreground font-semibold">Before</span>
            </div>
            <div className="absolute top-4 right-4 px-4 py-2 bg-primary/80 backdrop-blur-sm rounded-lg">
              <span className="text-primary-foreground font-semibold">After</span>
            </div>
          </div>

          {/* Instructions */}
          <p className="text-center text-muted-foreground text-sm mt-4">
            👆 Drag the slider to compare before and after
          </p>
        </motion.div>
      </div>
    </section>
  );
}
