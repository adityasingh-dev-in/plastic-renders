import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { TESTIMONIALS } from '../../constants/data';

// ── Single testimonial card (isolated so hooks are called at component level) ──
function TestimonialCard({ t, delay }: { t: typeof TESTIMONIALS[0]; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="bg-white rounded-xl p-8 border border-[var(--border)] transition-all duration-[250ms] hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.07)]"
    >
      {/* Stars */}
      <div className="text-[var(--blue)] text-[1.1rem] tracking-[2px] mb-4">★★★★★</div>
      {/* Quote */}
      <p className="text-[0.95rem] leading-[1.7] text-[#333] mb-6 italic">"{t.quote}"</p>
      {/* Author */}
      <div className="flex items-center gap-3">
        <div
          className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-[1rem] text-white flex-shrink-0"
          style={{ background: t.color }}
        >
          {t.initials}
        </div>
        <div>
          <div className="font-bold text-[0.9rem]">{t.name}</div>
          <div className="text-[0.8rem] text-[var(--muted)]">{t.role}</div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Testimonials Section ───────────────────────────────────────
export default function TestimonialsSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-60px' });

  return (
    <section id="testimonials" className="bg-[var(--gray)]">
      {/* Header */}
      <div ref={headerRef} className="w-full text-center max-w-[600px] mx-auto mb-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-[0.75rem] font-semibold tracking-[0.14em] uppercase text-[var(--muted)] mb-3"
        >
          Testimonials
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-serif font-bold leading-[1.15] tracking-tight"
          style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}
        >
          What Our <span className="text-[var(--blue)]">Clients Say</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 text-[var(--muted)] leading-[1.7]"
        >
          Don't just take our word for it. Here's what our clients have to say about working with us.
        </motion.p>
      </div>

      {/* Grid */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[1100px] mx-auto">
        {TESTIMONIALS.map((t, i) => (
          <TestimonialCard key={t.name} t={t} delay={(i % 2) * 0.1} />
        ))}
      </div>
    </section>
  );
}
