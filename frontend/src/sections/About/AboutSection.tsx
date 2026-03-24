import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { PROFESSIONALS } from '../../../../constants/data';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.05 },
  }),
};

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="about" className="bg-[#ffffff] py-24 border-y border-zinc-100">
      <div ref={ref} className="max-w-[1200px] mx-auto px-6">

        {/* ── Header: Focused on the Client's Journey ── */}
        <div className="max-w-[800px] mb-20 text-center mx-auto">
          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={0}
            variants={fadeUp}
            className="text-[0.7rem] font-bold tracking-[0.2em] uppercase text-blue-600 mb-4"
          >
            The Plastic Renders Collective
          </motion.div>

          <motion.h2
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={1}
            variants={fadeUp}
            className="text-4xl md:text-5xl font-serif font-bold text-zinc-900 leading-tight tracking-tight mb-6"
          >
            Your ideas, guided by <span className="text-[#3b6fe8] font-light italic">our hands.</span>
          </motion.h2>

          <motion.p
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={2}
            variants={fadeUp}
            className="text-zinc-500 text-lg leading-relaxed"
          >
            We don't just "take orders." We partner with you to turn early-stage concepts into professional-grade assets. Whether you're just starting out or scaling up, our team is here to navigate the technical complexity for you.
          </motion.p>
        </div>

        {/* ── Team Directory: Accessible & Friendly ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROFESSIONALS.map((d, i) => (
            <motion.div
              key={d.name}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              custom={i + 3}
              variants={fadeUp}
              className="group p-8 bg-zinc-50/50 border border-zinc-100 rounded-2xl transition-all duration-300 hover:bg-white hover:border-blue-500/20 hover:shadow-[0_15px_40px_rgba(0,0,0,0.04)]"
            >
              {/* Initials with a more "Human" touch */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-white border border-zinc-200 flex items-center justify-center text-sm font-bold text-zinc-600 group-hover:text-blue-600 group-hover:border-blue-200 transition-all shadow-sm">
                  {d.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="text-blue-600 text-[0.65rem] font-black tracking-widest uppercase">
                    {d.role}
                  </div>
                  <h3 className="text-zinc-900 text-lg font-bold">
                    {d.name}
                  </h3>
                </div>
              </div>

              <p className="text-zinc-500 text-[0.9rem] leading-relaxed mb-6">
                {d.bio}
              </p>

              {/* Skills / What they help you with */}
              <div className="space-y-3">
                <div className="text-[0.65rem] font-bold text-zinc-400 uppercase tracking-tighter">How they'll help you:</div>
                <div className="flex flex-wrap gap-2">
                  {d.tags.map(tag => (
                    <span key={tag} className="text-[0.7rem] font-medium text-zinc-600 px-3 py-1 bg-white rounded-full border border-zinc-200 group-hover:border-zinc-300 transition-colors">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Trust Footer ── */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          custom={PROFESSIONALS.length + 3}
          variants={fadeUp}
          className="mt-20 p-8 rounded-3xl bg-zinc-900 text-center"
        >
          <h4 className="text-white font-medium mb-2">New to 3D or Rendering?</h4>
          <p className="text-zinc-400 text-sm mb-6">Don't worry about the technical details. We handle the hard stuff so you can focus on the vision.</p>
          <a href="#contact" className="inline-block px-6 py-3 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-500 transition-colors">
            Ask us a beginner question
          </a>
        </motion.div>
      </div>
    </section>
  );
}