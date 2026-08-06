import Hero from '@/components/Hero';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import Education from '@/components/Education';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Contact from '@/app/contact/page';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Skills />
      <Experience />
      <Education />
      <Contact />
      <Footer />
    </main>
  );
}