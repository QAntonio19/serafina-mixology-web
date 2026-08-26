import { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { EASE, rise, riseParent, inView } from '../lib/motion';
import { Display, Label, Reveal, Shell, solidCls, outlineCls } from './ui';

export default function Talleres() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const reduce = useReducedMotion();

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <section id="talleres" aria-label="Talleres de mixología" className="bg-tile py-20 md:py-32">
      <Shell>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left: Content and Features */}
          <div className="lg:col-span-6">
            <Reveal>
              <motion.div variants={rise}>
                <Label className="mb-3 text-ink-faint">Team Building & Experiencias</Label>
                <Display className="max-w-[16ch] text-ink">
                  Talleres de mixología para equipos
                </Display>
              </motion.div>

              <motion.p
                variants={rise}
                className="mt-6 max-w-[44ch] text-[0.95rem] leading-relaxed text-ink-muted"
              >
                Una experiencia interactiva donde sus invitados o equipo de trabajo aprenden las
                técnicas reales de la coctelería de autor: balance de sabores, uso correcto de
                herramientas, macerados y preparación de sus propios tragos.
              </motion.p>

              <motion.div
                variants={riseParent(0.1, 0.1)}
                className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2"
              >
                <div className="border border-ink/10 bg-paper p-5">
                  <span className="label text-ink">01 / Herramientas</span>
                  <p className="mt-2 text-[0.82rem] leading-relaxed text-ink-muted">
                    Llevamos shakers, jiggers, coladores y cristalería completa para cada participante.
                  </p>
                </div>
                <div className="border border-ink/10 bg-paper p-5">
                  <span className="label text-ink">02 / Dinámica activa</span>
                  <p className="mt-2 text-[0.82rem] leading-relaxed text-ink-muted">
                    Ideal para integraciones corporativas, cumpleaños y celebraciones privadas.
                  </p>
                </div>
              </motion.div>

              <motion.div variants={rise} className="mt-10 flex flex-wrap items-center gap-4">
                <a href="#cotizar" className={`${solidCls} h-11 px-7`}>
                  Cotizar taller
                </a>
                <a
                  href="https://www.instagram.com/serafinamixology/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${outlineCls} h-11 px-6`}
                >
                  Ver más en Instagram ↗
                </a>
              </motion.div>
            </Reveal>
          </div>

          {/* Right: Video Reel Player */}
          <div className="lg:col-span-6">
            <motion.div
              initial={reduce ? false : { opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={inView}
              transition={{ duration: 0.8, ease: EASE }}
              className="group relative mx-auto max-w-[420px] overflow-hidden bg-black shadow-2xl"
            >
              {/* Video Tag */}
              <video
                ref={videoRef}
                src="/videos/taller-gastroequipos.mp4"
                poster="/fotos/taller.jpg"
                autoPlay
                loop
                muted={isMuted}
                playsInline
                className="aspect-[9/16] w-full object-cover"
              />

              {/* Small transport controls, bottom-right corner. */}
              <div className="absolute bottom-3 right-3 flex items-center gap-2">
                <button
                  type="button"
                  onClick={togglePlay}
                  aria-label={isPlaying ? 'Pausar video' : 'Reproducir video'}
                  className="flex h-8 w-8 items-center justify-center bg-black/55 text-white backdrop-blur-md transition-colors hover:bg-black/70"
                >
                  <span className="text-[0.65rem] leading-none">{isPlaying ? '❚❚' : '▶'}</span>
                </button>
                <button
                  type="button"
                  onClick={toggleMute}
                  aria-label={isMuted ? 'Activar sonido' : 'Silenciar sonido'}
                  className="flex h-8 w-8 items-center justify-center bg-black/55 text-white backdrop-blur-md transition-colors hover:bg-black/70"
                >
                  <span className="text-[0.65rem] leading-none">{isMuted ? '🔇' : '🔊'}</span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </Shell>
    </section>
  );
}
