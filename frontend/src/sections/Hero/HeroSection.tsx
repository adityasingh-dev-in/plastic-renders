import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronRight, ChevronDown, ArrowUpRight } from 'lucide-react';

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const orbY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);

  /* ── Particle canvas ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles = Array.from({ length: 65 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.8 + 0.5,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4,
      o: Math.random() * 0.4 + 0.1,
    }));

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59,111,232,${p.o})`;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);

  const words = ['Crafting', 'Digital'];
  const blueWords = ['Experiences'];
  const trailWords = ['That', 'Matter'];

  // Smooth spring for staggered text
  const textSpring = { type: "spring", damping: 20, stiffness: 100 } as const;

  return (
    <section
      ref={ref}
      id="hero"
      className="min-h-screen w-full flex flex-col items-center justify-center text-center
                 px-[5vw] pt-[120px] pb-20 relative overflow-hidden bg-[#fafafa]"
    >
      {/* ── Particle layer ── */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 w-full h-full z-0"
        style={{ opacity: 0.8 }}
      />

      {/* ── Glowing radial orb ── */}
      <motion.div
        className="pointer-events-none absolute z-0"
        style={{
          y: orbY,
          width: 'clamp(300px, 60vw, 800px)',
          height: 'clamp(300px, 60vw, 800px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(59,111,232,0.12) 0%, rgba(59,111,232,0.03) 40%, transparent 70%)',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          animation: 'pulse-orb 6s ease-in-out infinite',
        }}
      />

      {/* ── Animated rings ── */}
      <div
        className="pointer-events-none absolute z-0"
        style={{
          width: 'clamp(240px, 45vw, 600px)',
          height: 'clamp(240px, 45vw, 600px)',
          borderRadius: '50%',
          border: '1px solid rgba(59,111,232,0.1)',
          left: '50%', top: '50%',
          transform: 'translate(-50%, -50%)',
          animation: 'ring-spin 28s linear infinite',
        }}
      >
        <div className="absolute top-0 left-1/2 w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_12px_rgba(59,111,232,0.8)] -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div
        className="pointer-events-none absolute z-0"
        style={{
          width: 'clamp(320px, 70vw, 950px)',
          height: 'clamp(320px, 70vw, 950px)',
          borderRadius: '50%',
          border: '1px dashed rgba(59,111,232,0.06)',
          left: '50%', top: '50%',
          transform: 'translate(-50%, -50%)',
          animation: 'ring-spin 48s linear infinite reverse',
        }}
      />

      {/* ── Parallax background watermark ── */}
      <motion.div
        style={{ y: bgY }}
        className="pointer-events-none absolute inset-0 flex items-center justify-center z-0"
      >
        <span
          className="font-serif font-black select-none tracking-tighter"
          style={{
            fontSize: 'clamp(5rem, 18vw, 17rem)',
            lineHeight: 1,
            color: 'transparent',
            WebkitTextStroke: '1px rgba(0,0,0,0.03)',
          }}
        >
          RENDERS
        </span>
      </motion.div>

      {/* ── Main content ── */}
      <motion.div
        className="relative z-10 flex flex-col items-center w-full max-w-[720px] mx-auto"
      >
        {/* Eyebrow pill */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          className="inline-flex items-center gap-2.5 mb-8 px-5 py-2 rounded-full bg-blue-50/50 border border-blue-200/50 backdrop-blur-sm shadow-sm"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
          <span className="text-xs font-bold tracking-widest uppercase text-blue-600">
            Premium Design & Development
          </span>
        </motion.div>

        {/* Headline — word-by-word reveal */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-serif font-black leading-none tracking-tight flex flex-wrap justify-center gap-[0.25em]"
          style={{ fontSize: 'clamp(3rem, 8vw, 5.5rem)' }} /* <-- Fixed order here */
        >
          {[...words].map((w, i) => (
            <motion.span
              key={w}
              initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ ...textSpring, delay: 0.2 + i * 0.1 }}
              className="text-gray-900"
            >
              {w}
            </motion.span>
          ))}
          {blueWords.map((w, i) => (
            <motion.span
              key={w}
              initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ ...textSpring, delay: 0.4 + i * 0.1 }}
              className="relative bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-indigo-500"
            >
              {w}
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.9, ease: 'circOut' }}
                className="absolute -bottom-1 left-0 right-0 h-[4px] rounded-full bg-gradient-to-r from-blue-500 to-indigo-400 opacity-40 origin-left"
              />
            </motion.span>
          ))}
          {trailWords.map((w, i) => (
            <motion.span
              key={w}
              initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ ...textSpring, delay: 0.5 + i * 0.1 }}
              className="text-gray-900"
            >
              {w}
            </motion.span>
          ))}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-6 text-gray-500 max-w-[540px] leading-relaxed text-base sm:text-lg px-2"
        >
          Premium design and development services that transform your vision into reality. We blend creativity with technology to deliver exceptional results.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85 }}
          className="flex flex-col sm:flex-row gap-4 mt-10 w-full max-w-[460px] justify-center"
        >
          <a
            href="#services"
            className="group relative inline-flex items-center justify-center gap-2 bg-gray-900 text-white px-8 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 hover:bg-blue-600 hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(59,111,232,0.3)] w-full sm:w-auto overflow-hidden"
          >
            <span className="absolute inset-0 w-full h-full bg-white/10 group-hover:translate-x-full transition-transform duration-500 ease-out -translate-x-full skew-x-12" />
            <ChevronRight size={16} strokeWidth={2.5} />
            Explore Services
          </a>
          <a
            href="#video-works"
            className="inline-flex items-center justify-center gap-2 bg-white/40 backdrop-blur-md text-gray-900 border border-gray-200 px-8 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 hover:bg-white hover:border-gray-300 hover:-translate-y-1 hover:shadow-lg w-full sm:w-auto"
          >
            View Our Work
            <ArrowUpRight size={16} strokeWidth={2} className="text-gray-500 group-hover:text-gray-900 transition-colors" />
          </a>
        </motion.div>

        {/* Stats ticker - Glassmorphism Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.0 }}
          className="flex mt-14 w-full max-w-[480px] bg-white/60 backdrop-blur-xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl overflow-hidden"
        >
          {[
            { val: '200+', label: 'Projects Delivered' },
            { val: '98%', label: 'Client Satisfaction' },
            { val: '8yr', label: 'Industry Experience' },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className={`flex-1 text-center py-4 px-2 ${i < 2 ? 'border-r border-gray-200/60' : ''}`}
            >
              <div className="text-2xl sm:text-3xl font-black font-serif text-blue-600 tracking-tight leading-none">
                {stat.val}
              </div>
              <div className="text-[10px] sm:text-xs font-semibold tracking-wider uppercase text-gray-500 mt-1.5">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* ── Scroll hint ── */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
        className="absolute bottom-8 flex flex-col items-center gap-1.5 text-gray-400 hover:text-blue-500 transition-colors cursor-pointer animate-bounce"
      >
        <span className="tracking-[0.15em] uppercase text-[10px] font-bold">Scroll</span>
        <ChevronDown size={18} strokeWidth={2} />
      </motion.button>

      {/* ── Keep essential animations in standard CSS ── */}
      <style>{`
        @keyframes ring-spin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to   { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes pulse-orb {
          0%, 100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          50%      { opacity: 0.6; transform: translate(-50%, -50%) scale(1.05); }
        }
      `}</style>
    </section>
  );
}