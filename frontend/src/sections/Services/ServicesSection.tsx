import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { SERVICES } from '../../constants/data';

// ── Service Card ───────────────────────────────────────────────
interface ServiceCardProps {
  service: typeof SERVICES[0];
  index: number;
  onOpen: (i: number) => void;
}

function ServiceCard({ service, index, onOpen }: ServiceCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
      className="border border-[var(--border)] rounded-xl overflow-hidden cursor-pointer bg-white transition-all duration-[250ms] hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(0,0,0,0.09)] group"
      onClick={() => onOpen(index)}
    >
      {/* Image area */}
      <div className="w-full h-[180px] overflow-hidden">
        <div
          className="w-full h-full flex items-center justify-center text-5xl transition-transform duration-[400ms] group-hover:scale-105"
          style={{ background: `linear-gradient(135deg, ${service.c1}, ${service.c2})` }}
        >
          {service.emoji}
        </div>
      </div>

      {/* Body */}
      <div className="p-6">
        <div className="text-[0.7rem] font-bold tracking-[0.12em] uppercase text-[var(--muted)] mb-1.5">
          {service.tag}
        </div>
        <div className="text-[1.05rem] font-bold text-[var(--black)] mb-1.5">{service.title}</div>
        <div className="text-[0.85rem] text-[var(--muted)] leading-[1.6]">{service.desc}</div>

        <div className="flex items-center gap-3 mt-4">
          <button
            className="text-[0.85rem] font-semibold text-[var(--blue)] border-b border-transparent transition-colors duration-200 hover:border-[var(--blue)] bg-transparent border-x-0 border-t-0 cursor-pointer p-0"
          >
            Learn More →
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ── Service Modal ──────────────────────────────────────────────
interface ServiceModalProps {
  service: typeof SERVICES[0] | null;
  onClose: () => void;
}

function ServiceModal({ service, onClose }: ServiceModalProps) {
  if (!service) return null;

  return (
    <AnimatePresence>
      {service && (
        <motion.div
          key="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={e => { if (e.target === e.currentTarget) onClose(); }}
          className="fixed inset-0 z-[600] bg-black/60 backdrop-blur-md flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
            className="bg-white rounded-2xl max-w-[560px] w-full max-h-[85vh] overflow-y-auto shadow-[0_32px_80px_rgba(0,0,0,0.2)]"
          >
            {/* Modal image */}
            <div
              className="w-full h-[200px] flex items-center justify-center text-5xl rounded-t-2xl"
              style={{ background: `linear-gradient(135deg, ${service.c1}, ${service.c2})` }}
            >
              {service.emoji}
            </div>

            {/* Modal body */}
            <div className="p-8">
              <div className="text-[0.72rem] font-bold tracking-[0.12em] uppercase text-[var(--muted)] mb-1.5">
                {service.tag}
              </div>
              <h2 className="font-serif text-[1.6rem] font-bold mb-4">{service.title}</h2>
              <p className="text-[#555] leading-[1.75] text-[0.95rem]">{service.long}</p>

              <ul className="mt-5 pl-5 text-[var(--muted)] text-[0.9rem] leading-loose list-disc">
                {service.features.map(f => <li key={f}>{f}</li>)}
              </ul>
            </div>

            {/* Modal footer */}
            <div className="px-8 py-5 border-t border-[var(--border)] flex items-center gap-3">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  onClose();
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[var(--black)] text-white no-underline rounded-md text-[0.9rem] font-semibold border-none cursor-pointer transition-all duration-200 hover:bg-[var(--blue)]"
              >
                Inquire Now
              </a>
              <button
                onClick={onClose}
                className="px-5 py-3 rounded-md text-[0.88rem] font-semibold border border-[var(--border)] bg-transparent cursor-pointer transition-colors duration-200 hover:border-[var(--black)]"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ── Services Section ──────────────────────────────────────────
export default function ServicesSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-60px' });
  const [modalIdx, setModalIdx] = useState<number | null>(null);

  return (
    <>
      <section id="services" className="bg-white">
        {/* Header */}
        <div
          ref={headerRef}
          className="w-full flex justify-between items-end max-w-[1200px] mx-auto mb-14 flex-wrap gap-4"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="text-[0.75rem] font-semibold tracking-[0.14em] uppercase text-[var(--muted)] mb-3">
              What We Do
            </div>
            <h2 className="font-serif font-bold leading-[1.15] tracking-tight" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
              Our <span className="text-[var(--blue)]">Services</span>
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[var(--muted)] text-right max-w-[280px] leading-[1.7]"
          >
            Everything you need to build a standout digital presence.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1200px] mx-auto">
          {SERVICES.map((svc, i) => (
            <ServiceCard
              key={svc.title}
              service={svc}
              index={i}
              onOpen={setModalIdx}
            />
          ))}
        </div>
      </section>

      {/* Modal */}
      <ServiceModal
        service={modalIdx !== null ? SERVICES[modalIdx] : null}
        onClose={() => setModalIdx(null)}
      />
    </>
  );
}

