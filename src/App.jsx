import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Contact from "./components/Contact";
import Projects from "./components/Projects";
import ConversationSection from "./components/ConversationSection";
import VoiceAgent from "./components/VoiceAgent";

const App = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <ConversationSection />
      <Contact />
      <VoiceAgent />
    </>
  );
};

export default App;
