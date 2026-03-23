import { Link, useLocation } from 'react-router-dom';

/**
 * Site footer with logo, copyright, and footer links.
 */
export default function Footer() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <footer className="bg-[#080808] px-[5vw] py-10 flex items-center justify-between flex-wrap gap-4 border-t border-white/6">
      {/* Logo */}
      <Link
        to="/"
        onClick={e => { 
          if (isHome) {
            e.preventDefault(); 
            window.scrollTo({ top: 0, behavior: 'smooth' }); 
          }
        }}
        className="no-underline"
      >
        <span className="font-sans font-semibold text-[1.1rem] tracking-tight text-white">
          Plastic Renders<span className="text-(--blue)">.</span>
        </span>
      </Link>

      <p className="text-[0.8rem] text-white/30">© 2026 Plastic Renders. All rights reserved.</p>

      {/* Links */}
      <div className="flex gap-6">
        <Link to="/privacy" className="text-[0.8rem] text-white/30 no-underline transition-colors duration-200 hover:text-white/70">
          Privacy
        </Link>
        <Link to="/terms" className="text-[0.8rem] text-white/30 no-underline transition-colors duration-200 hover:text-white/70">
          Terms
        </Link>
        <a
          href={isHome ? "#contact" : "/#contact"}
          onClick={e => {
            if (isHome) {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="text-[0.8rem] text-white/30 no-underline transition-colors duration-200 hover:text-white/70"
        >
          Contact
        </a>
      </div>
    </footer>
  );
}
