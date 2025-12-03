import { motion } from 'framer-motion';
import { useState } from 'react';
import { Send, MapPin, Phone, Mail, Upload, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const locations = ['Abbottabad', 'Islamabad', 'Mansehra', 'Peshawar', 'Other'];

export default function ContactSection() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: '',
    image: null as File | null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    
    toast({
      title: "Request Submitted!",
      description: "We'll send 3 free AI mockups in 2 hours!",
    });

    // Reset after showing success
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', phone: '', location: '', image: null });
    }, 3000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, image: file });
    }
  };

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 truck-art-pattern opacity-10" />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Column - Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">
              Get Started
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-6">
              <span className="text-foreground">Get Your </span>
              <span className="gradient-text">Free Mockup</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Share a photo of your wall and we'll create 3 stunning AI-generated mockups
              showing how different designs would look. Completely free, no commitment!
            </p>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Call or WhatsApp</div>
                  <a href="tel:+923001234567" className="text-foreground font-semibold hover:text-primary transition-colors">
                    +92 300 1234567
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Email Us</div>
                  <a href="mailto:hello@abbottabadwallart.com" className="text-foreground font-semibold hover:text-primary transition-colors">
                    hello@abbottabadwallart.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Service Area</div>
                  <div className="text-foreground font-semibold">
                    Serving KPK & Islamabad
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Badge */}
            <div className="mt-12 p-6 glass-card">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex -space-x-2">
                  {['A', 'S', 'M', 'Z'].map((letter, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-primary/20 border-2 border-card flex items-center justify-center"
                    >
                      <span className="text-primary text-xs font-bold">{letter}</span>
                    </div>
                  ))}
                </div>
                <div className="text-sm text-muted-foreground">500+ Happy Clients</div>
              </div>
              <p className="text-muted-foreground text-sm">
                ⭐ 4.9/5 average rating from verified customers
              </p>
            </div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="glass-card p-8">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6 shadow-[0_0_40px_hsl(174_100%_50%/0.3)]">
                    <Check className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground mb-3">
                    Request Submitted!
                  </h3>
                  <p className="text-muted-foreground">
                    We'll send 3 free AI mockups in 2 hours!
                  </p>
                </motion.div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="name" className="text-foreground">Your Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="mt-2 bg-background/50 border-border focus:border-primary"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-foreground">Phone / WhatsApp</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+92 300 1234567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      className="mt-2 bg-background/50 border-border focus:border-primary"
                    />
                  </div>

                  <div>
                    <Label className="text-foreground">Location</Label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                      {locations.map((loc) => (
                        <button
                          key={loc}
                          type="button"
                          onClick={() => setFormData({ ...formData, location: loc })}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                            formData.location === loc
                              ? 'bg-primary text-primary-foreground shadow-[0_0_20px_hsl(174_100%_50%/0.3)]'
                              : 'bg-background/50 text-muted-foreground border border-border hover:border-primary'
                          }`}
                        >
                          {loc}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="text-foreground">Wall Photo (Optional)</Label>
                    <div className="mt-2">
                      <label
                        htmlFor="image-upload"
                        className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl cursor-pointer transition-all ${
                          formData.image
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50 hover:bg-background/50'
                        }`}
                      >
                        {formData.image ? (
                          <div className="text-center">
                            <Check className="w-8 h-8 text-primary mx-auto mb-2" />
                            <span className="text-sm text-foreground">{formData.image.name}</span>
                          </div>
                        ) : (
                          <div className="text-center">
                            <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                            <span className="text-sm text-muted-foreground">
                              Click to upload wall photo
                            </span>
                          </div>
                        )}
                        <input
                          id="image-upload"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleFileChange}
                        />
                      </label>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    variant="neon"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        Sending...
                      </div>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Get Free Mockup
                      </>
                    )}
                  </Button>

                  <p className="text-center text-muted-foreground text-sm">
                    We'll send 3 free AI mockups in 2 hours!
                  </p>
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
