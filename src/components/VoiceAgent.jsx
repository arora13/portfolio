import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMicrophone, FaTimes, FaRobot, FaStop, FaPaperPlane } from 'react-icons/fa';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

const INITIAL_MESSAGE = {
  role: 'assistant',
  content: "Hey! I'm Arjun's AI. Ask me anything about his projects, skills, or background!",
};

const VoiceAgent = () => {
  const [isOpen, setIsOpen] = useState(false);
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
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const el = messagesContainerRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages, isProcessing, isOpen]);

  const stopSpeaking = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    window.speechSynthesis?.cancel();
    setIsSpeaking(false);
  }, []);

  const speak = useCallback(async (text) => {
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
      // browser TTS fallback
      if (!window.speechSynthesis) return;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.05;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  }, [stopSpeaking]);

  const sendMessage = useCallback(
    async (text) => {
      if (!text.trim() || isProcessing) return;
      setTranscript('');
      setTextInput('');
      setIsProcessing(true);
      setError('');

      const userMsg = { role: 'user', content: text.trim() };
      setMessages((prev) => [...prev, userMsg]);

      try {
        const history = messages.slice(-10).map((m) => ({ role: m.role, content: m.content }));
        const res = await fetch(`${BACKEND_URL}/api/chat`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: text.trim(), history }),
        });
        if (!res.ok) throw new Error('Bad response');
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

  // Keep ref current so speech recognition callbacks always call the latest version
  useEffect(() => {
    sendMessageRef.current = sendMessage;
  }, [sendMessage]);

  // Set up speech recognition once
  useEffect(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      setSpeechSupported(false);
      return;
    }
    const recognition = new SR();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      const result = event.results[event.results.length - 1];
      setTranscript(result[0].transcript);
      if (result.isFinal) {
        sendMessageRef.current?.(result[0].transcript);
      }
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

  const handleTextSubmit = (e) => {
    e.preventDefault();
    sendMessage(textInput);
  };

  const statusLabel = isProcessing
    ? 'Thinking…'
    : isListening
      ? 'Listening…'
      : isSpeaking
        ? 'Speaking…'
        : speechSupported
          ? 'Press mic or type below'
          : 'Type a message below';

  return (
    <>
      {/* Floating trigger button */}
      <motion.button
        onClick={() => setIsOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-[9990] w-14 h-14 rounded-full bg-[var(--accent)] text-[var(--bg)] border border-[var(--border)] shadow-lg flex items-center justify-center"
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        aria-label={isOpen ? 'Close voice assistant' : 'Open voice assistant'}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <FaTimes size={20} />
            </motion.span>
          ) : (
            <motion.span key="robot" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <FaRobot size={22} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            className="fixed bottom-24 right-6 z-[9990] w-80 sm:w-96 bg-[var(--panel)] border border-[var(--border)] rounded-xl shadow-2xl flex flex-col overflow-hidden"
            style={{ maxHeight: '72vh' }}
          >
            {/* Header */}
            <div className="bg-[var(--bg-elevated)] px-4 py-3 flex items-center gap-2 border-b border-[var(--border)] shrink-0">
              <FaRobot className="text-[var(--accent)] shrink-0" size={16} />
              <span className="text-[var(--fg)] font-bold text-sm font-mono uppercase tracking-wide">Chat — AI</span>
              {isSpeaking && (
                <button
                  onClick={stopSpeaking}
                  className="ml-auto text-[var(--muted)] hover:text-[var(--accent)] text-xs underline"
                >
                  Stop
                </button>
              )}
            </div>

            <div ref={messagesContainerRef} className="flex-1 overflow-y-auto p-3 space-y-2.5">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[85%] px-3 py-2 rounded-md text-sm border border-[var(--border)] leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-[var(--accent)] text-[var(--bg)]'
                        : 'bg-[var(--bg)] text-[var(--fg)]'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {isProcessing && (
                <div className="flex justify-start">
                  <div className="px-3 py-2 rounded-md text-sm border border-[var(--border)] bg-[var(--bg)] text-[var(--muted)] flex gap-1 items-center">
                    <span className="animate-pulse">●</span>
                    <span className="animate-pulse delay-150">●</span>
                    <span className="animate-pulse delay-300">●</span>
                  </div>
                </div>
              )}

              {error && <p className="text-xs text-red-500 text-center px-2">{error}</p>}
            </div>

            {/* Live transcript preview */}
            {transcript && (
              <div className="px-3 py-1.5 bg-[var(--bg-elevated)] border-t border-[var(--border)] text-xs text-[var(--muted)] italic shrink-0">
                &ldquo;{transcript}&rdquo;
              </div>
            )}

            {/* Controls */}
            <div className="p-3 border-t border-[var(--border)] bg-[var(--bg-elevated)] shrink-0 space-y-2">
              {/* Status + mic */}
              <div className="flex items-center gap-3">
                {speechSupported && (
                  <motion.button
                    onClick={toggleListening}
                    disabled={isProcessing}
                    whileTap={{ scale: 0.93 }}
                    className={`w-11 h-11 shrink-0 rounded-full border border-[var(--border)] flex items-center justify-center transition-colors disabled:opacity-40 ${
                      isListening ? 'bg-red-600 text-white animate-pulse' : 'bg-[var(--accent)] text-[var(--bg)]'
                    }`}
                    aria-label={isListening ? 'Stop recording' : 'Start recording'}
                  >
                    {isListening ? <FaStop size={14} /> : <FaMicrophone size={16} />}
                  </motion.button>
                )}
                <p className="text-xs text-[var(--muted)] flex-1">{statusLabel}</p>
              </div>

              {/* Text input */}
              <form onSubmit={handleTextSubmit} className="flex gap-2">
                <input
                  type="text"
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  placeholder="Or type a message…"
                  disabled={isProcessing}
                  className="flex-1 text-xs px-3 py-2 rounded-md border border-[var(--border)] bg-[var(--bg)] text-[var(--fg)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--accent)] disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={isProcessing || !textInput.trim()}
                  className="w-9 h-9 rounded-md border border-[var(--border)] bg-[var(--accent)] text-[var(--bg)] flex items-center justify-center disabled:opacity-40"
                  aria-label="Send message"
                >
                  <FaPaperPlane size={12} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default VoiceAgent;
