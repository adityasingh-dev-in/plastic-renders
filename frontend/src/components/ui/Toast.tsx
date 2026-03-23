import { motion, AnimatePresence } from 'framer-motion';

interface ToastProps {
  message: string;
  visible: boolean;
  green?: boolean;
}

/**
 * A small floating toast notification that appears at the bottom of the screen.
 */
export default function Toast({ message, visible, green }: ToastProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: 20, x: '-50%' }}
          transition={{ duration: 0.3 }}
          style={{ left: '50%' }}
          className={`fixed bottom-8 z-[9999] px-5 py-2.5 rounded-lg text-sm font-semibold text-white pointer-events-none whitespace-nowrap ${
            green ? 'bg-green-500' : 'bg-[var(--black)]'
          }`}
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
