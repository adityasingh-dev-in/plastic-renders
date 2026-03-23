import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronRight, ChevronDown, ArrowUpRight } from 'lucide-react';

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const orbY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);

  /* ── Unique Generative Mesh Animation ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    let animationFrameId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    const draw = () => {
      time += 0.005;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // OPTIMIZATION: Larger grid on mobile to save CPU
      const isMobile = window.innerWidth < 768;
      const gridSize = isMobile ? 40 : 50; 
      
      const rows = Math.ceil(canvas.height / gridSize) + 1;
      const cols = Math.ceil(canvas.width / gridSize) + 1;

      ctx.beginPath();
      ctx.strokeStyle = 'rgba(59, 111, 232, 0.08)'; 
      ctx.lineWidth = 1;

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const xOffset = Math.sin(time + y * 0.3) * (isMobile ? 10 : 20);
          const yOffset = Math.cos(time + x * 0.3) * (isMobile ? 10 : 20);
          const px = x * gridSize + xOffset;
          const py = y * gridSize + yOffset;
          if (x === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
      }

      for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
          const xOffset = Math.sin(time + y * 0.3) * (isMobile ? 10 : 20);
          const yOffset = Math.cos(time + x * 0.3) * (isMobile ? 10 : 20);
          const px = x * gridSize + xOffset;
          const py = y * gridSize + yOffset;
          if (y === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
      }
      
      ctx.stroke();
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const words = ['Crafting', 'Digital'];
  const blueWords = ['Experiences'];
  const trailWords = ['That', 'Matter'];
  const textSpring = { type: "spring", damping: 20, stiffness: 100 } as const;

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={ref}
      id="hero"
      className="min-h-screen w-full flex flex-col items-center justify-center text-center
                 px-6 sm:px-[5vw] pt-[100px] sm:pt-[120px] pb-20 relative overflow-hidden bg-[#fafafa]"
    >
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 w-full h-full z-0 opacity-60"
      />

      <motion.div
        className="pointer-events-none absolute z-0"
        style={{
          y: orbY,
          width: '100vw', // Wider on mobile
          height: '100vw',
          background: 'radial-gradient(circle, rgba(59,111,232,0.07) 0%, transparent 70%)',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Watermark: Hidden on very small screens for better performance/clarity */}
      <motion.div
        style={{ y: bgY }}
        className="pointer-events-none absolute inset-0 hidden sm:flex items-center justify-center z-0"
      >
        <span
          className="font-serif font-black select-none tracking-tighter"
          style={{
            fontSize: 'clamp(5rem, 18vw, 17rem)',
            lineHeight: 1,
            color: 'transparent',
            WebkitTextStroke: '1px rgba(0,0,0,0.02)',
          }}
        >
          RENDERS
        </span>
      </motion.div>

      <motion.div className="relative z-10 flex flex-col items-center w-full max-w-[720px] mx-auto">
        {/* Eyebrow - Smaller text on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 mb-6 sm:mb-8 px-4 sm:px-5 py-2 rounded-full bg-white border border-blue-100 shadow-sm"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
          <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.15em] sm:tracking-[0.2em] uppercase text-blue-600/80">
            Premium Digital Studio
          </span>
        </motion.div>

        {/* Headline - Optimized clamp and line height for mobile */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-serif font-black leading-[1.1] sm:leading-[1.1] tracking-tight flex flex-wrap justify-center gap-x-[0.2em] gap-y-1 sm:gap-y-0"
          style={{ fontSize: 'clamp(2.5rem, 12vw, 5rem)' }} 
        >
          {words.map((w, i) => (
            <motion.span key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ...textSpring, delay: 0.1 * i }} className="text-gray-900">{w}</motion.span>
          ))}
          {blueWords.map((w, i) => (
            <span key={i} className="text-blue-600 italic w-full sm:w-auto">{w}</span>
          ))}
          {trailWords.map((w, i) => (
            <motion.span key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ...textSpring, delay: 0.4 + (0.1 * i) }} className="text-gray-900">{w}</motion.span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 text-gray-500 max-w-[500px] text-base sm:text-lg leading-relaxed px-4 sm:px-0"
        >
          Architecting high-end digital solutions through precise design and experimental motion.
        </motion.p>

        {/* CTA Buttons - Full width on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-8 sm:mt-10 w-full px-6 sm:px-0 sm:max-w-[460px] justify-center relative z-20"
        >
          <a
            href="#services"
            onClick={(e) => scrollToSection(e, '#services')}
            className="group relative inline-flex items-center justify-center gap-2 bg-gray-900 text-white px-8 py-4 sm:py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 active:scale-95 sm:hover:bg-blue-600 sm:hover:-translate-y-1 w-full sm:w-auto overflow-hidden"
          >
            <ChevronRight size={16} strokeWidth={2.5} />
            Explore Services
          </a>

          <a
            href="#video-works"
            onClick={(e) => scrollToSection(e, '#video-works')}
            className="inline-flex items-center justify-center gap-2 bg-white/40 backdrop-blur-md text-gray-900 border border-gray-200 px-8 py-4 sm:py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 active:scale-95 sm:hover:bg-white w-full sm:w-auto"
          >
            View Our Work
            <ArrowUpRight size={16} strokeWidth={2} className="text-gray-500" />
          </a>
        </motion.div>
      </motion.div>

      {/* ── Scroll hint - Hidden on small mobile to save space ── */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-6 sm:bottom-10 text-gray-300 hidden xs:block"
      >
        <ChevronDown size={24} />
      </motion.div>
    </section>
  );
}