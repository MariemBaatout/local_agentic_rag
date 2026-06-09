import React, { useState, useEffect } from 'react';

export default function AnimatedArchitecture() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Le flux passe à 10 étapes pour intégrer la simulation Hit puis Miss
  const totalSteps = 10;

  useEffect(() => {
    let timer;
    if (isPlaying && currentStep < totalSteps) {
      timer = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, 2500);
    } else if (currentStep >= totalSteps) {
      setIsPlaying(false);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStep]);

  const resetAnimation = () => {
    setIsPlaying(false);
    setCurrentStep(0);
  };

  const togglePlay = () => setIsPlaying(!isPlaying);

  const getVisibility = (stepRequired) => {
    return currentStep >= stepRequired 
      ? 'opacity-100 translate-y-0 scale-100' 
      : 'opacity-0 translate-y-8 scale-95 pointer-events-none';
  };

  // Gestion spécifique de l'apparition de la réponse finale
  const showResponse = currentStep === 3 || currentStep >= 10;

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-[#050816] text-white font-sans rounded-3xl border border-blue-500/20 shadow-2xl overflow-hidden">
      
      <div className="flex flex-col md:flex-row items-center justify-between mb-10 pb-6 border-b border-blue-500/20">
        <div>
          <h2 className="text-2xl font-black text-blue-400 tracking-wider">
            AGENTIC RAG WORKFLOW
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Scénario : Cache Hit (Fast Path) ➔ Cache Miss (Full Workflow)
          </p>
        </div>

        <div className="flex items-center gap-4 mt-4 md:mt-0 bg-blue-950/30 p-2 rounded-2xl border border-blue-500/30 backdrop-blur-sm">
          <button onClick={() => setCurrentStep(Math.max(0, currentStep - 1))} className="p-2 text-gray-400 hover:text-white transition-colors">⏮</button>
          <button onClick={togglePlay} className={`px-6 py-2 rounded-xl font-bold transition-all ${isPlaying ? 'bg-red-500/20 text-red-400 border border-red-500/50' : 'bg-green-500/20 text-green-400 border border-green-500/50 hover:bg-green-500/30'}`}>
            {isPlaying ? '⏸ PAUSE' : currentStep >= totalSteps ? '🔄 REPLAY' : '▶ PLAY LECTURE'}
          </button>
          <button onClick={() => setCurrentStep(Math.min(totalSteps, currentStep + 1))} className="p-2 text-gray-400 hover:text-white transition-colors">⏭</button>
          <button onClick={resetAnimation} className="ml-2 p-2 text-gray-500 hover:text-red-400 transition-colors text-sm">Reset</button>
        </div>
      </div>

      <div className="w-full h-1.5 bg-gray-800 rounded-full mb-12 overflow-hidden">
        <div className="h-full bg-blue-500 transition-all duration-500 ease-out" style={{ width: `${(currentStep / totalSteps) * 100}%` }}></div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6 items-center min-h-[500px]">
        
        {/* COLONNE 1: Utilisateur */}
        <div className="flex flex-col items-center justify-center space-y-6 relative z-10">
          <div className={`transition-all duration-700 ease-out ${getVisibility(1)} w-full text-center bg-blue-900/20 border border-blue-500/40 p-6 rounded-2xl`}>
            <div className="text-4xl mb-2">👤</div>
            <h3 className="font-bold text-blue-100 mb-1">USER INTERFACE</h3>
            <div className="text-xs text-blue-300 font-mono bg-blue-950/50 py-1 px-2 rounded">Requête envoyée...</div>
          </div>
          
          {/* Bloc de réponse (Apparaît à l'étape 3, puis disparaît, puis réapparaît à l'étape 10) */}
          <div className={`transition-all duration-700 ease-out absolute -bottom-24 w-full text-center border p-4 rounded-2xl shadow-lg
            ${showResponse ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95 pointer-events-none'}
            ${currentStep === 3 ? 'bg-green-900/40 border-green-400 shadow-[0_0_30px_rgba(34,197,94,0.3)]' : 'bg-indigo-900/40 border-indigo-400 shadow-[0_0_30px_rgba(99,102,241,0.3)]'}
          `}>
            <h3 className={`font-bold text-sm ${currentStep === 3 ? 'text-green-300' : 'text-indigo-300'}`}>USER RESPONSE</h3>
            <div className="text-xs text-gray-300 mt-1">
              {currentStep === 3 ? "⚡ Réponse instantanée via Cache" : "🧠 Réponse générée par le Workflow"}
            </div>
          </div>
        </div>

        {/* COLONNE 2: Agentic Orchestrator & Cache */}
        <div className={`transition-all duration-700 ease-out delay-100 ${getVisibility(2)} h-full bg-gradient-to-b from-[#0f4c81]/20 to-[#0f4c81]/5 border-2 border-[#1a6bb5] rounded-3xl p-5 shadow-[0_0_30px_rgba(26,107,181,0.15)] flex flex-col justify-between`}>
          
          <div className="text-center mb-4">
            <h3 className="font-black text-[#4ba3e3] uppercase tracking-wide">Orchestration Layer</h3>
          </div>

          {/* GLOBAL RESPONSE CACHE */}
          <div className={`transition-all duration-500 ease-out bg-[#1e0f3b] border ${currentStep >= 2 && currentStep <= 4 ? 'border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.3)]' : 'border-purple-500/30'} rounded-2xl p-4 mb-4 relative`}>
            <h4 className="text-sm font-bold text-purple-300 text-center mb-3 flex justify-center items-center gap-2">
              🗄️ Global Response Cache
            </h4>
            <div className="flex justify-between items-center text-[11px] font-mono gap-2">
              
              {/* CACHE HIT (Étape 2 & 3) */}
              <div className={`flex-1 text-center px-2 py-1.5 rounded-lg border transition-all duration-500
                ${(currentStep === 2 || currentStep === 3) ? 'border-green-400 bg-green-500/20 text-green-300 animate-pulse' : 'border-gray-700 bg-black/40 text-gray-500'}
              `}>
                Hit ➔ Réponse
              </div>

              {/* CACHE MISS (Étape 4+) */}
              <div className={`flex-1 text-center px-2 py-1.5 rounded-lg border transition-all duration-500
                ${currentStep >= 4 ? 'border-red-500/50 bg-red-500/10 text-red-400 animate-pulse' : 'border-gray-700 bg-black/40 text-gray-500'}
              `}>
                Miss ➔ Workflow
              </div>
            </div>
            {currentStep >= 4 && <div className="absolute -right-3 top-1/2 -translate-y-1/2 text-red-400 text-xl animate-bounce z-20">↓</div>}
          </div>

          {/* LANGGRAPH (Démarre à l'étape 5) */}
          <div className={`transition-all duration-700 ease-out delay-200 ${getVisibility(5)} bg-[#0b2842] border border-[#1a6bb5]/50 rounded-2xl p-4 mb-4 relative`}>
            <h4 className="text-sm font-bold text-white text-center mb-3">LangGraph State Graph</h4>
            <div className="flex justify-center items-center gap-2 text-xs font-mono">
              <div className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full border border-blue-500/30">State</div>
              <span className="text-blue-500">→</span>
              <div className={`px-2 py-1 rounded-full border transition-all duration-300 ${currentStep === 5 ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50 animate-pulse' : 'bg-blue-500/20 text-blue-300 border-blue-500/30'}`}>Decision</div>
              <span className="text-blue-500">→</span>
              <div className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full border border-blue-500/30">Generate</div>
            </div>
          </div>

          {/* MCP BRIDGE (Démarre à l'étape 6) */}
          <div className={`transition-all duration-700 ease-out delay-300 ${getVisibility(6)} bg-white/5 border border-white/10 rounded-2xl p-4 space-y-3`}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 border border-cyan-500/30">🗄️</div>
              <div>
                <div className="text-sm font-bold text-white">MCP HOST</div>
                <div className="text-[10px] text-gray-400">Session Management</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 border border-cyan-500/30">🔗</div>
              <div>
                <div className="text-sm font-bold text-white">MCP CLIENT</div>
                <div className="text-[10px] text-gray-400">Call Dispatch Logic</div>
              </div>
            </div>
          </div>
        </div>

        {/* COLONNE 3: MCP Server & Agents */}
        <div className={`transition-all duration-700 ease-out delay-400 ${getVisibility(7)} h-full border-2 border-dashed border-green-500/40 bg-green-950/10 rounded-3xl p-5 relative`}>
          
          <div className="absolute -left-3 top-1/2 -translate-y-1/2 flex items-center">
             <div className={`px-2 py-1 bg-cyan-950 border border-cyan-500 text-cyan-400 text-[10px] font-bold rounded-lg shadow-lg ${currentStep >= 6 ? 'animate-pulse' : ''}`}>
               MCP BRIDGE ➔
             </div>
          </div>

          <div className="text-center mb-4">
            <h3 className="font-black text-green-400 uppercase tracking-wide">FastMCP Server</h3>
            <div className="text-[10px] text-gray-500 uppercase mt-1">Local CPU Execution</div>
          </div>

          <div className="space-y-3">
            {[
              { id: 1, name: "Agent Ingestion", tool: "IngestDocuments", step: 7 },
              { id: 2, name: "Agent Indexation", tool: "IndexPendingDocs", step: 7 },
              { id: 3, name: "Agent Recherche", tool: "HybridSearch", step: 8 },
              { id: 4, name: "Agent Analyseur", tool: "AnalyzeContext", step: 8 },
              { id: 5, name: "Agent Génération", tool: "GenerateFinalAnswer", step: 9 },
            ].map((agent) => (
              <div 
                key={agent.id}
                className={`transition-all duration-500 flex justify-between items-center p-3 rounded-xl border ${
                  currentStep >= agent.step 
                    ? currentStep === agent.step 
                      ? 'bg-green-500/20 border-green-400 shadow-[0_0_15px_rgba(34,197,94,0.3)] translate-x-2'
                      : 'bg-green-900/30 border-green-500/30'
                    : 'bg-black/40 border-gray-800 opacity-50'
                }`}
              >
                <div>
                  <div className={`text-xs font-bold ${currentStep >= agent.step ? 'text-white' : 'text-gray-500'}`}>{agent.name}</div>
                  <div className="text-[10px] text-green-500 font-mono mt-0.5">{agent.tool}()</div>
                </div>
                <div className={`w-2 h-2 rounded-full ${currentStep === agent.step ? 'bg-green-400 animate-ping' : currentStep > agent.step ? 'bg-green-600' : 'bg-gray-700'}`}></div>
              </div>
            ))}
          </div>
        </div>

        {/* COLONNE 4: Resources Stack */}
        <div className="flex flex-col h-full gap-4 relative z-10">
          
          <div className={`transition-all duration-700 ease-out delay-100 ${getVisibility(7)} bg-slate-800/40 border border-slate-600/50 p-4 rounded-2xl`}>
             <div className="flex items-center gap-2 mb-2">
               <span className="text-xl">📄</span>
               <h4 className="text-sm font-bold text-white">Documents Locaux</h4>
             </div>
             <div className="text-[10px] text-gray-400">PDF Files, etc.</div>
          </div>

          <div className={`transition-all duration-700 ease-out delay-200 ${getVisibility(8)} bg-[#0f4c81]/20 border border-[#1a6bb5]/50 p-4 rounded-2xl shadow-[0_0_20px_rgba(26,107,181,0.2)]`}>
             <div className="flex items-center gap-2 mb-2">
               <span className="text-xl">🗃️</span>
               <h4 className="text-sm font-bold text-[#4ba3e3]">DB Vectorielle</h4>
             </div>
             <div className="flex justify-between items-center text-[10px] mb-2 font-mono bg-blue-950/50 px-2 py-1 rounded text-blue-300">
               <span>pgvector</span>
               <span className={currentStep === 8 ? 'animate-pulse text-green-400' : ''}>[SEARCHING...]</span>
             </div>
             <div className="flex gap-2 text-[10px] text-gray-400 text-center">
                <div className="flex-1 bg-black/30 rounded py-1 border border-white/5">Docs</div>
                <div className="flex-1 bg-black/30 rounded py-1 border border-white/5">Memory</div>
             </div>
          </div>

          <div className={`transition-all duration-700 ease-out delay-300 ${getVisibility(9)} bg-indigo-900/30 border border-indigo-500/50 p-4 rounded-2xl`}>
             <div className="flex items-center gap-2 mb-2">
               <span className="text-xl">🤖</span>
               <h4 className="text-sm font-bold text-indigo-300">Génération</h4>
             </div>
             <div className="text-[10px] text-gray-400 leading-tight">Synthesis of Grounded user Response</div>
          </div>

        </div>
      </div>

      {/* Explication contextuelle */}
      <div className="mt-8 bg-white/5 border border-white/10 rounded-2xl p-4 text-center min-h-[60px] flex items-center justify-center">
        <p className="text-sm text-gray-300">
          {currentStep === 0 && "Appuyez sur PLAY pour démarrer la simulation."}
          {currentStep === 1 && "1. L'utilisateur envoie sa requête via l'interface client."}
          {currentStep === 2 && "2. Vérification dans le Global Cache. Simulation d'une question déjà posée (Cache Hit)."}
          {currentStep === 3 && "3. ⚡ La réponse est immédiatement retournée à l'utilisateur (0 appel LLM)."}
          {currentStep === 4 && "4. Simulation inverse : La question est nouvelle (Cache Miss). Le workflow s'active."}
          {currentStep === 5 && "5. Le graphe d'états LangGraph (Agentic Orchestrator) évalue la décision logique de routage."}
          {currentStep === 6 && "6. Le pont protocolaire MCP transforme l'intention en appels d'outils (Action Calls)."}
          {currentStep === 7 && "7. Les agents d'Ingestion et d'Indexation (CrewAI) vérifient les documents locaux."}
          {currentStep === 8 && "8. Recherche hybride dans PostgreSQL (pgvector) et analyse contextuelle."}
          {currentStep === 9 && "9. L'Agent de Génération synthétise la réponse finale basée sur les données."}
          {currentStep === 10 && "10. La réponse générée est retournée à l'utilisateur. Cycle complet terminé."}
        </p>
      </div>
    </div>
  );
}