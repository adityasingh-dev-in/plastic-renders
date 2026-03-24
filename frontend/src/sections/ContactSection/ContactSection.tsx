import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import emailjs from '@emailjs/browser';
import { SOCIAL_LINKS } from '../../../../constants/data';
import {
  Instagram,
  MessageCircle,
  Mail,
  ArrowRight,
  CheckCircle,
  XCircle,
} from 'lucide-react';

// ── Form schema ────────────────────────────────────────────────
const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Enter a valid email'),
  service: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type FormValues = z.infer<typeof schema>;

const SERVICES_LIST = ['Video Editing', '3D Model Designing'];

// ── Shared input class ─────────────────────────────────────────
const fieldInput =
  'w-full bg-white/[0.05] border border-white/[0.1] rounded-lg px-4 py-3 font-sans text-[0.9rem] text-white outline-none transition-all duration-200 focus:border-[var(--blue)] focus:bg-white/[0.08] placeholder:text-white/20';

// ── Labeled field wrapper ──────────────────────────────────────
function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="flex items-center gap-1 text-[0.68rem] font-semibold tracking-[0.14em] uppercase text-white/35">
        {label}
        {required && (
          <span className="text-[var(--blue)] text-[10px] leading-none">*</span>
        )}
      </label>
      {children}
      {error && (
        <p className="text-red-400/90 text-xs mt-0.5 flex items-center gap-1">
          <span className="inline-block w-1 h-1 rounded-full bg-red-400/70 flex-shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────
export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [sending, setSending] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setSending(true);
    setSubmitted(false);
    setError(false);
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAIL_SERVICE,
        import.meta.env.VITE_EMAIL_TEMPLATE,
        {
          visitor_name: data.name,
          visitor_email: data.email,
          visitor_message: data.message,
          reply_to: data.email,
          service: data.service ?? 'Not specified',
          subject: data.subject ?? 'No Subject',
        },
        import.meta.env.VITE_EMAIL_KEY
      );
      setSubmitted(true);
      reset();
      setTimeout(() => setSubmitted(false), 6000);
    } catch (err) {
      console.error('EmailJS Error:', err);
      setError(true);
    } finally {
      setSending(false);
    }
  };

  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.6, delay },
  });

  return (
    <section id="contact" className="relative bg-(--black) text-white overflow-hidden">

      {/* ── Decorative background ─────────────────────── */}
      <div className="pointer-events-none absolute inset-0">
        {/* Dot grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
        />
        {/* Blue glow — top left */}
        <div
          className="absolute -top-48 -left-48 w-[700px] h-[700px] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(58,108,255,0.12) 0%, transparent 65%)',
          }}
        />
        {/* Blue glow — bottom right */}
        <div
          className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(58,108,255,0.07) 0%, transparent 65%)',
          }}
        />
        {/* Horizontal accent rule */}
        <div
          className="absolute top-0 left-0 right-0 h-[1px]"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.06) 70%, transparent 100%)',
          }}
        />
      </div>

      {/* ── Content ───────────────────────────────────── */}
      <div
        ref={ref}
        className="relative max-w-6xl mx-auto px-6 py-0 lg:py-0"
      >
        {/* Section eyebrow */}
        <motion.div
          {...fade(0)}
          className="flex items-center gap-3 mb-14"
        >
          <div className="w-6 h-[1.5px] bg-[var(--blue)] rounded-full" />
          <span className="text-[0.68rem] font-semibold tracking-[0.2em] uppercase text-white/35">
            Get In Touch
          </span>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_1.15fr] gap-14 lg:gap-20 items-start">

          {/* ── Left panel ──────────────────────────── */}
          <div className="lg:sticky lg:top-24">
            <motion.h2
              {...fade(0.08)}
              className="font-serif font-bold leading-[1.08] tracking-tight text-white mb-5"
              style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)' }}
            >
              Let's Build<br />
              Something{' '}
              <span
                className="text-[var(--blue)]"
                style={{ textShadow: '0 0 48px rgba(58,108,255,0.35)' }}
              >
                Great.
              </span>
            </motion.h2>

            <motion.p
              {...fade(0.16)}
              className="text-white/45 leading-[1.8] text-[0.92rem] mb-10 max-w-xs"
            >
              Ready to transform your digital presence? We'd love to hear about
              your project.
            </motion.p>

            {/* Email card */}
            <motion.a
              {...fade(0.22)}
              href="mailto:plasticrenders@gmail.com"
              className="group flex items-center gap-4 p-4 rounded-xl border border-white/[0.07] bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/[0.14] transition-all duration-300 mb-3 no-underline"
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{
                  background: 'rgba(58,108,255,0.12)',
                  border: '1px solid rgba(58,108,255,0.22)',
                }}
              >
                <Mail size={17} style={{ color: 'var(--blue)' }} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[0.65rem] uppercase tracking-[0.14em] text-white/28 mb-0.5">
                  Drop us an email
                </p>
                <p className="text-[0.88rem] font-medium text-white truncate">
                  plasticrenders@gmail.com
                </p>
              </div>
              <ArrowRight
                size={15}
                className="flex-shrink-0 text-white/20 group-hover:text-[var(--blue)] group-hover:translate-x-1 transition-all duration-200"
              />
            </motion.a>

            {/* Social buttons */}
            <motion.div
              {...fade(0.28)}
              className="grid grid-cols-2 gap-3"
            >
              <a
                href={SOCIAL_LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2.5 px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.07] hover:bg-[#25D366]/[0.08] hover:border-[#25D366]/25 transition-all duration-300 no-underline"
              >
                <MessageCircle size={17} className="text-[#25D366]" />
                <span className="text-[0.82rem] font-medium text-white/60 group-hover:text-[#25D366] transition-colors duration-200">
                  WhatsApp
                </span>
              </a>
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2.5 px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.07] hover:bg-[#E4405F]/[0.08] hover:border-[#E4405F]/25 transition-all duration-300 no-underline"
              >
                <Instagram size={17} className="text-[#E4405F]" />
                <span className="text-[0.82rem] font-medium text-white/60 group-hover:text-[#E4405F] transition-colors duration-200">
                  Instagram
                </span>
              </a>
            </motion.div>

            {/* Decorative line */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={inView ? { opacity: 1, scaleX: 1 } : {}}
              transition={{ duration: 1, delay: 0.4 }}
              className="mt-12 origin-left h-[1px]"
              style={{
                background:
                  'linear-gradient(90deg, rgba(58,108,255,0.3) 0%, rgba(58,108,255,0.06) 50%, transparent 100%)',
              }}
            />
          </div>

          {/* ── Right panel: Form ────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div
              className="rounded-2xl p-7 lg:p-9"
              style={{
                background: 'rgba(255,255,255,0.025)',
                border: '1px solid rgba(255,255,255,0.07)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
              }}
            >
              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="flex flex-col gap-5"
              >
                {/* Row 1: Name + Email */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Your Name" required error={errors.name?.message}>
                    <input
                      {...register('name')}
                      placeholder="John Doe"
                      className={fieldInput}
                    />
                  </Field>
                  <Field label="Email Address" required error={errors.email?.message}>
                    <input
                      {...register('email')}
                      type="email"
                      placeholder="john@example.com"
                      className={fieldInput}
                    />
                  </Field>
                </div>

                {/* Row 2: Service + Subject */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Service">
                    <select
                      {...register('service')}
                      className={`${fieldInput} [&>option]:bg-[#141414]`}
                    >
                      <option value="">Select a service…</option>
                      {SERVICES_LIST.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Subject">
                    <input
                      {...register('subject')}
                      placeholder="Project brief"
                      className={fieldInput}
                    />
                  </Field>
                </div>

                {/* Message */}
                <Field label="Message" required error={errors.message?.message}>
                  <textarea
                    {...register('message')}
                    placeholder="Tell us about your project — timeline, goals, references…"
                    rows={5}
                    className={`${fieldInput} resize-y min-h-[128px]`}
                  />
                </Field>

                {/* Divider */}
                <div className="h-[1px] bg-white/[0.06] -mx-1" />

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={sending}
                  className="group relative overflow-hidden flex items-center justify-center gap-2.5 w-full py-4 rounded-xl font-semibold text-[0.9rem] text-white transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
                  style={{
                    background: 'var(--blue)',
                    boxShadow: '0 1px 0 rgba(255,255,255,0.1) inset, 0 4px 24px rgba(58,108,255,0.25)',
                  }}
                >
                  {/* Shimmer sweep */}
                  {!sending && (
                    <span
                      className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"
                      style={{
                        background:
                          'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.13) 50%, transparent 100%)',
                      }}
                    />
                  )}

                  {sending ? (
                    <>
                      <svg
                        className="w-4 h-4 animate-spin"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                      </svg>
                      Sending…
                    </>
                  ) : (
                    <>
                      Send Message
                      <ArrowRight
                        size={16}
                        className="group-hover:translate-x-1 transition-transform duration-200"
                      />
                    </>
                  )}
                </button>

                {/* Success state */}
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-3 rounded-xl p-4"
                    style={{
                      background: 'rgba(34,197,94,0.08)',
                      border: '1px solid rgba(34,197,94,0.18)',
                    }}
                  >
                    <CheckCircle
                      size={18}
                      className="text-green-400 flex-shrink-0 mt-0.5"
                    />
                    <div>
                      <p className="text-green-400 font-semibold text-sm">
                        Message sent successfully!
                      </p>
                      <p className="text-green-400/60 text-xs mt-0.5 leading-relaxed">
                        We'll get back to you within 24 hours.
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Error state */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-3 rounded-xl p-4"
                    style={{
                      background: 'rgba(239,68,68,0.08)',
                      border: '1px solid rgba(239,68,68,0.18)',
                    }}
                  >
                    <XCircle
                      size={18}
                      className="text-red-400 flex-shrink-0 mt-0.5"
                    />
                    <div>
                      <p className="text-red-400 font-semibold text-sm">
                        Failed to send message
                      </p>
                      <p className="text-red-400/60 text-xs mt-0.5 leading-relaxed">
                        Please try again or reach us at{' '}
                        <a
                          href="mailto:plasticrenders@gmail.com"
                          className="underline underline-offset-2"
                        >
                          plasticrenders@gmail.com
                        </a>
                      </p>
                    </div>
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}