import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FaMicrophone, FaStop, FaPaperPlane, FaRobot } from 'react-icons/fa';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

const INITIAL_MESSAGE = {
  role: 'assistant',
  content: "Hey! I'm Arjun's AI. Ask me anything — projects, skills, background, or whatever's on your mind.",
};

const EXAMPLE_QUESTIONS = [
  'What are you currently building?',
  "What's your tech stack?",
  'Tell me about your background',
  'What are your goals?',
];

const ConversationSection = () => {
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [textInput, setTextInput] = useState('');
  const [error, setError] = useState('');
  const [speechSupported, setSpeechSupported] = useState(true);

  const recognitionRef = useRef(null);
  const audioRef = useRef(null);
  const sendMessageRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isProcessing]);

  const stopSpeaking = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    window.speechSynthesis?.cancel();
    setIsSpeaking(false);
  }, []);

  const speak = useCallback(
    async (text) => {
      stopSpeaking();
      try {
        const res = await fetch(`${BACKEND_URL}/api/tts`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text }),
        });
        if (!res.ok) throw new Error('TTS error');
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const audio = new Audio(url);
        audioRef.current = audio;
        setIsSpeaking(true);
        audio.onended = () => {
          setIsSpeaking(false);
          URL.revokeObjectURL(url);
          if (audioRef.current === audio) audioRef.current = null;
        };
        audio.onerror = () => {
          setIsSpeaking(false);
          URL.revokeObjectURL(url);
          if (audioRef.current === audio) audioRef.current = null;
        };
        await audio.play();
      } catch {
        if (!window.speechSynthesis) return;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.05;
        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);
        window.speechSynthesis.speak(utterance);
      }
    },
    [stopSpeaking],
  );

  const sendMessage = useCallback(
    async (text) => {
      if (!text.trim() || isProcessing) return;
      setTranscript('');
      setTextInput('');
      setIsProcessing(true);
      setError('');
      setMessages((prev) => [...prev, { role: 'user', content: text.trim() }]);
      try {
        const history = messages.slice(-10).map((m) => ({ role: m.role, content: m.content }));
        const res = await fetch(`${BACKEND_URL}/api/chat`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: text.trim(), history }),
        });
        if (!res.ok) throw new Error('Chat error');
        const data = await res.json();
        setMessages((prev) => [...prev, { role: 'assistant', content: data.response }]);
        speak(data.response);
      } catch {
        setError('Could not reach the AI backend. Is it running?');
      } finally {
        setIsProcessing(false);
      }
    },
    [messages, isProcessing, speak],
  );

  useEffect(() => {
    sendMessageRef.current = sendMessage;
  }, [sendMessage]);

  useEffect(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { setSpeechSupported(false); return; }
    const recognition = new SR();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';
    recognition.onresult = (event) => {
      const result = event.results[event.results.length - 1];
      setTranscript(result[0].transcript);
      if (result.isFinal) sendMessageRef.current?.(result[0].transcript);
    };
    recognition.onend = () => setIsListening(false);
    recognition.onerror = (event) => {
      setIsListening(false);
      if (event.error !== 'aborted') setError(`Mic error: ${event.error}`);
    };
    recognitionRef.current = recognition;
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current || isProcessing) return;
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      stopSpeaking();
      setError('');
      setTranscript('');
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const statusLabel = isProcessing
    ? 'Thinking…'
    : isListening
      ? 'Listening…'
      : isSpeaking
        ? 'Speaking…'
        : speechSupported
          ? 'Press mic to speak, or type below'
          : 'Type a message below';

  return (
    <section
      id="conversation"
      className="comic-dot-bg relative w-full bg-gradient-to-b from-blue-50 via-white to-cyan-50 text-slate-900 px-6 pt-20 pb-24 overflow-hidden"
    >
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

        {/* Left — intro */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <span className="inline-flex items-center gap-2 rounded-md border-[3px] border-slate-900 bg-white px-3 py-1 text-xs font-black uppercase tracking-wider text-blue-700 shadow-[3px_3px_0_#2563eb]">
            <FaRobot size={11} /> AI-Powered
          </span>

          <h2 className="text-4xl sm:text-5xl font-black leading-tight text-blue-800 [text-shadow:2px_2px_0_#bfdbfe]">
            Have a conversation<br />with Arjun
          </h2>

          <p className="text-lg text-slate-600 leading-relaxed max-w-md">
            Ask anything — about my projects, tech stack, background, or goals. The AI knows my full story and responds as me.
          </p>

          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Try asking…</p>
            <div className="flex flex-wrap gap-2">
              {EXAMPLE_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  disabled={isProcessing}
                  className="rounded-lg border-[2px] border-slate-900 bg-white px-3 py-1.5 text-sm text-slate-700 shadow-[2px_2px_0_#93c5fd] hover:bg-blue-50 hover:border-blue-500 transition-colors disabled:opacity-50"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right — chat card */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="comic-card bg-white flex flex-col overflow-hidden"
          style={{ minHeight: '420px', maxHeight: '540px' }}
        >
          {/* Chat header */}
          <div className="bg-blue-600 px-4 py-3 flex items-center gap-2 border-b-[3px] border-slate-900 shrink-0">
            <FaRobot className="text-white shrink-0" size={15} />
            <span className="text-white font-bold text-sm">Arjun&apos;s AI</span>
            <span className={`ml-2 w-2 h-2 rounded-full ${isSpeaking ? 'bg-green-300 animate-pulse' : 'bg-white/40'}`} />
            {isSpeaking && (
              <button onClick={stopSpeaking} className="ml-auto text-white/80 hover:text-white text-xs underline">
                Stop
              </button>
            )}
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[82%] px-3 py-2 rounded-lg text-sm border-[2px] border-slate-900 leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-blue-600 text-white shadow-[2px_2px_0_#1e3a5f]'
                      : 'bg-white text-slate-800 shadow-[2px_2px_0_#93c5fd]'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {isProcessing && (
              <div className="flex justify-start">
                <div className="px-3 py-2 rounded-lg text-sm border-[2px] border-slate-900 bg-white text-slate-400 shadow-[2px_2px_0_#93c5fd] flex gap-1 items-center">
                  <span className="animate-pulse">●</span>
                  <span className="animate-pulse [animation-delay:150ms]">●</span>
                  <span className="animate-pulse [animation-delay:300ms]">●</span>
                </div>
              </div>
            )}

            {error && <p className="text-xs text-red-500 text-center">{error}</p>}
            <div ref={messagesEndRef} />
          </div>

          {/* Transcript preview */}
          {transcript && (
            <div className="px-4 py-1.5 bg-blue-50 border-t border-blue-100 text-xs text-blue-700 italic shrink-0">
              &ldquo;{transcript}&rdquo;
            </div>
          )}

          {/* Controls */}
          <div className="p-3 border-t-[3px] border-slate-900 bg-gray-50 shrink-0 space-y-2">
            <div className="flex items-center gap-3">
              {speechSupported && (
                <motion.button
                  onClick={toggleListening}
                  disabled={isProcessing}
                  whileTap={{ scale: 0.93 }}
                  className={`w-11 h-11 shrink-0 rounded-full border-[3px] border-slate-900 flex items-center justify-center transition-colors disabled:opacity-40 ${
                    isListening
                      ? 'bg-red-500 text-white shadow-[3px_3px_0_#7f1d1d] animate-pulse'
                      : 'bg-blue-600 text-white shadow-[3px_3px_0_#1e293b]'
                  }`}
                  aria-label={isListening ? 'Stop recording' : 'Start recording'}
                >
                  {isListening ? <FaStop size={14} /> : <FaMicrophone size={16} />}
                </motion.button>
              )}
              <p className="text-xs text-slate-500 flex-1">{statusLabel}</p>
            </div>

            <form
              onSubmit={(e) => { e.preventDefault(); sendMessage(textInput); }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="Or type a message…"
                disabled={isProcessing}
                className="flex-1 text-xs px-3 py-2 rounded-lg border-[2px] border-slate-900 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isProcessing || !textInput.trim()}
                className="w-9 h-9 rounded-lg border-[2px] border-slate-900 bg-blue-600 text-white flex items-center justify-center shadow-[2px_2px_0_#1e293b] disabled:opacity-40"
                aria-label="Send message"
              >
                <FaPaperPlane size={12} />
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ConversationSection;
