import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Suspense } from 'react';
import BinaryBackdrop from './BinaryBackdrop';
import { useTheme } from '../theme/ThemeProvider.jsx';

const AShape = () => {
  const groupRef = useRef();

  useFrame(() => {
    if (groupRef.current) groupRef.current.rotation.y += 0.01;
  });

  const points = [
    [-1.2, -1.5], [-0.9, -0.5], [-0.6, 0.5], [-0.3, 1.3],
    [0, 1.7], [0.3, 1.3], [0.6, 0.5], [0.9, -0.5], [1.2, -1.5],
    [-0.6, 0], [-0.3, 0], [0, 0], [0.3, 0], [0.6, 0],
  ];

  return (
    <group ref={groupRef}>
      {points.map(([x, y], i) => (
        <mesh key={i} position={[x * 1.5, y * 1.5, 0]}>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshStandardMaterial color="#22d3ee" emissive="#0891b2" emissiveIntensity={0.35} metalness={0.5} roughness={0.35} />
        </mesh>
      ))}
    </group>
  );
};

const Contact = () => {
  const { theme } = useTheme();
  const formRef = useRef();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        'service_jefuiqc',
        'template_im0iymy',
        {
          name: form.name,
          email: form.email,
          message: form.message,
          title: 'New Contact Form Submission',
        },
        'fpBEyn4vUunHjXm41'
      )
      .then(() => {
        setLoading(false);
        alert('Message sent successfully!');
        setForm({ name: '', email: '', message: '' });
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
        alert('Something went wrong. Try again.');
      });
  };

  const inputClass =
    'w-full border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-[var(--fg)] placeholder:text-[var(--muted)] outline-none transition ' +
    'focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]';

  return (
    <section
      id="contact"
      className="relative border-t border-[var(--border)] bg-[var(--bg)] text-[var(--fg)] px-6 py-20 sm:py-28 overflow-hidden"
    >
      <BinaryBackdrop className="opacity-30" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <p className="font-mono text-xs uppercase tracking-[0.35em] text-[var(--accent)] mb-4 text-center">Contact</p>
        <h2 className="font-display text-4xl sm:text-5xl font-bold text-center mb-4 tracking-tight">Get in touch</h2>
        <p className="text-center text-[var(--muted)] text-sm max-w-xl mx-auto mb-12">
          Have a project in mind or want to connect? Send a message and I will get back to you.
        </p>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 items-stretch">
          <form ref={formRef} onSubmit={handleSubmit} className="flex-1 flex flex-col gap-5 min-w-0">
            <div>
              <label htmlFor="contact-name" className="block text-xs font-mono uppercase tracking-wider text-[var(--muted)] mb-2">
                Name
              </label>
              <input
                id="contact-name"
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                autoComplete="name"
                className={inputClass}
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="contact-email" className="block text-xs font-mono uppercase tracking-wider text-[var(--muted)] mb-2">
                Email
              </label>
              <input
                id="contact-email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                autoComplete="email"
                className={inputClass}
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="contact-message" className="block text-xs font-mono uppercase tracking-wider text-[var(--muted)] mb-2">
                Message
              </label>
              <textarea
                id="contact-message"
                rows={5}
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                className={`${inputClass} resize-y min-h-[120px]`}
                placeholder="What would you like to say?"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-1 w-fit font-mono text-xs uppercase tracking-[0.2em] border border-[var(--accent)] text-[var(--fg)] px-6 py-3 hover:bg-[var(--accent)] hover:text-[var(--bg)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Sending…' : 'Send message'}
            </button>
          </form>

          <div className="comic-card flex-1 w-full h-[300px] sm:h-[340px] lg:h-[420px] overflow-hidden bg-[var(--panel)]">
            <Canvas camera={{ position: [0, 0, 7] }}>
              <color attach="background" args={[theme === 'dark' ? '#0a0a0a' : '#f0f0f0']} />
              <ambientLight intensity={0.8} />
              <directionalLight position={[0, 5, 5]} intensity={1.4} />
              <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
              <Suspense fallback={null}>
                <AShape />
              </Suspense>
            </Canvas>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
