import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Play } from 'lucide-react';
import { VIDEO_PROJECTS } from '../../../../constants/data';

// ── Video Card ───────────────────────────────────────────────
interface VideoCardProps {
  project: typeof VIDEO_PROJECTS[0];
  index: number;
  onOpen: (i: number) => void;
}

function VideoCard({ project, index, onOpen }: VideoCardProps) {
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
      <div className="w-full aspect-video overflow-hidden relative bg-[var(--gray)]">
        <img
          src={project.thumbnail}
          alt={project.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-[500ms] group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center text-[var(--black)] shadow-lg backdrop-blur-sm relative">
            <Play size={24} fill="currentColor" className="ml-1" />
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
          More Detail →
        </button>
      </div>
    </motion.div>
  );
}

// ── Video Modal ──────────────────────────────────────────────
interface VideoModalProps {
  project: typeof VIDEO_PROJECTS[0] | null;
  onClose: () => void;
}

function VideoModal({ project, onClose }: VideoModalProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="video-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={e => { if (e.target === e.currentTarget) onClose(); }}
          className="fixed inset-0 z-[600] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
            className="bg-black rounded-xl overflow-hidden shadow-2xl w-full max-w-[900px] border border-white/10 flex flex-col"
          >
            {/* YouTube Embed */}
            <div className="w-full aspect-video bg-black relative">
              <iframe
                src={`https://www.youtube.com/embed/${project.youtubeId}?autoplay=1`}
                title={project.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              ></iframe>
            </div>

            {/* Modal Footer with details */}
            <div className="bg-white p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h3 className="text-[1.4rem] font-serif font-bold text-[var(--black)] mb-2">{project.title}</h3>
                <p className="text-[0.95rem] text-[var(--muted)] leading-relaxed max-w-[600px]">{project.desc}</p>
              </div>
              <button
                onClick={onClose}
                className="px-6 py-3 shrink-0 rounded-md text-[0.9rem] font-semibold bg-[var(--black)] text-white border-none cursor-pointer transition-colors duration-200 hover:bg-[var(--blue)]"
              >
                Close Video
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ── Portfolio Section ──────────────────────────────────────────
export default function VideoPortfolio() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-60px' });
  const [modalIdx, setModalIdx] = useState<number | null>(null);

  return (
    <>
      <section id="video-works" className="bg-white pt-24 pb-20 px-[5vw]">
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
              Our Portfolio
            </div>
            <h2 className="font-serif font-bold leading-[1.15] tracking-tight mb-6" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
              Video <span className="text-[var(--blue)]">Works</span>
            </h2>
            <p className="text-[var(--muted)] text-[1.05rem] leading-[1.7] max-w-[600px] mx-auto">
              Explore our latest video editing projects, from high-energy promo videos to immersive documentaries.
            </p>
          </motion.div>
        </div>

        {/* Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1200px] mx-auto">
          {VIDEO_PROJECTS.map((project, i) => (
            <VideoCard
              key={project.title}
              project={project}
              index={i}
              onOpen={setModalIdx}
            />
          ))}
        </div>
      </section>

      {/* Video Player Modal */}
      <VideoModal
        project={modalIdx !== null ? VIDEO_PROJECTS[modalIdx] : null}
        onClose={() => setModalIdx(null)}
      />
    </>
  );
}
