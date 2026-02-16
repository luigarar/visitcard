import React from 'react';
import type { CardData } from './BusinessCard';

interface CardEditorProps {
    data: CardData;
    onChange: (data: CardData) => void;
    onDownload: () => void;
}

const CardEditor: React.FC<CardEditorProps> = ({ data, onChange, onDownload }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        onChange({ ...data, [name]: value });
    };

    return (
        <div className="p-8 bg-white h-full border-r border-surface overflow-y-auto">
            <div className="mb-8">
                <h2 className="text-2xl font-extrabold text-primary mb-2">Diseña tu Tarjeta</h2>
                <p className="text-sm text-text-main/60">Basado en el diseño premium de Luis Garcia Variant 1</p>
            </div>

            <div className="space-y-6">
                <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-primary/50 mb-2">
                        Identidad Personal
                    </label>
                    <div className="grid gap-4">
                        <input
                            type="text"
                            name="name"
                            placeholder="Nombre Completo"
                            value={data.name}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-surface border-none rounded-lg focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                        />
                        <input
                            type="text"
                            name="jobTitle"
                            placeholder="Cargo / Título"
                            value={data.jobTitle}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-surface border-none rounded-lg focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-primary/50 mb-2">
                        Empresa
                    </label>
                    <input
                        type="text"
                        name="company"
                        placeholder="Nombre de la Empresa"
                        value={data.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-surface border-none rounded-lg focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                    />
                </div>

                <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-primary/50 mb-2">
                        Contacto
                    </label>
                    <div className="grid gap-4">
                        <input
                            type="email"
                            name="email"
                            placeholder="Correo Electrónico"
                            value={data.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-surface border-none rounded-lg focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                        />
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Teléfono"
                            value={data.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-surface border-none rounded-lg focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                        />
                        <input
                            type="text"
                            name="website"
                            placeholder="Sitio Web"
                            value={data.website}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-surface border-none rounded-lg focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-primary/50 mb-2">
                        Ubicación
                    </label>
                    <input
                        type="text"
                        name="address"
                        placeholder="Dirección / Oficina"
                        value={data.address}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-surface border-none rounded-lg focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                    />
                </div>

                <button
                    onClick={onDownload}
                    className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 mt-8"
                >
                    Descargar Tarjeta (PNG)
                </button>
            </div>
        </div>
    );
};

export default CardEditor;
