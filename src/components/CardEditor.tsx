import React from 'react';
import type { CardData } from './BusinessCard';
import { Camera, ChevronLeft, ChevronRight, Palette, Type } from 'lucide-react';

interface CardEditorProps {
    data: CardData;
    onChange: (data: CardData) => void;
    onDownload: () => void;
}

const fonts = ['Manrope', 'Inter', 'Roboto', 'Playfair Display', 'Space Mono', 'Outfit'];
const themes = [
    { name: 'Stitch Classic', primary: '#1A535C', accent: '#CCB072', background: '#FFFFFF', text: '#262626' },
    { name: 'Midnight Gold', primary: '#0F172A', accent: '#EAB308', background: '#020617', text: '#F8FAFC' },
    { name: 'Modern Rose', primary: '#881337', accent: '#FB7185', background: '#FFF1F2', text: '#4C0519' },
    { name: 'Deep Sea', primary: '#1E3A8A', accent: '#38BDF8', background: '#F0F9FF', text: '#1E3A8A' },
    { name: 'Eco Forest', primary: '#064E3B', accent: '#34D399', background: '#F0FDF4', text: '#064E3B' },
];

const CardEditor: React.FC<CardEditorProps> = ({ data, onChange, onDownload }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        onChange({ ...data, [name]: value });
    };

    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                onChange({ ...data, photo: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    };

    const updateTheme = (theme: typeof themes[0]) => {
        onChange({ ...data, theme });
    };

    const updateFont = (key: keyof CardData['typography'], font: string) => {
        onChange({
            ...data,
            typography: { ...data.typography, [key]: font }
        });
    };

    const nextTemplate = () => onChange({ ...data, templateId: (data.templateId + 1) % 40 });
    const prevTemplate = () => onChange({ ...data, templateId: (data.templateId - 1 + 40) % 40 });

    return (
        <div className="p-8 bg-white h-full border-r border-surface overflow-y-auto custom-scrollbar">
            <div className="mb-8">
                <h2 className="text-2xl font-black text-primary mb-2 tracking-tighter">Personaliza tu Diseño</h2>
                <div className="flex items-center gap-4 bg-surface p-4 rounded-xl">
                    <button onClick={prevTemplate} className="p-2 hover:bg-white rounded-lg transition-colors"><ChevronLeft size={20} /></button>
                    <div className="flex-1 text-center">
                        <span className="text-xs font-bold uppercase tracking-widest opacity-40 block">Modelo</span>
                        <span className="text-sm font-black text-primary">{data.templateId + 1} de 40</span>
                    </div>
                    <button onClick={nextTemplate} className="p-2 hover:bg-white rounded-lg transition-colors"><ChevronRight size={20} /></button>
                </div>
            </div>

            <div className="space-y-8">
                {/* Photo Upload */}
                <section>
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-primary/40 mb-4">Fotografía</label>
                    <div className="flex gap-4 items-center">
                        <div className="w-20 h-20 bg-surface rounded-xl overflow-hidden flex items-center justify-center border-2 border-dashed border-primary/10">
                            {data.photo ? (
                                <img src={data.photo} className="w-full h-full object-cover" />
                            ) : (
                                <Camera size={24} className="opacity-20" />
                            )}
                        </div>
                        <label className="flex-1">
                            <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                            <div className="bg-surface hover:bg-primary/5 text-primary text-xs font-bold py-3 px-4 rounded-xl cursor-pointer transition-all text-center">
                                Subir Foto
                            </div>
                        </label>
                        {data.photo && (
                            <button onClick={() => onChange({ ...data, photo: '' })} className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors">
                                <span className="text-xs font-bold">Quitar</span>
                            </button>
                        )}
                    </div>
                </section>

                {/* Identity */}
                <section className="space-y-4">
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-primary/40">Datos Personales</label>
                    <input type="text" name="name" value={data.name} onChange={handleChange} placeholder="Nombre" className="w-full px-4 py-3 bg-surface rounded-xl focus:ring-2 focus:ring-primary/10 transition-all text-sm font-semibold border-none" />
                    <input type="text" name="jobTitle" value={data.jobTitle} onChange={handleChange} placeholder="Título" className="w-full px-4 py-3 bg-surface rounded-xl focus:ring-2 focus:ring-primary/10 transition-all text-sm font-semibold border-none" />
                    <input type="text" name="company" value={data.company} onChange={handleChange} placeholder="Empresa" className="w-full px-4 py-3 bg-surface rounded-xl focus:ring-2 focus:ring-primary/10 transition-all text-sm font-semibold border-none" />
                </section>

                {/* Colors */}
                <section>
                    <div className="flex items-center gap-2 mb-4">
                        <Palette size={14} className="text-primary/40" />
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/40">Paleta de Colores</label>
                    </div>
                    <div className="grid grid-cols-5 gap-2">
                        {themes.map((t, i) => (
                            <button
                                key={i}
                                onClick={() => updateTheme(t)}
                                className={`w-full aspect-square rounded-lg border-2 transition-all p-1 ${JSON.stringify(data.theme) === JSON.stringify(t) ? 'border-primary' : 'border-transparent'}`}
                            >
                                <div className="w-full h-full rounded-md flex overflow-hidden shadow-sm">
                                    <div className="w-1/2 h-full" style={{ backgroundColor: t.primary }} />
                                    <div className="w-1/2 h-full" style={{ backgroundColor: t.accent }} />
                                </div>
                            </button>
                        ))}
                    </div>
                </section>

                {/* Typography */}
                <section className="space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                        <Type size={14} className="text-primary/40" />
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/40">Tipografías</label>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[9px] font-bold uppercase opacity-40">Nombre</label>
                        <select
                            value={data.typography.name}
                            onChange={(e) => updateFont('name', e.target.value)}
                            className="w-full px-4 py-3 bg-surface rounded-xl text-sm font-semibold border-none outline-none focus:ring-2 focus:ring-primary/10"
                        >
                            {fonts.map(f => <option key={f} value={f}>{f}</option>)}
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[9px] font-bold uppercase opacity-40">Cargos y Títulos</label>
                        <select
                            value={data.typography.title}
                            onChange={(e) => updateFont('title', e.target.value)}
                            className="w-full px-4 py-3 bg-surface rounded-xl text-sm font-semibold border-none outline-none focus:ring-2 focus:ring-primary/10"
                        >
                            {fonts.map(f => <option key={f} value={f}>{f}</option>)}
                        </select>
                    </div>
                </section>

                {/* Contact */}
                <section className="space-y-4">
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-primary/40">Contacto</label>
                    <input type="text" name="email" value={data.email} onChange={handleChange} placeholder="Email" className="w-full px-4 py-3 bg-surface rounded-xl focus:ring-2 focus:ring-primary/10 transition-all text-sm border-none" />
                    <input type="text" name="phone" value={data.phone} onChange={handleChange} placeholder="Teléfono" className="w-full px-4 py-3 bg-surface rounded-xl focus:ring-2 focus:ring-primary/10 transition-all text-sm border-none" />
                    <input type="text" name="website" value={data.website} onChange={handleChange} placeholder="Web" className="w-full px-4 py-3 bg-surface rounded-xl focus:ring-2 focus:ring-primary/10 transition-all text-sm border-none" />
                    <input type="text" name="address" value={data.address} onChange={handleChange} placeholder="Dirección" className="w-full px-4 py-3 bg-surface rounded-xl focus:ring-2 focus:ring-primary/10 transition-all text-sm border-none" />
                </section>

                <button
                    onClick={onDownload}
                    className="w-full bg-primary hover:bg-primary/90 text-white font-black py-4 rounded-2xl shadow-xl shadow-primary/20 transition-all active:scale-95 flex items-center justify-center gap-2 mt-8 text-sm uppercase tracking-widest"
                    style={{ backgroundColor: data.theme.primary }}
                >
                    Descargar Tarjeta
                </button>
            </div>
        </div>
    );
};

export default CardEditor;
