import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { SERVICES } from '../../constants/data';
import { ArrowRight, X } from 'lucide-react'; // Added for better UI

// ── Service Card ───────────────────────────────────────────────
function ServiceCard({ service, index, onOpen }: any) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
      className="group relative border border-gray-100 rounded-2xl overflow-hidden cursor-pointer bg-white transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)]"
      onClick={() => onOpen(index)}
    >
      {/* Image area with Gradient Overlay */}
      <div className="relative w-full h-[220px] overflow-hidden">
        <img 
          src={service.image} 
          alt={service.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-700 scale-105 group-hover:scale-110"
        />
      </div>

      {/* Body */}
      <div className="p-7 relative z-20 bg-white">
        <div className="text-[0.65rem] font-black tracking-[0.2em] uppercase text-blue-600 mb-2">
          {service.tag}
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
          {service.title}
        </h3>
        <p className="text-sm text-gray-500 leading-relaxed mb-6">
          {service.desc}
        </p>

        <div className="flex items-center gap-2 text-sm font-bold text-gray-900 group-hover:gap-4 transition-all">
          <span>Explore Service</span>
          <ArrowRight size={16} className="text-blue-600" />
        </div>
      </div>
    </motion.div>
  );
}

// ── Service Modal ──────────────────────────────────────────────
function ServiceModal({ service, onClose }: any) {
  if (!service) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[1000] bg-gray-900/80 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          onClick={e => e.stopPropagation()}
          className="bg-white rounded-3xl max-w-[800px] w-full max-h-[90vh] overflow-hidden shadow-2xl relative flex flex-col md:flex-row"
        >
          {/* Close Button - More visible on mobile */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-50 p-2 bg-black/10 sm:bg-white/20 hover:bg-black/20 sm:hover:bg-white/40 backdrop-blur-md rounded-full text-gray-900 sm:text-white transition-colors"
          >
            <X size={20} />
          </button>

          {/* Modal Image - Adjusted for Mobile Aspect Ratio */}
          <div className="w-full md:w-5/12 h-48 md:h-auto relative shrink-0">
             <img src={service.image} className="w-full h-full object-cover" alt={service.title} loading="lazy" decoding="async" />
             <div 
               className="absolute inset-0 opacity-40" 
               style={{ background: `linear-gradient(to bottom right, ${service.c1}, ${service.c2})` }} 
             />
          </div>

          {/* Modal Content - Better padding and scrolling */}
          <div className="w-full md:w-7/12 p-6 md:p-10 overflow-y-auto flex flex-col">
            <span className="text-[10px] sm:text-xs font-bold tracking-widest text-blue-600 uppercase">
              {service.tag}
            </span>
            <h2 className="text-2xl md:text-3xl font-bold mt-2 mb-4 text-gray-900 leading-tight">
              {service.title}
            </h2>
            <p className="text-gray-600 leading-relaxed text-sm mb-6">
              {service.long}
            </p>
            
            <div className="space-y-3 mb-8">
              {service.features.map((f: string) => (
                <div key={f} className="flex items-start gap-3 text-sm text-gray-700 font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                  <span>{f}</span>
                </div>
              ))}
            </div>

            {/* Actions - Stacked on mobile for better tap targets if needed, or flex-row */}
            <div className="mt-auto flex flex-col sm:flex-row gap-3">
              <a 
                href="#contact" 
                onClick={() => { onClose(); document.querySelector('#contact')?.scrollIntoView({behavior:'smooth'}); }}
                className="flex-1 text-center py-3.5 bg-gray-900 text-white rounded-xl font-bold text-sm hover:bg-blue-600 transition-all active:scale-95 shadow-lg"
              >
                Inquire Now
              </a>
              <button 
                onClick={onClose} 
                className="px-6 py-3.5 border border-gray-200 rounded-xl font-bold text-sm text-gray-500 hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ── Main Section ──────────────────────────────────────────────
export default function ServicesSection() {
  const [modalIdx, setModalIdx] = useState<number | null>(null);

  return (
    <section id="services" className="py-24 bg-[#FAFAFA] px-[5vw]">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-blue-600 font-bold tracking-[0.2em] text-xs uppercase mb-3 block">Expertise</span>
            <h2 className="text-4xl md:text-6xl font-serif font-black text-gray-900 leading-[1.1]">
              Tailored <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">Creative</span> Solutions
            </h2>
          </div>
          <p className="text-gray-500 max-w-[320px] text-sm md:text-base leading-relaxed border-l-2 border-blue-100 pl-6">
            We merge artistic vision with technical precision to deliver assets that perform.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {SERVICES.map((svc, i) => (
            <ServiceCard 
              key={svc.title} 
              service={svc} 
              index={i} 
              onOpen={setModalIdx} 
            />
          ))}
        </div>
      </div>

      <ServiceModal 
        service={modalIdx !== null ? SERVICES[modalIdx] : null} 
        onClose={() => setModalIdx(null)} 
      />
    </section>
  );
}