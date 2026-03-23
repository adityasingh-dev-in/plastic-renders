import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';


// Designer image paths (absolute)
const VIDEO_EDITOR_IMG = '/video_editor.png';
const DESIGNER_3D_IMG = '/3d_designer.png';

// Designers data
const DESIGNERS = [
  {
    name: 'Alex Rivera',
    role: 'Lead Video Editor',
    image: VIDEO_EDITOR_IMG,
    bio: 'Specializing in cinematic storytelling and high-energy motion graphics with 8+ years of experience in post-production.',
    tags: ['Color Grading', 'VFX', 'Sound Design']
  },
  {
    name: 'Elena Vance',
    role: 'Senior 3D Designer',
    image: DESIGNER_3D_IMG,
    bio: 'Expert in photorealistic product rendering and industrial modeling, bringing concepts to life in three dimensions.',
    tags: ['Modeling', 'Rendering', 'Texturing']
  }
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1 },
  }),
};

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="about" className="bg-[var(--gray)]">
      <div
        ref={ref}
        className="w-full flex flex-col lg:flex-row gap-16 md:gap-24 items-start max-w-[1200px] mx-auto"
      >
        {/* ── Left: Intro Text ── */}
        <div className="lg:sticky lg:top-32 lg:max-w-[400px]">
          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={0}
            variants={fadeUp}
            className="text-[0.75rem] font-semibold tracking-[0.14em] uppercase text-[var(--muted)] mb-5"
          >
            Our Expertise
          </motion.div>

          <motion.h2
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={1}
            variants={fadeUp}
            className="font-serif font-bold leading-[1.15] tracking-[-0.02em]"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}
          >
            Meet Our <span className="text-[var(--blue)]">Specialists</span>
          </motion.h2>

          <motion.p
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={2}
            variants={fadeUp}
            className="mt-6 text-[#444] leading-[1.75]"
          >
            We've assembled a specialized team to handle your most creative needs. Whether it's crafting a visual narrative or modeling the future, our experts deliver with precision and passion.
          </motion.p>
          
          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={3}
            variants={fadeUp}
            className="mt-8"
          >
             <a
              href="#contact"
              onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="inline-flex items-center gap-2 bg-[var(--black)] text-white px-8 py-3.5 rounded-md text-[0.9rem] font-semibold no-underline transition-all duration-200 hover:bg-[var(--blue)] hover:-translate-y-px shadow-sm"
            >
              Start Your Project
            </a>
          </motion.div>
        </div>

        {/* ── Right: Designer Cards ── */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-8">
          {DESIGNERS.map((d, i) => (
            <motion.div
              key={d.name}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              custom={i + 2}
              variants={fadeUp}
              className="bg-white rounded-2xl overflow-hidden border border-[var(--border)] shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-[300ms] hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] group"
            >
              <div className="w-full aspect-[4/5] overflow-hidden bg-[var(--gray)]">
                <img
                  src={d.image}
                  alt={d.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-8">
                <div className="text-[var(--blue)] text-[0.72rem] font-bold tracking-wider uppercase mb-1">
                  {d.role}
                </div>
                <h3 className="text-[var(--black)] text-[1.4rem] font-serif font-bold mb-3">
                  {d.name}
                </h3>
                <p className="text-[var(--muted)] text-[0.88rem] leading-[1.6] mb-5">
                  {d.bio}
                </p>
                <div className="flex flex-wrap gap-2">
                  {d.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-[var(--gray)] rounded-full text-[0.7rem] font-medium text-[var(--muted)]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

