import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, Phone, Mail, MapPin, Linkedin, CheckCircle, Loader2 } from 'lucide-react';
import { MagneticButton } from '@/components/custom/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

export const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const form = formRef.current;
    const info = infoRef.current;

    if (!section || !form || !info) return;

    const ctx = gsap.context(() => {
      // Form entrance animation
      gsap.fromTo(
        form,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Info entrance animation
      gsap.fromTo(
        info,
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Contact cards stagger
      const cards = info.querySelectorAll('.contact-card');
      gsap.fromTo(
        cards,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.6,
          delay: 0.4,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Using Formspree for email functionality
      const response = await fetch('https://formspree.io/f/xnqevwpy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _replyto: formData.email,
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', message: '' });

        // Reset after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    { icon: Phone, label: 'Phone', value: '+92 3122912494', href: 'tel:+923122912494' },
    { icon: Mail, label: 'Email', value: 'adilisrar572@gmail.com', href: 'mailto:adilisrar572@gmail.com' },
    { icon: MapPin, label: 'Location', value: 'Chakwal, Pakistan', href: '#' },
    { icon: Linkedin, label: 'LinkedIn', value: 'Adil Israr', href: 'https://linkedin.com/in/adil-israr-a16a47327' },
  ];

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-20 md:py-32 bg-black overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-lime/5 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-lime mb-4">
            Contact //
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Have a project in mind? Let&apos;s work together to bring your vision to life.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="glass-strong rounded-3xl p-8 md:p-10"
          >
            {isSubmitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <CheckCircle className="w-20 h-20 text-lime mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">Message Sent!</h3>
                <p className="text-white/60">
                  Thank you for reaching out. I&apos;ll get back to you soon.
                </p>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-bold text-white mb-8">Send a Message</h3>

                <div className="space-y-8">
                  {/* Name field */}
                  <div className="relative">
                    <label
                      className={`absolute left-0 transition-all duration-300 ${focusedField === 'name' || formData.name
                        ? '-top-6 text-sm text-lime'
                        : 'top-3 text-white/50'
                        }`}
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      required
                      className="w-full bg-transparent border-b-2 border-white/20 focus:border-lime py-3 text-white outline-none transition-colors"
                    />
                  </div>

                  {/* Email field */}
                  <div className="relative">
                    <label
                      className={`absolute left-0 transition-all duration-300 ${focusedField === 'email' || formData.email
                        ? '-top-6 text-sm text-lime'
                        : 'top-3 text-white/50'
                        }`}
                    >
                      Your Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      required
                      className="w-full bg-transparent border-b-2 border-white/20 focus:border-lime py-3 text-white outline-none transition-colors"
                    />
                  </div>

                  {/* Message field */}
                  <div className="relative">
                    <label
                      className={`absolute left-0 transition-all duration-300 ${focusedField === 'message' || formData.message
                        ? '-top-6 text-sm text-lime'
                        : 'top-3 text-white/50'
                        }`}
                    >
                      Your Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      required
                      rows={4}
                      className="w-full bg-transparent border-b-2 border-white/20 focus:border-lime py-3 text-white outline-none transition-colors resize-none"
                    />
                  </div>

                  {/* Submit button */}
                  <MagneticButton
                    className="w-full py-4 bg-lime text-black font-semibold rounded-full hover:shadow-[0_0_30px_rgba(209,226,157,0.4)] transition-shadow duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
                    onClick={() => { }}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        {/* <Send className="w-5 h-5" /> */}
                      </>
                    )}
                  </MagneticButton>
                </div>
              </>
            )}
          </form>

          {/* Contact Info */}
          <div ref={infoRef} className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-8">Get In Touch</h3>

            <div className="grid sm:grid-cols-2 gap-4">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.href}
                  target={info.href.startsWith('http') ? '_blank' : undefined}
                  rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="contact-card glass p-6 rounded-2xl hover:border-lime/50 transition-all duration-300 group"
                  data-cursor-hover
                >
                  <div className="w-12 h-12 bg-lime/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-lime/20 transition-colors">
                    <info.icon className="w-6 h-6 text-lime" />
                  </div>
                  <p className="text-white/50 text-sm mb-1">{info.label}</p>
                  <p className="text-white font-medium group-hover:text-lime transition-colors">
                    {info.value}
                  </p>
                </a>
              ))}
            </div>

            {/* Availability card */}
            <div className="glass p-6 rounded-2xl mt-8">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-4 h-4 bg-lime rounded-full" />
                  <div className="absolute inset-0 bg-lime rounded-full animate-ping" />
                </div>
                <div>
                  <p className="text-white font-medium">Available for freelance</p>
                  <p className="text-white/50 text-sm">I usually respond within 24 hours</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-20 right-20 w-32 h-32 border border-lime/10 rounded-full animate-pulse-glow" />
      <div className="absolute top-1/3 left-10 w-20 h-20 bg-lime/5 rounded-full blur-xl" />
    </section>
  );
};
