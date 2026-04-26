import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Suspense } from 'react';

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
          <meshStandardMaterial color="#2563eb" emissive="#60a5fa" metalness={0.45} roughness={0.35} />
        </mesh>
      ))}
    </group>
  );
};

const Contact = () => {
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
    'w-full rounded-lg border-2 border-blue-200 bg-white px-4 py-3 text-slate-800 placeholder:text-slate-400 outline-none transition ' +
    'focus:border-blue-500/80 focus:ring-2 focus:ring-blue-500/25';

  return (
    <section
      id="contact"
      className="comic-dot-bg relative bg-gradient-to-b from-blue-50 via-white to-cyan-100 text-slate-900 px-6 py-16 sm:py-20 overflow-hidden"
    >

      <div className="relative z-10 max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-blue-800 text-center mb-4 [text-shadow:2px_2px_0_#bfdbfe]">Get in touch</h2>
        <p className="text-center text-slate-600 text-sm sm:text-base max-w-xl mx-auto mb-10 sm:mb-12">
          Have a project in mind or want to connect? Send a message and I will get back to you.
        </p>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 items-stretch">
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="flex-1 flex flex-col gap-5 min-w-0"
          >
            <div>
              <label htmlFor="contact-name" className="block text-sm font-medium text-blue-800 mb-2">
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
              <label htmlFor="contact-email" className="block text-sm font-medium text-blue-800 mb-2">
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
              <label htmlFor="contact-message" className="block text-sm font-medium text-blue-800 mb-2">
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
              className="mt-1 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Sending…' : 'Send message'}
            </button>
          </form>

          <div className="comic-card flex-1 w-full h-[300px] sm:h-[340px] lg:h-[420px] bg-white/85 overflow-hidden">
            <Canvas camera={{ position: [0, 0, 7] }}>
              <ambientLight intensity={1.2} />
              <directionalLight position={[0, 5, 5]} intensity={1.5} />
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
