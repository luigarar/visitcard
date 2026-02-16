import React from 'react';
import { Mail, Phone, Globe, Award, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';

export interface CardTheme {
    primary: string;
    accent: string;
    background: string;
    text: string;
}

export interface CardTypography {
    name: string;
    title: string;
    body: string;
}

export interface CardData {
    name: string;
    jobTitle: string;
    company: string;
    email: string;
    phone: string;
    website: string;
    address: string;
    photo?: string;
    theme: CardTheme;
    typography: CardTypography;
    templateId: number;
}

interface BusinessCardProps {
    data: CardData;
    cardRef: React.RefObject<HTMLDivElement | null>;
}

const BusinessCard: React.FC<BusinessCardProps> = ({ data, cardRef }) => {
    const { templateId, theme, typography, photo } = data;

    // Calculate Layout (0-4) and Style (0-7) from 40 templates
    const layoutId = Math.floor(templateId / 8);
    const styleId = templateId % 8;

    const fontStyle = {
        name: { fontFamily: typography.name },
        title: { fontFamily: typography.title },
        body: { fontFamily: typography.body },
    };

    const getStyleClasses = () => {
        switch (styleId) {
            case 1: return "border-4 border-accent shadow-xl";
            case 2: return "bg-gradient-to-br from-white to-surface";
            case 3: return "rounded-none shadow-none border-l-8 border-primary";
            case 4: return "rounded-[3rem] shadow-2xl";
            case 5: return "bg-primary text-white";
            case 6: return "outline outline-1 outline-accent/30 outline-offset-8";
            case 7: return "sepia-[0.2] contrast-[1.1]";
            default: return "shadow-2xl";
        }
    };

    // Template 0: The "Stitch Photo Variant" (from user image)
    const renderStitchVariant = () => (
        <div
            className={`w-[600px] h-[300px] bg-white rounded-lg shadow-xl relative overflow-hidden flex p-8 ${getStyleClasses()}`}
            style={{ backgroundColor: theme.background }}
        >
            <div className="absolute left-0 top-0 bottom-0 w-2 bg-accent/80" style={{ backgroundColor: theme.accent }} />

            {/* Photo Area */}
            <div className="w-1/3 flex items-center justify-center relative">
                <div className="w-40 h-40 bg-surface rounded-xl overflow-hidden shadow-inner relative">
                    {photo ? (
                        <img src={photo} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-primary/20">
                            <Award size={48} />
                        </div>
                    )}
                </div>
                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-accent rounded-lg flex items-center justify-center shadow-lg text-white" style={{ backgroundColor: theme.accent }}>
                    <Award size={20} />
                </div>
            </div>

            {/* Info Area */}
            <div className="w-2/3 pl-10 flex flex-col justify-center">
                <div className="mb-6">
                    <h1 className="text-3xl font-extrabold tracking-tight" style={{ ...fontStyle.name, color: theme.primary }}>
                        {data.name}
                    </h1>
                    <p className="text-sm font-bold uppercase tracking-[0.2em] mt-1" style={{ ...fontStyle.title, color: theme.text, opacity: 0.6 }}>
                        {data.jobTitle}
                    </p>
                </div>

                <div className="space-y-3">
                    <div className="flex items-center gap-4 group">
                        <Phone size={16} className="text-accent" style={{ color: theme.accent }} />
                        <div className="flex flex-col">
                            <span className="text-[10px] font-bold uppercase opacity-40">T/P (PHONE)</span>
                            <span className="text-sm font-semibold" style={{ ...fontStyle.body }}>{data.phone}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 group">
                        <Mail size={16} className="text-accent" style={{ color: theme.accent }} />
                        <div className="flex flex-col">
                            <span className="text-[10px] font-bold uppercase opacity-40">E (EMAIL)</span>
                            <span className="text-sm font-semibold" style={{ ...fontStyle.body }}>{data.email}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 group">
                        <Globe size={16} className="text-accent" style={{ color: theme.accent }} />
                        <div className="flex flex-col">
                            <span className="text-[10px] font-bold uppercase opacity-40">W (WEB)</span>
                            <span className="text-sm font-semibold" style={{ ...fontStyle.body }}>{data.website}</span>
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-4 border-t border-surface flex items-center gap-3">
                    <Linkedin size={14} className="opacity-50" />
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">|</span>
                    <span className="text-[10px] font-bold tracking-widest opacity-40 uppercase">{data.address}</span>
                </div>
            </div>
        </div>
    );

    // Template 1: Elegant Minimalist (Centered)
    const renderMinimalist = () => (
        <div
            className={`w-[600px] h-[300px] bg-white rounded-xl shadow-xl flex flex-col items-center justify-center p-12 text-center ${getStyleClasses()}`}
            style={{ backgroundColor: theme.background }}
        >
            {photo && (
                <img src={photo} alt="Profile" className="w-20 h-20 rounded-full border-2 border-accent mb-4 object-cover" style={{ borderColor: theme.accent }} />
            )}
            <h1 className="text-4xl font-black mb-1" style={{ ...fontStyle.name, color: theme.primary }}>{data.name}</h1>
            <p className="text-xs tracking-[0.3em] font-medium uppercase mb-8" style={{ ...fontStyle.title, color: theme.accent }}>{data.jobTitle}</p>

            <div className="flex gap-6 items-center text-sm" style={{ ...fontStyle.body, color: theme.text }}>
                <span className="flex items-center gap-1"><Phone size={12} /> {data.phone}</span>
                <span className="opacity-30">|</span>
                <span className="flex items-center gap-1"><Mail size={12} /> {data.email}</span>
            </div>
            <p className="mt-4 text-xs opacity-50 uppercase tracking-widest" style={{ ...fontStyle.body }}>{data.company}</p>
        </div>
    );

    // Template 2: Modern Corporate (Split Horizontal)
    const renderCorporate = () => (
        <div
            className={`w-[600px] h-[300px] bg-white rounded-lg shadow-xl overflow-hidden flex flex-col ${getStyleClasses()}`}
            style={{ backgroundColor: theme.background }}
        >
            <div className="h-1/3 bg-primary p-8 flex justify-between items-center" style={{ backgroundColor: theme.primary }}>
                <h2 className="text-white font-bold tracking-tighter text-xl">{data.company}</h2>
                {photo && <img src={photo} alt="P" className="w-12 h-12 rounded-lg border-2 border-white/20 object-cover" />}
            </div>
            <div className="h-2/3 p-8 flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-black" style={{ ...fontStyle.name, color: theme.text }}>{data.name}</h1>
                    <p className="text-accent font-bold uppercase text-xs" style={{ ...fontStyle.title, color: theme.accent }}>{data.jobTitle}</p>
                </div>
                <div className="text-right space-y-1 text-xs opacity-70" style={{ ...fontStyle.body, color: theme.text }}>
                    <p>{data.email}</p>
                    <p>{data.phone}</p>
                    <p className="font-bold">{data.website}</p>
                </div>
            </div>
        </div>
    );

    // Template 3: Bold Geometric (Diagonal)
    const renderGeometric = () => (
        <div
            className={`w-[600px] h-[300px] bg-white rounded-xl shadow-xl overflow-hidden flex relative ${getStyleClasses()}`}
            style={{ backgroundColor: theme.background }}
        >
            <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 clip-path-diagonal" style={{ backgroundColor: theme.primary, opacity: 0.1 }} />
            <div className="w-1/2 p-10 flex flex-col justify-center">
                <h1 className="text-4xl font-black leading-tight" style={{ ...fontStyle.name, color: theme.primary }}>{data.name}</h1>
                <div className="w-12 h-1 bg-accent my-4" style={{ backgroundColor: theme.accent }} />
                <p className="text-sm font-bold opacity-60 uppercase" style={{ ...fontStyle.title, color: theme.text }}>{data.jobTitle}</p>
            </div>
            <div className="w-1/2 p-10 flex flex-col justify-center gap-4 border-l border-surface">
                {photo && <img src={photo} alt="P" className="w-16 h-16 rounded-full self-end border-2 border-accent mb-2 object-cover" style={{ borderColor: theme.accent }} />}
                <div className="text-right space-y-1">
                    <p className="text-xs font-bold" style={{ ...fontStyle.body, color: theme.text }}>{data.email}</p>
                    <p className="text-xs font-bold" style={{ ...fontStyle.body, color: theme.text }}>{data.phone}</p>
                    <p className="text-xs font-black uppercase text-accent" style={{ ...fontStyle.body, color: theme.accent }}>{data.company}</p>
                </div>
            </div>
        </div>
    );

    // Template 4: Professional Split Vertical
    const renderVertical = () => (
        <div
            className={`w-[600px] h-[300px] bg-white rounded-xl shadow-xl flex overflow-hidden ${getStyleClasses()}`}
            style={{ backgroundColor: theme.background }}
        >
            <div className="w-[15px] h-full bg-accent" style={{ backgroundColor: theme.accent }} />
            <div className="flex-1 p-10 flex flex-col justify-between">
                <div>
                    <h1 className="text-3xl font-black" style={{ ...fontStyle.name, color: theme.primary }}>{data.name}</h1>
                    <p className="text-sm font-bold opacity-40 uppercase tracking-widest mt-1" style={{ ...fontStyle.title, color: theme.text }}>{data.jobTitle}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-black uppercase opacity-30">Contacto</span>
                        <p className="text-xs font-bold" style={{ ...fontStyle.body }}>{data.email}</p>
                        <p className="text-xs font-bold" style={{ ...fontStyle.body }}>{data.phone}</p>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-black uppercase opacity-30">Ubicación</span>
                        <p className="text-xs font-bold" style={{ ...fontStyle.body }}>{data.address}</p>
                        <p className="text-xs font-black uppercase text-accent" style={{ color: theme.accent }}>{data.company}</p>
                    </div>
                </div>
            </div>
            {photo && (
                <div className="w-1/3 bg-surface p-4 flex items-center justify-center">
                    <img src={photo} alt="P" className="w-full aspect-square rounded-2xl grayscale hover:grayscale-0 transition-all object-cover shadow-lg border-2 border-white" />
                </div>
            )}
        </div>
    );

    // Default Fallback
    const renderActiveLayout = () => {
        switch (layoutId) {
            case 0: return renderStitchVariant();
            case 1: return renderMinimalist();
            case 2: return renderCorporate();
            case 3: return renderGeometric();
            case 4: return renderVertical();
            default: return renderStitchVariant();
        }
    };

    return (
        <div className="flex items-center justify-center p-8">
            <motion.div
                ref={cardRef}
                key={templateId}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
                {renderActiveLayout()}
            </motion.div>
        </div>
    );
};

export default BusinessCard;
