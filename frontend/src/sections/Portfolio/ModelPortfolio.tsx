import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Images, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { MODEL_PROJECTS } from '../../constants/data';

// ── Model Card ───────────────────────────────────────────────
interface ModelCardProps {
  project: typeof MODEL_PROJECTS[0];
  index: number;
  onOpen: (i: number) => void;
}

function ModelCard({ project, index, onOpen }: ModelCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
      className="border border-[var(--border)] rounded-xl overflow-hidden cursor-pointer bg-white transition-all duration-[250ms] hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(0,0,0,0.09)] group flex flex-col"
      onClick={() => onOpen(index)}
    >
      {/* Thumbnail area */}
      <div className="w-full aspect-[4/3] overflow-hidden relative bg-[var(--gray)]">
        <img 
          src={project.thumbnail} 
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-[500ms] group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center text-[var(--black)] shadow-lg backdrop-blur-sm relative transition-transform duration-300 group-hover:scale-110">
            <Images size={20} strokeWidth={2} />
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-6 flex flex-col flex-1">
        <div className="text-[1.1rem] font-bold text-[var(--black)] mb-2">{project.title}</div>
        <div className="text-[0.88rem] text-[var(--muted)] leading-[1.6] mb-5 flex-1">{project.desc}</div>

        <button
          className="text-[0.85rem] font-semibold text-[var(--blue)] border-b border-transparent transition-colors duration-200 hover:border-[var(--blue)] bg-transparent border-x-0 border-t-0 p-0 text-left self-start"
        >
          View Gallery →
        </button>
      </div>
    </motion.div>
  );
}

// ── Image Carousel Modal ──────────────────────────────────────────────
interface ModelModalProps {
  project: typeof MODEL_PROJECTS[0] | null;
  onClose: () => void;
}

function ModelModal({ project, onClose }: ModelModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Reset index when modal opens with a new project
  useRef(() => {
    setCurrentIndex(0);
  });

  if (!project) return null;

  const nextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % project.images.length);
  };

  const prevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
  };

  const slideVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.02 }
  };

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="model-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={e => { if (e.target === e.currentTarget) onClose(); }}
          className="fixed inset-0 z-[600] bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4"
        >
          {/* Top Bar */}
          <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-start z-10 pointer-events-none">
            <div className="pointer-events-auto">
              <h3 className="text-[1.3rem] font-serif font-bold text-white mb-1 shadow-black drop-shadow-md">{project.title}</h3>
              <p className="text-[0.9rem] text-white/80 max-w-[600px] shadow-black drop-shadow-md">{project.desc}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors pointer-events-auto border-none cursor-pointer backdrop-blur-md"
            >
              <X size={24} />
            </button>
          </div>

          {/* Carousel Container */}
          <div className="w-full max-w-[1400px] flex-1 flex items-center justify-center relative my-12 pointer-events-none">
            
            {/* Image */}
            <div className="relative w-full h-full max-h-[80vh] flex items-center justify-center pointer-events-auto">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentIndex}
                  src={project.images[currentIndex]}
                  variants={slideVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                  className="max-w-full max-h-full object-contain rounded-md shadow-2xl"
                  alt={`${project.title} view ${currentIndex + 1}`}
                />
              </AnimatePresence>
            </div>

            {/* Controls */}
            {project.images.length > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/25 backdrop-blur-md border border-white/20 text-white rounded-full transition-all duration-200 pointer-events-auto cursor-pointer"
                >
                  <ChevronLeft size={28} className="mr-1" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/25 backdrop-blur-md border border-white/20 text-white rounded-full transition-all duration-200 pointer-events-auto cursor-pointer"
                >
                  <ChevronRight size={28} className="ml-1" />
                </button>
              </>
            )}
          </div>

          {/* Indicators */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
            {project.images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-3 h-3 rounded-full border-none p-0 cursor-pointer transition-all duration-300 ${
                  i === currentIndex ? 'bg-white scale-125' : 'bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ── Portfolio Section ──────────────────────────────────────────
export default function ModelPortfolio() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-60px' });
  const [modalIdx, setModalIdx] = useState<number | null>(null);

  // When modal closes, we don't need to do anything special, state is kept in modal or reset on mount.

  return (
    <>
      <section id="works-3d" className="bg-(--gray) pt-20 pb-24 px-[5vw]">
        {/* Header */}
        <div
          ref={headerRef}
          className="w-full flex flex-col justify-center items-center text-center max-w-[800px] mx-auto mb-16"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="text-[0.75rem] font-semibold tracking-[0.14em] uppercase text-[var(--muted)] mb-4">
              3D Design
            </div>
            <h2 className="font-serif font-bold leading-[1.15] tracking-tight mb-6" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
              Model <span className="text-[var(--blue)]">Galleries</span>
            </h2>
            <p className="text-[var(--muted)] text-[1.05rem] leading-[1.7] max-w-[600px] mx-auto">
              From architectural visualizations to detailed product renderings, browse our complete 3D portfolios.
            </p>
          </motion.div>
        </div>

        {/* Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1200px] mx-auto">
          {MODEL_PROJECTS.map((project, i) => (
            <ModelCard
              key={project.title}
              project={project}
              index={i}
              onOpen={setModalIdx}
            />
          ))}
        </div>
      </section>

      {/* Image Carousel Modal */}
      <ModelModal
        project={modalIdx !== null ? MODEL_PROJECTS[modalIdx] : null}
        onClose={() => setModalIdx(null)}
      />
    </>
  );
}
