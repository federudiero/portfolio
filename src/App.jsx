import Header from './components/sections/Header';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Projects from './components/sections/Projects';
import Stack from './components/sections/Stack';
import Contact from './components/sections/Contact';
import Footer from './components/sections/Footer';
import { PROFILE } from './config/profile';
import { useGithubPortfolio } from './hooks/useGithubPortfolio';
import { useScrollAnimations } from './hooks/useScrollAnimations';

function App() {
  const github = useGithubPortfolio(PROFILE.githubUsername);
  useScrollAnimations();

  return (
    <div className="app-shell">
      <div className="scroll-progress" aria-hidden="true"><span /></div>
      <Header />
      <main>
        <Hero githubProfile={github.profile} />
        <About />
        <Projects repositories={github.repositories} />
        <Stack />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
