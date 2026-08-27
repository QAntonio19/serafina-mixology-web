import Band from './components/Band';
import Carta from './components/Carta';
import Cobertura from './components/Cobertura';
import Cotizar from './components/Cotizar';
import Eventos from './components/Eventos';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Nav from './components/Nav';
import Resenas from './components/Resenas';
import Servicio from './components/Servicio';
import Talleres from './components/Talleres';
import Wordmark from './components/Wordmark';

export default function App() {
  return (
    <div className="min-h-[100svh] bg-paper">
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-5 focus:py-3 focus:text-[0.8rem] focus:text-paper"
      >
        Saltar al contenido
      </a>

      <Nav />
      <Hero />

      <main id="contenido">
        <Carta />
        <Servicio />
        <Band />
        <Eventos />
        <Talleres />
        <Resenas />
        <Cobertura />
        <Cotizar />
      </main>

      <Wordmark />
      <Footer />
    </div>
  );
}
