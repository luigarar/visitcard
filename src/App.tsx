import { useState, useRef } from 'react';
import BusinessCard from './components/BusinessCard';
import type { CardData } from './components/BusinessCard';
import CardEditor from './components/CardEditor';
import { toPng } from 'html-to-image';
// @ts-ignore
import confetti from 'canvas-confetti';

function App() {
  const [cardData, setCardData] = useState<CardData>({
    name: 'Luis Antonio García Arroyo',
    jobTitle: 'INDUSTRIAL ENGINEER',
    company: 'García Arroyo Landing',
    email: 'luis.garcia@laga.es',
    phone: '+34 91 000 0000',
    website: 'www.laga.es',
    address: 'MADRID, SPAIN',
    photo: '',
    templateId: 0,
    theme: {
      primary: '#1A535C',
      accent: '#CCB072',
      background: '#FFFFFF',
      text: '#262626'
    },
    typography: {
      name: 'Manrope',
      title: 'Manrope',
      body: 'Manrope'
    }
  });

  const cardRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (cardRef.current === null) return;

    try {
      const dataUrl = await toPng(cardRef.current, { cacheBust: true, pixelRatio: 2 });
      const link = document.createElement('a');
      link.download = `tarjeta-${cardData.name.toLowerCase().replace(/\s+/g, '-')}.png`;
      link.href = dataUrl;
      link.click();

      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#1A535C', '#CCB072', '#F9F9F9']
      });
    } catch (err) {
      console.error('Error al generar la imagen:', err);
      alert('Hubo un error al generar la tarjeta. Por favor, intenta de nuevo.');
    }
  };

  return (
    <div className="flex h-screen bg-bg-light overflow-hidden font-sans">
      {/* Sidebar Editor */}
      <div className="w-1/3 min-w-[400px]">
        <CardEditor
          data={cardData}
          onChange={setCardData}
          onDownload={handleDownload}
        />
      </div>

      {/* Main Preview Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-12 bg-surface/50 relative">
        <div className="absolute top-8 left-8">
          <h1 className="text-3xl font-black text-primary tracking-tighter">VisitCard<span className="text-accent">.</span></h1>
        </div>

        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-primary mb-3">Tu Tarjeta Digital</h2>
          <p className="text-text-main/50 max-w-md mx-auto">
            Personaliza cada detalle y exporta tu tarjeta de visita con un diseño profesional y espectacular.
          </p>
        </div>

        <BusinessCard data={cardData} cardRef={cardRef} />

        <div className="mt-12 flex gap-8 items-center text-primary/40">
          <div className="flex flex-col items-center gap-1">
            <div className="w-1 h-1 rounded-full bg-accent" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Premium Design</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-1 h-1 rounded-full bg-accent" />
            <span className="text-[10px] font-bold uppercase tracking-widest">High Resolution</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-1 h-1 rounded-full bg-accent" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Modern Layout</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
