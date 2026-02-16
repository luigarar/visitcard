import React from 'react';
import { Mail, Phone, Globe, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

export interface CardData {
    name: string;
    jobTitle: string;
    company: string;
    email: string;
    phone: string;
    website: string;
    address: string;
    logoColor?: string;
}

interface BusinessCardProps {
    data: CardData;
    cardRef: React.RefObject<HTMLDivElement | null>;
}

const BusinessCard: React.FC<BusinessCardProps> = ({ data, cardRef }) => {
    return (
        <div className="flex items-center justify-center p-8 bg-surface rounded-xl">
            <motion.div
                ref={cardRef}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-[500px] h-[280px] bg-white rounded-xl shadow-2xl relative overflow-hidden flex"
            >
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-16 -mt-16" />
                <div className="absolute bottom-0 left-0 w-24 h-24 border-t border-r border-accent/20 rounded-tr-3xl ml-4 mb-4" />

                {/* Left Side - Identity */}
                <div className="w-2/5 bg-primary p-8 flex flex-col justify-between text-white">
                    <div>
                        <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mb-6 shadow-lg">
                            <span className="text-primary font-extrabold text-xl">
                                {data.company.charAt(0) || 'G'}
                            </span>
                        </div>
                        <h1 className="text-xl font-extrabold tracking-tight leading-tight">
                            {data.name || 'Luis García'}
                        </h1>
                        <div className="h-0.5 w-8 bg-accent my-3 rounded-full" />
                        <p className="text-accent/90 text-xs font-semibold uppercase tracking-widest">
                            {data.jobTitle || 'Business Strategist'}
                        </p>
                    </div>
                    <p className="text-[10px] font-medium opacity-60 tracking-wider">
                        {data.company || 'García Arroyo Landing'}
                    </p>
                </div>

                {/* Right Side - Contact */}
                <div className="w-3/5 p-8 flex flex-col justify-center">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 group">
                            <div className="p-2 bg-surface rounded-md text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                                <Mail size={14} />
                            </div>
                            <span className="text-sm font-medium text-text-main">{data.email || 'luis@garcia.me'}</span>
                        </div>
                        <div className="flex items-center gap-3 group">
                            <div className="p-2 bg-surface rounded-md text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                                <Phone size={14} />
                            </div>
                            <span className="text-sm font-medium text-text-main">{data.phone || '+34 600 000 000'}</span>
                        </div>
                        <div className="flex items-center gap-3 group">
                            <div className="p-2 bg-surface rounded-md text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                                <Globe size={14} />
                            </div>
                            <span className="text-sm font-medium text-text-main">{data.website || 'www.luisgarcia.me'}</span>
                        </div>
                        <div className="flex items-center gap-3 group">
                            <div className="p-2 bg-surface rounded-md text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                                <MapPin size={14} />
                            </div>
                            <span className="text-xs font-medium text-text-main/70 leading-relaxed">
                                {data.address || 'Madrid, Spain'}
                            </span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default BusinessCard;
