import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import ContactCanvas from './ContactCanvas';

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
    'w-full rounded-lg border border-gray-600 bg-gray-950/80 px-4 py-3 text-white placeholder:text-gray-500 outline-none transition ' +
    'focus:border-cyan-500/80 focus:ring-2 focus:ring-cyan-500/25';

  return (
    <section
      id="contact"
      className="relative bg-black text-white px-6 py-16 sm:py-20 overflow-hidden"
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-purple-700/40 via-indigo-600/30 to-cyan-500/30 blur-3xl opacity-40" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-center mb-4">Get in touch</h2>
        <p className="text-center text-gray-400 text-sm sm:text-base max-w-xl mx-auto mb-10 sm:mb-12">
          Have a project in mind or want to connect? Send a message and I will get back to you.
        </p>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 items-stretch">
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="flex-1 flex flex-col gap-5 min-w-0"
          >
            <div>
              <label htmlFor="contact-name" className="block text-sm font-medium text-gray-300 mb-2">
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
              <label htmlFor="contact-email" className="block text-sm font-medium text-gray-300 mb-2">
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
              <label htmlFor="contact-message" className="block text-sm font-medium text-gray-300 mb-2">
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
              className="mt-1 rounded-lg bg-cyan-500 px-5 py-3 text-sm font-semibold text-black transition hover:bg-cyan-400 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Sending…' : 'Send message'}
            </button>
          </form>

          <div className="flex-1 w-full h-[300px] sm:h-[340px] lg:h-[420px] rounded-xl border border-gray-800/80 bg-gray-950/40 overflow-hidden">
            <ContactCanvas />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
