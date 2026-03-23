import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Menu } from 'lucide-react';
import { NAV_LINKS } from '../../constants/data';

/**
 * Fixed top navigation bar.
 * - Scrolled shadow effect
 * - Mobile hamburger menu
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Shadow on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = useCallback((href: string) => {
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  }, []);

  return (
    <>
      {/* ── Main Nav ── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-200 flex items-center justify-between px-[5vw] h-[72px] bg-white/95 backdrop-blur-md border-b border-(--border) transition-shadow duration-300 ${
          scrolled ? 'shadow-[0_4px_24px_rgba(0,0,0,0.08)]' : ''
        }`}
      >
        {/* Logo */}
        <a
          href="#"
          onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="flex items-center gap-2 no-underline"
        >
          <span className="font-sans font-semibold text-[1.15rem] tracking-tight text-(--black)">
            Plastic Renders<span className="text-(--blue)">.</span>
          </span>
        </a>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-5 lg:gap-8 lg:absolute lg:right-10 list-none">
          {NAV_LINKS.map(link => (
            <li key={link.href}>
              <button
                onClick={() => scrollTo(link.href)}
                className="px-2 py-1 text-[0.9rem] font-medium text-(--black) bg-transparent border-none cursor-pointer relative group transition-colors duration-200 hover:text-(--blue)"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-2 w-0 h-[2px] bg-(--blue) transition-all duration-250 group-hover:w-[calc(100%-1rem)]" />
              </button>
            </li>
          ))}
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Hamburger */}
          <button
            className="p-2 md:hidden w-10 h-10 flex items-center justify-center border-none bg-transparent cursor-pointer"
            onClick={() => setMobileOpen(v => !v)}
            aria-label="Toggle menu"
          >
            <motion.div animate={mobileOpen ? 'open' : 'closed'}>
              <Menu size={22} className={mobileOpen ? 'hidden' : 'block'} />
              {mobileOpen && <X size={22} />}
            </motion.div>
          </button>
        </div>
      </nav>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[72px] left-0 right-0 bg-white/98 backdrop-blur-md border-b border-(--border) z-[199] flex flex-col"
          >
            {NAV_LINKS.map(link => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="py-4 px-[5vw] text-[1.1rem] font-medium text-(--black) text-left border-b border-(--border) bg-transparent border-x-0 border-t-0 cursor-pointer transition-colors duration-200 hover:text-[var(--blue)] last:border-b-0"
              >
                {link.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}