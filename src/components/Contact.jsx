import React, { useRef, useState } from 'react';
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

    emailjs.send(
      'service_jefuiqc',
      'template_im0iymy',
      {
        name: form.name,
        email: form.email,
        message: form.message,
        title: "New Contact Form Submission"
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

  return (
    <section id="contact" style={{ display: 'flex', flexDirection: 'row', padding: '2rem', backgroundColor: 'black', color: 'white' }}>
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}
      >
        <label>Your Name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          style={{ padding: '0.5rem', borderRadius: '5px', backgroundColor: '#1a1a1a', color: 'white', border: '1px solid white' }}
        />

        <label>Your Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          style={{ padding: '0.5rem', borderRadius: '5px', backgroundColor: '#1a1a1a', color: 'white', border: '1px solid white' }}
        />

        <label>Your Message</label>
        <textarea
          rows="5"
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          style={{ padding: '0.5rem', borderRadius: '5px', backgroundColor: '#1a1a1a', color: 'white', border: '1px solid white' }}
        />

        <button
          type="submit"
          style={{ backgroundColor: '#6c63ff', color: 'white', padding: '0.75rem', borderRadius: '5px' }}
        >
          {loading ? 'Sending...' : 'Send'}
        </button>
      </form>

      <div style={{ flex: 1, height: '500px', marginLeft: '2rem' }}>
        <ContactCanvas />
       </div>
    </section>
  );
};

export default Contact;

