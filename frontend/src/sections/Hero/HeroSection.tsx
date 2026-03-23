import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronRight, ChevronDown } from 'lucide-react';

/**
 * Hero section with parallax background text and stagger-in animations.
 */
export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  // Parallax: move the background text upward as you scroll
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const subtitleY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);

  return (
    <section
      ref={ref}
      id="hero"
      className="min-h-screen w-full flex flex-col items-center justify-center text-center px-[5vw] pt-[120px] pb-20 relative overflow-hidden"
    >
      {/* Parallax background decorative text */}
      <motion.div
        style={{ y: bgY }}
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <span
          className="text-[clamp(6rem,20vw,18rem)] font-black font-serif leading-none select-none"
          style={{
            color: 'transparent',
            WebkitTextStroke: '1px rgba(59,111,232,0.06)',
            letterSpacing: '-0.04em',
          }}
        >
          RENDERS
        </span>
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y: subtitleY }}
        className="relative z-10 flex flex-col items-center"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="inline-block text-[0.78rem] font-semibold tracking-[0.15em] uppercase text-[var(--blue)] mb-6"
        >
          Premium Design &amp; Development
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="font-serif font-black leading-[1.1] tracking-[-0.02em] max-w-[900px]"
          style={{ fontSize: 'clamp(3rem, 7vw, 6rem)' }}
        >
          Crafting Digital{' '}
          <span className="text-[var(--blue)]">Experiences</span>
          {' '}That Matter
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-6 text-[var(--muted)] max-w-[540px] leading-[1.7]"
          style={{ fontSize: 'clamp(1rem, 1.6vw, 1.15rem)' }}
        >
          Premium design and development services that transform your vision into reality.
          We blend creativity with technology to deliver exceptional results.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="flex gap-4 mt-11 flex-wrap justify-center"
        >
          <a
            href="#services"
            onClick={e => { e.preventDefault(); document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="inline-flex items-center gap-2 bg-(--black) text-white px-8 py-3.5 border-2 border-(--black) rounded-md text-[0.9rem] font-semibold no-underline transition-all duration-200 hover:bg-[var(--blue)] hover:border-[var(--blue)] hover:-translate-y-px"
          >
            <ChevronRight size={16} strokeWidth={2.5} />
            Explore Services
          </a>
          <a
            href="#about"
            onClick={e => { e.preventDefault(); document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="inline-flex items-center gap-2 bg-transparent text-(--black) px-8 py-3.5 border-2 border-(--border) rounded-md text-[0.9rem] font-semibold no-underline transition-all duration-200 hover:border-[var(--black)] hover:-translate-y-px"
          >
            View Our Work
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
        className="absolute bottom-10 flex flex-col items-center gap-2 text-[var(--muted)] text-[0.78rem] border-none bg-transparent cursor-pointer"
        style={{ animation: 'heroBounce 2s ease-in-out infinite' }}
      >
        <ChevronDown size={18} strokeWidth={2} />
      </motion.button>

      <style>{`
        @keyframes heroBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(8px); }
        }
      `}</style>
    </section>
  );
}
