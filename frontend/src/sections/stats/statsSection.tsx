import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { STATS } from '../../constants/data';

export default function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section 
      ref={ref} 
      className="relative py-20 bg-white overflow-hidden"
    >
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-64 bg-blue-50/50 rounded-[3rem] blur-3xl -z-10" />

      <div className="max-w-6xl mx-auto px-[5vw]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                duration: 0.8, 
                delay: i * 0.2, 
                ease: [0.21, 1.11, 0.81, 0.99] 
              }}
              className="relative group flex flex-col items-center text-center p-8 rounded-3xl transition-all duration-500 hover:bg-blue-50/30"
            >
              {/* Subtle Number Shadow/Glow */}
              <div className="absolute top-10 text-6xl font-serif font-black text-blue-600/5 select-none transition-transform duration-500 group-hover:scale-110">
                {stat.num}
              </div>

              <motion.span 
                className="text-5xl md:text-6xl font-serif font-black text-gray-900 tracking-tighter mb-2"
              >
                {stat.num}
              </motion.span>
              
              <div className="flex items-center gap-3">
                <span className="w-8 h-[2px] bg-blue-600 rounded-full" />
                <span className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-gray-400">
                  {stat.label}
                </span>
                <span className="w-2 h-[2px] bg-blue-600 rounded-full opacity-40" />
              </div>
              
              {/* Animated Underline on Hover */}
              <div className="mt-4 w-0 h-1 bg-blue-600/10 rounded-full group-hover:w-12 transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}