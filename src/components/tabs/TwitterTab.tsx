
import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import DemoCard from '../ui/DemoCard';
import { Button, ExampleButton } from '../ui/Button';
import ResultCard from '../ui/ResultCard';
import Loading from '../ui/Loading';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const TwitterTab: React.FC = () => {
    const [username, setUsername] = useState('elonmusk');
    const [tweetCount, setTweetCount] = useState(5);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleAnalyze = async () => {
        if (!username) {
            setError('Por favor, ingresa un usuario de Twitter.');
            return;
        }
        setLoading(true);
        setResult(null);
        setError(null);

        try {
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: `Simula un análisis de un perfil de Twitter/X. Genera datos de perfil plausibles para el usuario @${username} (nombre, seguidores, verificado, etc.). Luego, crea ${tweetCount} tweets recientes realistas para este usuario. Finalmente, analiza el sentimiento de cada tweet (POSITIVO, NEGATIVO, NEUTRO) y calcula un resumen de sentimientos.

Devuelve un objeto JSON con 'profile' (con 'name', 'followers', 'verified') y 'tweets' (un array de objetos con 'content' y 'sentiment').`,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: Type.OBJECT,
                        properties: {
                            profile: {
                                type: Type.OBJECT,
                                properties: {
                                    name: { type: Type.STRING },
                                    followers: { type: Type.STRING },
                                    verified: { type: Type.BOOLEAN },
                                }
                            },
                            tweets: {
                                type: Type.ARRAY,
                                items: {
                                    type: Type.OBJECT,
                                    properties: {
                                        content: { type: Type.STRING },
                                        sentiment: { type: Type.STRING }
                                    }
                                }
                            }
                        }
                    }
                }
            });

            const data = JSON.parse(response.text);
            const { profile, tweets } = data;
            
            let output = `🐦 ANÁLISIS DE CUENTA: @${username} (SIMULADO)\n${'='.repeat(70)}\n\n`;
            
            output += `👤 INFORMACIÓN DEL PERFIL:\n`;
            output += `• Nombre: ${profile.name}\n`;
            output += `• Seguidores: ${profile.followers}\n`;
            output += `• Verificado: ${profile.verified ? '✅ Sí' : '❌ No'}\n\n`;

            output += `📊 ANÁLISIS DE ${tweets.length} TWEETS:\n${'-'.repeat(50)}\n\n`;

            let sentimentCounts = { positive: 0, negative: 0, neutral: 0 };

            tweets.forEach((tweet: any, index: number) => {
                output += `Tweet ${index + 1}:\n`;
                output += `"${tweet.content}"\n`;
                output += `📊 Sentimiento: ${tweet.sentiment}\n`;
                output += `${'-'.repeat(50)}\n\n`;

                if (tweet.sentiment.toUpperCase().includes('POSITIVO')) sentimentCounts.positive++;
                else if (tweet.sentiment.toUpperCase().includes('NEGATIVO')) sentimentCounts.negative++;
                else sentimentCounts.neutral++;
            });

            output += `📈 DISTRIBUCIÓN DE SENTIMIENTOS:\n`;
            output += `• ${sentimentCounts.positive} Positivos | ${sentimentCounts.neutral} Neutros | ${sentimentCounts.negative} Negativos\n`;

            setResult(output);
        } catch (e) {
            console.error(e);
            setError('No se pudo completar el análisis. Inténtalo de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    const handleClear = () => {
        setUsername('elonmusk');
        setResult(null);
        setError(null);
    };

    return (
        <DemoCard
            title="🐦 Demo: Análisis de Twitter/X"
            description={
                <p><strong>Ejercicio 4:</strong> Simulación de análisis de perfiles de Twitter/X. Conecta con Gemini para generar datos y analizarlos, simulando una conexión a la API de Twitter v2.</p>
            }
        >
            <div className="space-y-4">
                <div>
                    <label htmlFor="twitterInput" className="block text-sm font-medium text-gray-300 mb-2">Usuario de Twitter/X (sin @):</label>
                    <input
                        type="text"
                        id="twitterInput"
                        className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                        placeholder="elonmusk, nasa, o cnn"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                 <div>
                    <label htmlFor="tweetCount" className="block text-sm font-medium text-gray-300 mb-2">Número de tweets a analizar: <span className="font-bold text-purple-300">{tweetCount}</span></label>
                     <input
                        type="range"
                        id="tweetCount"
                        min="1"
                        max="10"
                        value={tweetCount}
                        onChange={(e) => setTweetCount(Number(e.target.value))}
                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
                     />
                </div>
                <div className="flex flex-wrap gap-2">
                    <ExampleButton onClick={() => setUsername('elonmusk')}>🚀 @elonmusk</ExampleButton>
                    <ExampleButton onClick={() => setUsername('nasa')}>🛰️ @nasa</ExampleButton>
                    <ExampleButton onClick={() => setUsername('cnn')}>📰 @cnn</ExampleButton>
                </div>
                <div className="flex flex-wrap gap-4">
                    <Button onClick={handleAnalyze} disabled={loading}>🔍 Analizar Cuenta</Button>
                    <Button onClick={handleClear} variant="secondary" disabled={loading}>🧹 Limpiar</Button>
                </div>
                {loading && <Loading text="Obteniendo y analizando datos del perfil..." />}
                <ResultCard content={result} error={error} />
            </div>
        </DemoCard>
    );
};

export default TwitterTab;
