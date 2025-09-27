
import React, { useState } from 'react';
import Header from './components/Header';
import OverviewTab from './components/tabs/OverviewTab';
import TextBlobTab from './components/tabs/TextBlobTab';
import NltkTab from './components/tabs/NltkTab';
import SpacyTab from './components/tabs/SpacyTab';
import ExcelTab from './components/tabs/ExcelTab';
import TwitterTab from './components/tabs/TwitterTab';

type Tab = 'overview' | 'textblob' | 'nltk' | 'spacy' | 'excel' | 'twitter';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('overview');

  const tabs: { id: Tab; label: string }[] = [
    { id: 'overview', label: '📋 Resumen' },
    { id: 'textblob', label: '🔬 TextBlob Demo' },
    { id: 'nltk', label: '📊 NLTK VADER Demo' },
    { id: 'spacy', label: '🧠 spaCy Demo' },
    { id: 'excel', label: '📈 Excel Demo' },
    { id: 'twitter', label: '🐦 Twitter Demo' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab />;
      case 'textblob':
        return <TextBlobTab />;
      case 'nltk':
        return <NltkTab />;
      case 'spacy':
        return <SpacyTab />;
      case 'excel':
        return <ExcelTab />;
      case 'twitter':
        return <TwitterTab />;
      default:
        return <OverviewTab />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white selection:bg-purple-500 selection:text-white">
      <div className="container mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
        <Header />
        
        <main className="mt-8">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-purple-500/30 rounded-2xl shadow-2xl shadow-purple-900/20 overflow-hidden">
            <div className="flex flex-wrap border-b border-gray-700/50">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 min-w-[150px] px-3 py-4 text-sm sm:text-base font-semibold transition-colors duration-300 relative focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 ${
                    activeTab === tab.id
                      ? 'text-purple-300 bg-purple-900/30'
                      : 'text-gray-400 hover:bg-gray-700/50 hover:text-gray-200'
                  }`}
                  aria-current={activeTab === tab.id ? 'page' : undefined}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <span className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-indigo-500"></span>
                  )}
                </button>
              ))}
            </div>
            
            <div className="p-4 sm:p-6 md:p-8">
              {renderTabContent()}
            </div>
          </div>
        </main>
      </div>
      <footer className="w-full text-center py-4 text-gray-500 text-sm">
          <p>Proyecto Integrador de 5 Ejercicios completado.</p>
          <p>Demostración interactiva generada por el Asistente de Misión IA.</p>
      </footer>
    </div>
  );
};

export default App;
