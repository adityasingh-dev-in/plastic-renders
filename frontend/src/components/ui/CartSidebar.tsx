import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useCart } from '../../lib/cartContext';

interface CartSidebarProps {
  open: boolean;
  onClose: () => void;
}

/**
 * Right-side sliding cart drawer.
 */
export default function CartSidebar({ open, onClose }: CartSidebarProps) {
  const { cart, removeFromCart, total } = useCart();

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="cart-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[499]"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: open ? 0 : '100%' }}
        transition={{ type: 'tween', duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
        className="fixed top-0 right-0 w-[360px] max-w-[90vw] h-screen bg-white border-l border-[var(--border)] z-[500] flex flex-col shadow-[−8px_0_32px_rgba(0,0,0,0.08)]"
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-[var(--border)]">
          <h3 className="font-serif text-[1.1rem] font-bold">Your Cart</h3>
          <button
            onClick={onClose}
            className="text-[var(--muted)] text-[1.4rem] border-none bg-transparent cursor-pointer leading-none transition-colors duration-200 hover:text-[var(--black)]"
          >
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {cart.length === 0 ? (
            <div className="text-center py-12 text-[var(--muted)] text-sm">
              <div className="text-4xl mb-3">🛒</div>
              Your cart is empty
            </div>
          ) : (
            cart.map(item => (
              <motion.div
                key={item.idx}
                layout
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex gap-4 py-4 border-b border-[var(--border)] items-center"
              >
                <div className="w-11 h-11 rounded-lg bg-[var(--gray)] flex items-center justify-center text-xl flex-shrink-0">
                  {item.emoji}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-[0.88rem]">{item.title}</p>
                  <p className="text-[var(--blue)] text-[0.82rem] font-semibold mt-0.5">
                    ${item.price.toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => removeFromCart(item.idx)}
                  className="text-[var(--muted)] border-none bg-transparent cursor-pointer p-1 rounded transition-colors duration-200 hover:text-red-400"
                >
                  <X size={16} />
                </button>
              </motion.div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-[var(--border)]">
            <div className="flex justify-between font-bold mb-4 text-[1rem]">
              <span>Total</span>
              <span>${total.toLocaleString()}</span>
            </div>
            <button className="w-full py-3.5 bg-[var(--black)] text-white border-none rounded-lg font-sans text-[0.95rem] font-semibold cursor-pointer transition-colors duration-200 hover:bg-[var(--blue)]">
              Checkout →
            </button>
          </div>
        )}
      </motion.div>
    </>
  );
}
