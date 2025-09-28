
import React from 'react';

const FeatureCard: React.FC<{ icon: string; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
    <div className="bg-gray-800/70 p-6 rounded-lg border border-gray-700 h-full transform transition-transform hover:-translate-y-1">
        <div className="text-4xl mb-4">{icon}</div>
        <h3 className="text-lg font-bold text-purple-300 mb-2">{title}</h3>
        <p className="text-gray-400 text-sm">{children}</p>
    </div>
);

const ExerciseCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-gray-800/70 p-5 rounded-lg border border-gray-700">
        <h4 className="font-bold text-purple-300">{title}</h4>
        <p className="text-gray-400 text-sm mt-1">{children}</p>
    </div>
);

const OverviewTab: React.FC = () => {
    return (
        <div className="animate-fadeIn">
            <h2 className="text-2xl font-bold text-white mb-6">🎯 Resumen del Proyecto</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <FeatureCard icon="🚀" title="Progresión Técnica">
                    Evolución desde scripts básicos hasta aplicaciones web modernas con React y TypeScript
                </FeatureCard>
                <FeatureCard icon="🌍" title="Análisis Multilenguaje">
                    Optimizado para español con estrategias híbridas de traducción y análisis combinado
                </FeatureCard>
                <FeatureCard icon="📊" title="Procesamiento Masivo">
                    Capacidad de analizar miles de textos simultáneamente desde archivos Excel
                </FeatureCard>
                <FeatureCard icon="🔗" title="Integración APIs">
                    Conexión real con Twitter API v2 (simulado) y Gemini API para datos en tiempo real
                </FeatureCard>
                <FeatureCard icon="🎨" title="Interfaces Modernas">
                    Desde Flask básico hasta Gradio interactivo y React con TypeScript
                </FeatureCard>
                <FeatureCard icon="⚡" title="Deploy en Producción">
                    Aplicaciones desplegadas en GitHub Pages y servidores locales funcionales
                </FeatureCard>
            </div>

            <div className="mt-10 bg-gray-900/50 p-6 rounded-xl border border-gray-700">
                <h3 className="text-xl font-bold text-white mb-5">🎓 Ejercicios Desarrollados</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <ExerciseCard title="Ejercicio 1: Flask + TextBlob">
                        Aplicación web con análisis bilingüe y interfaz HTML integrada
                    </ExerciseCard>
                    <ExerciseCard title="Ejercicio 2: Excel + NLTK">
                        Procesamiento masivo de archivos con detección automática
                    </ExerciseCard>
                    <ExerciseCard title="Ejercicio 3: spaCy + Gradio">
                        Análisis lingüístico avanzado con interfaz moderna
                    </ExerciseCard>
                    <ExerciseCard title="Ejercicio 4: Twitter API">
                        Integración real con datos de perfiles y tweets
                    </ExerciseCard>
                    <ExerciseCard title="Ejercicio 5: React Portfolio">
                        Aplicación moderna con TypeScript y deployment
                    </ExerciseCard>
                     <div className="bg-purple-900/30 p-5 rounded-lg border border-purple-700">
                        <h4 className="font-bold text-purple-300">Proyecto Final: Gemini API</h4>
                        <p className="text-gray-400 text-sm mt-1">Integración de todos los ejercicios en una sola app con IA generativa</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OverviewTab;

