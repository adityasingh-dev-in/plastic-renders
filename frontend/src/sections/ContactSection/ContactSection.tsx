import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import emailjs from '@emailjs/browser';
import { SOCIAL_LINKS } from '../../constants/data';
import { Instagram, MessageCircle } from 'lucide-react';

// ── Form schema ────────────────────────────────────────────────
const schema = z.object({
  name:    z.string().min(2, 'Name is required'),
  email:   z.string().email('Enter a valid email'),
  service: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type FormValues = z.infer<typeof schema>;

const SERVICES_LIST = [
  'Video Editing',
  '3D Model Designing',
];

/**
 * Contact section with dark background, contact form powered by react-hook-form + zod.
 */
export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [sending, setSending] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setSending(true);
    setSubmitted(false);
    setError(false);

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAIL_SERVICE,
        import.meta.env.VITE_EMAIL_TEMPLATE,
        {
          visitor_name:    data.name,
          visitor_email:   data.email,
          visitor_message: data.message,
          reply_to:        data.email,    // Ensures "Reply" button works
          service:         data.service ?? 'Not specified',
          subject:         data.subject ?? 'No Subject',
        },
        import.meta.env.VITE_EMAIL_KEY
      );

      setSubmitted(true);
      reset();
      setTimeout(() => setSubmitted(false), 6000);
    } catch(err) {
       console.error("EmailJS Error:", err);
       setError(true);
    } finally {
      setSending(false);
    }
  };

  const inputClass =
    'w-full bg-white/[0.07] border border-white/[0.12] rounded-md px-4 py-3.5 font-sans text-[0.95rem] text-white outline-none transition-colors duration-200 focus:border-[var(--blue)] placeholder:text-white/30';

  return (
    <section id="contact" className="bg-(--black) text-white text-center">
      <div ref={ref} className="w-full max-w-[560px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-[0.75rem] font-semibold tracking-[0.14em] uppercase text-white/40 mb-3"
        >
          Get In Touch
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-serif font-bold leading-[1.15] tracking-tight text-white"
          style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}
        >
          Let's Build Something <span className="text-(--blue)">Great</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-3 text-white/50 leading-[1.7]"
        >
          Ready to transform your digital presence? We'd love to hear about your project.{' '}
          <a href="mailto:plasticrenders@gmail.com" className="text-[var(--blue)] no-underline font-semibold hover:underline">
            plasticrenders@gmail.com
          </a>
        </motion.p>

        {/* Social Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="flex flex-wrap justify-center gap-4 mt-8"
        >
          <a
            href={SOCIAL_LINKS.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#25D366]/10 border border-[#25D366]/20 text-[#25D366] font-medium transition-all hover:bg-[#25D366]/20 hover:scale-105"
          >
            <MessageCircle size={20} />
            WhatsApp
          </a>
          <a
            href={SOCIAL_LINKS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#E4405F]/10 border border-[#E4405F]/20 text-[#E4405F] font-medium transition-all hover:bg-[#E4405F]/20 hover:scale-105"
          >
            <Instagram size={20} />
            Instagram
          </a>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="flex flex-col gap-4 mt-12 text-left"
        >
          <div>
            <input {...register('name')} placeholder="Your name *" className={inputClass} />
            {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <input {...register('email')} type="email" placeholder="Email address *" className={inputClass} />
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
          </div>
          <select {...register('service')} className={`${inputClass} [&>option]:bg-[#1a1a1a]`}>
            <option value="">Select a service…</option>
            {SERVICES_LIST.map(s => <option key={s}>{s}</option>)}
          </select>
          <input {...register('subject')} placeholder="Subject" className={inputClass} />
          <div>
            <textarea
              {...register('message')}
              placeholder="Tell us about your project…"
              rows={5}
              className={`${inputClass} resize-y min-h-[120px]`}
            />
            {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>}
          </div>

          <button
            type="submit"
            disabled={sending}
            className="flex items-center justify-center gap-2 w-full py-4 bg-[var(--blue)] text-white border-2 border-[var(--blue)] rounded-md font-sans text-[1rem] font-semibold cursor-pointer transition-all duration-200 hover:bg-[#2a5ad4] hover:border-[#2a5ad4] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {sending ? (
              <>
                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                </svg>
                Sending…
              </>
            ) : 'Send Message'}
          </button>

          {submitted && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-green-500/15 border border-green-500/30 rounded-lg p-6 text-green-400 font-semibold text-center"
            >
              ✓ Message sent! We'll get back to you within 24 hours.
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/15 border border-red-500/30 rounded-lg p-6 text-red-400 font-semibold text-center"
            >
              ✕ Failed to send message. Please try again or email us directly.
            </motion.div>
          )}
        </motion.form>
      </div>
    </section>
  );
}
