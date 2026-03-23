/**
 * Site footer with logo, copyright, and footer links.
 */
export default function Footer() {
  return (
    <footer className="bg-[#080808] px-[5vw] py-10 flex items-center justify-between flex-wrap gap-4 border-t border-white/[0.06]">
      {/* Logo */}
      <a
        href="#"
        onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        className="no-underline"
      >
        <span className="font-sans font-semibold text-[1.1rem] tracking-tight text-white">
          Plastic Renders<span className="text-[var(--blue)]">.</span>
        </span>
      </a>

      <p className="text-[0.8rem] text-white/30">© 2026 Plastic Renders. All rights reserved.</p>

      {/* Links */}
      <div className="flex gap-6">
        {['Privacy', 'Terms', 'Contact'].map(label => (
          <a
            key={label}
            href={label === 'Contact' ? '#contact' : '#'}
            onClick={e => {
              if (label === 'Contact') {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="text-[0.8rem] text-white/30 no-underline transition-colors duration-200 hover:text-white/70"
          >
            {label}
          </a>
        ))}
      </div>
    </footer>
  );
}
