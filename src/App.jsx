import { useState, useRef, useEffect } from 'react';
import AnimatedArchitecture from './architecture_interactive';
export default function LocalAgenticRagDashboard() {
  // Runtime status: 'idle', 'running', or 'completed'
  const [runtimeStatus, setRuntimeStatus] = useState('idle');
  const [activeAgentIndex, setActiveAgentIndex] = useState(-1);
  const [isArchitectureOpen, setIsArchitectureOpen] = useState(false);
  
  const videoRef = useRef(null);

  const agentsList = [
    "Ingestion Agent",
    "Indexing Agent",
    "Search Agent",
    "Analysis Agent",
    "Generation Agent"
  ];

  // Map the video's progress to the corresponding active agent
  const handleTimeUpdate = () => {
    if (!videoRef.current || runtimeStatus === 'completed') return;

    const currentTime = videoRef.current.currentTime;
    const duration = videoRef.current.duration || 1; // Avoid division by zero
    const progress = currentTime / duration;

    // Split the video duration into equal segments for each agent
    const currentSegmentIndex = Math.floor(progress * agentsList.length);

    if (currentSegmentIndex >= 0 && currentSegmentIndex < agentsList.length) {
      setActiveAgentIndex(currentSegmentIndex);
    }
  };

  // Triggered when user clicks "Launch Runtime"
  const handleLaunchRuntime = () => {
    if (videoRef.current) {
      setRuntimeStatus('running');
      videoRef.current.play();
      videoRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Triggered if the user manually plays the video stream directly
  const handleVideoPlay = () => {
    setRuntimeStatus('running');
  };
  
  // Triggered when the video is paused (returns to standby)
  const handleVideoPause = () => {
    if (runtimeStatus !== 'completed') {
      setRuntimeStatus('idle');
    }
  };

  // Triggered when the video finishes completely
  const handleVideoEnded = () => {
    setRuntimeStatus('completed');
    setActiveAgentIndex(agentsList.length); // Sets all agents to completed
  };

  const handleViewArchitecture = () => {
    setIsArchitectureOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#050816] text-white font-sans overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#00d1ff22,transparent_40%)] pointer-events-none"></div>

      {/* Navbar */}
      <header className="border-b border-cyan-500/20 backdrop-blur-md bg-black/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-widest text-cyan-400">
              EITA INNOV
            </h1>
            <p className="text-xs text-gray-400 tracking-[0.3em] uppercase">
              Local-Agentic-RAG Platform
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="px-4 py-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 text-cyan-300 text-sm">
              CPU ONLY
            </div>
            <div className={`px-4 py-2 rounded-full border text-sm backdrop-blur-sm transition-all duration-500 ${
              runtimeStatus === 'running' 
                ? 'border-green-400/30 bg-green-500/10 text-green-300 animate-pulse' 
                : runtimeStatus === 'completed'
                ? 'border-cyan-400/30 bg-cyan-500/10 text-cyan-300'
                : 'border-yellow-400/30 bg-yellow-500/10 text-yellow-300'
            }`}>
              {runtimeStatus === 'running' && 'SYSTEM OPERATIONAL'}
              {runtimeStatus === 'idle' && 'SYSTEM STANDBY'}
              {runtimeStatus === 'completed' && 'EXECUTION COMPLETE'}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-14 pb-10 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 mb-6 text-sm">
              Sovereign AI Infrastructure
            </div>

            <h2 className="text-5xl md:text-6xl font-black leading-tight mb-6">
              LOCAL
              <span className="text-cyan-400"> AGENTIC </span>
              RAG
            </h2>

            <p className="text-gray-400 text-lg leading-relaxed max-w-xl mb-8">
              Multi-agent MCP infrastructure executing entirely on local CPU hardware with LangGraph orchestration, CrewAI agents, POSTGRES Vector DB, and RAGAS evaluation.
            </p>

            <div className="flex flex-wrap gap-4">
              <button 
                onClick={handleLaunchRuntime}
                disabled={runtimeStatus === 'running'}
                className={`px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform active:scale-95 ${
                  runtimeStatus === 'running' 
                    ? 'bg-green-600 text-white cursor-not-allowed shadow-[0_0_40px_rgba(34,197,94,0.15)]' 
                    : runtimeStatus === 'completed'
                    ? 'bg-cyan-500 text-black shadow-[0_0_40px_rgba(0,209,255,0.35)]'
                    : 'bg-cyan-500 hover:bg-cyan-400 text-black shadow-[0_0_40px_rgba(0,209,255,0.35)]'
                }`}
              >
                {runtimeStatus === 'running' && 'Runtime Executing...'}
                {runtimeStatus === 'idle' && 'Launch Runtime'}
                {runtimeStatus === 'completed' && 'Re-run Runtime'}
              </button>

              <button 
                onClick={handleViewArchitecture}
                className="px-8 py-4 rounded-2xl border border-cyan-500/30 bg-black/30 hover:bg-cyan-500/10 transition-all duration-300 text-cyan-300 active:scale-95"
              >
                View Architecture
              </button>
            </div>
          </div>

          {/* Stats Card */}
          <div className="bg-white/5 border border-cyan-500/20 rounded-3xl p-8 backdrop-blur-xl shadow-2xl shadow-cyan-500/10">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-semibold text-cyan-300">
                Runtime Status
              </h3>
              <div className={`h-3 w-3 rounded-full transition-all duration-500 ${
                runtimeStatus === 'running' ? 'bg-green-400 animate-pulse shadow-[0_0_10px_#4ade80]' :
                runtimeStatus === 'completed' ? 'bg-cyan-400 shadow-[0_0_10px_#22d3ee]' : 'bg-yellow-400'
              }`}></div>
            </div>

            <div className="space-y-5">
              <Stat label="Execution Mode" value={runtimeStatus === 'running' ? "Strict CPU (Active)" : runtimeStatus === 'completed' ? "Finished" : "Strict CPU (Standby)"} />
              <Stat label="LLM" value="Qwen 8B" />
              <Stat label="Framework" value="CrewAI + MCP" />
              <Stat label="Vector DB" value="POSTGRES (pgvector extension)" />
              <Stat label="Evaluation" value="RAGAS" />
              <Stat label="Latency" value={runtimeStatus !== 'idle' ? "66.61s" : "--"} />
              <Stat label="Tokens" value={runtimeStatus !== 'idle' ? "45 tokens" : "--"} />
            </div>
          </div>
        </div>
      </section>

      {/* Main Dashboard */}
      <section className="max-w-7xl mx-auto px-6 pb-20 relative z-10">
        <div className="grid lg:grid-cols-3 gap-6">
          
          {/* CLI Console */}
          <div id="mcp-console" className="lg:col-span-2 bg-black/50 border border-cyan-500/20 rounded-3xl overflow-hidden backdrop-blur-xl shadow-2xl shadow-cyan-500/10 scroll-mt-24">
            <div className="flex items-center justify-between px-6 py-4 border-b border-cyan-500/20 bg-cyan-500/5">
              <div>
                <h3 className="text-lg font-semibold text-cyan-300">
                  LIVE MCP CONSOLE
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Local Runtime Execution Stream
                </p>
              </div>

              <div className="flex gap-2">
                <div className="h-3 w-3 rounded-full bg-red-400"></div>
                <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                <div className="h-3 w-3 rounded-full bg-green-400"></div>
              </div>
            </div>

            {/* VIDEO CONTAINER */}
            
            <div className="relative aspect-video bg-black flex items-center justify-center">
              <video
                ref={videoRef}
                controls
                onPlay={handleVideoPlay}
                onPause={handleVideoPause}
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleVideoEnded}
                className="w-full h-full object-contain transition-opacity duration-500"
                poster="/console-thumbnail.jpg" // optional placeholder image
              >
                <source src="/ingestion_to_generation.mp4" type="video/mp4" />
              </video>

              <div className="absolute top-4 left-4 px-3 py-1 rounded-full border border-cyan-500/30 bg-black/50 text-cyan-300 text-xs backdrop-blur-md pointer-events-none">
                {runtimeStatus === 'running' ? 'MCP STDIO ACTIVE' : runtimeStatus === 'completed' ? 'STREAM CONCLUDED' : 'MCP GATEWAY STANDBY'}
              </div>

              <div className={`absolute bottom-4 right-4 px-3 py-1 rounded-full border text-xs backdrop-blur-md transition-all duration-300 pointer-events-none ${
                runtimeStatus === 'running' ? 'border-green-500/30 bg-black/50 text-green-300 animate-pulse' : 'border-gray-500/30 bg-black/50 text-gray-400'
              }`}>
                {runtimeStatus === 'running' ? 'LIVE EXECUTION' : runtimeStatus === 'completed' ? 'OUTPUT RENDERED' : 'PAUSED'}
              </div>
            </div>
          </div>

          {/* Right Column: Agent Status & Quick Pipeline Map */}
          <div className="space-y-6">
            {/* Agent Status List */}
            <div className="bg-white/5 border border-cyan-500/20 rounded-3xl p-6 backdrop-blur-xl shadow-xl shadow-cyan-500/10">
              <h3 className="text-lg font-semibold text-cyan-300 mb-6">
                AGENT STATUS
              </h3>

              <div className="space-y-4">
                {agentsList.map((agentName, index) => {
                  let status = "STANDBY";
                  
                  if (runtimeStatus === 'completed') {
                    status = "COMPLETED";
                  } else if (runtimeStatus === 'running') {
                    if (index === activeAgentIndex) status = "ACTIVE";
                    else if (index < activeAgentIndex) status = "COMPLETED";
                  }
                  
                  return (
                    <Agent 
                      key={agentName} 
                      name={agentName} 
                      status={status} 
                    />
                  );
                })}
              </div>
            </div>

            {/* Mini Architecture Map */}
            <div id="architecture-map" className="bg-white/5 border border-cyan-500/20 rounded-3xl p-6 backdrop-blur-xl shadow-xl shadow-cyan-500/10 scroll-mt-24">
              <h3 className="text-lg font-semibold text-cyan-300 mb-6">
                ARCHITECTURE MAP
              </h3>

              <div className="space-y-4 text-sm">
                <ArchitectureBox title="User Query" isActive={runtimeStatus !== 'idle' && activeAgentIndex >= 0} />
                <Arrow />
                <ArchitectureBox title="MCP Gateway" isActive={runtimeStatus !== 'idle' && activeAgentIndex >= 0} />
                <Arrow />
                <ArchitectureBox title="Multi-Agent System (CrewAI)" isActive={runtimeStatus === 'running' && activeAgentIndex < 4} />
                <Arrow />
                <ArchitectureBox title="Qwen 8B Runtime" isActive={runtimeStatus === 'completed' || (runtimeStatus === 'running' && activeAgentIndex === 4)} />
                <Arrow />
                <ArchitectureBox title="POSTGRES Vector DB" isActive={runtimeStatus === 'completed' || (runtimeStatus === 'running' && (activeAgentIndex === 1 || activeAgentIndex === 2))} />
              </div>
            </div>
          </div>
        </div>

        {/* RAGAS Section */}
        <div className="mt-8 bg-white/5 border border-cyan-500/20 rounded-3xl p-8 backdrop-blur-xl shadow-2xl shadow-cyan-500/10">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-2xl font-semibold text-cyan-300">
                RAGAS EVALUATION
              </h3>
              <p className="text-gray-500 mt-2">
                Retrieval-Augmented Generation Assessment
              </p>
            </div>

            <div className={`px-4 py-2 rounded-full border text-sm transition-all duration-500 ${
              runtimeStatus === 'completed' ? 'border-green-500/30 bg-green-500/10 text-green-300' : 'border-gray-500/30 bg-gray-500/10 text-gray-400'
            }`}>
              {runtimeStatus === 'completed' ? 'Evaluation Completed' : runtimeStatus === 'running' ? 'Calculating Metrics...' : 'Pending Pipeline Run'}
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <MetricCard label="Faithfulness" value={runtimeStatus === 'completed' ? "0.75" : "0.00"} />
            <MetricCard label="Answer Relevancy" value={runtimeStatus === 'completed' ? "0.62" : "0.00"} />
            <MetricCard label="Context Precision" value={runtimeStatus === 'completed' ? "0.70" : "0.00"} />
            <MetricCard label="Context Recall" value={runtimeStatus === 'completed' ? "1.00" : "0.00"} />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-cyan-500/10 bg-black/30 backdrop-blur-xl py-8 text-center text-gray-500 text-sm">
        © 2026 EITA INNOV — Sovereign AI Infrastructure
      </footer>
      {isArchitectureOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl transition-all duration-500"
          onClick={() => setIsArchitectureOpen(false)} // Ferme si on clique à côté
        >
          {/* Bouton de fermeture global (Croix) */}
          <button 
            onClick={() => setIsArchitectureOpen(false)}
            className="absolute top-6 right-6 p-3 bg-black/50 border border-cyan-500/30 text-gray-300 hover:text-white hover:bg-cyan-500/20 rounded-xl transition-all duration-300 z-50 backdrop-blur-md"
          >
            ✕ Close Viewer
          </button>

          {/* Conteneur de l'animation (arrête la propagation du clic pour ne pas fermer quand on clique sur l'animation) */}
          <div 
            className="w-full max-w-7xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-[0_0_80px_rgba(0,209,255,0.15)] custom-scrollbar"
            onClick={(e) => e.stopPropagation()} 
          >
            <AnimatedArchitecture />
          </div>
        </div>
      )}
    </div>
  );
}



function Stat({ label, value }) {
  return (
    <div className="flex items-center justify-between border-b border-white/5 pb-3">
      <span className="text-gray-400">{label}</span>
      <span className="text-cyan-300 font-semibold">{value}</span>
    </div>
  );
}

function Agent({ name, status }) {
  const getStatusStyles = () => {
    switch (status) {
      case "ACTIVE":
        return { text: "text-green-400", dot: "bg-green-400 animate-pulse shadow-[0_0_8px_#4ade80]", bg: "border-green-500/30 bg-green-500/5" };
      case "COMPLETED":
        return { text: "text-cyan-400/70", dot: "bg-cyan-500/40", bg: "border-cyan-500/10 bg-black/40" };
      case "STANDBY":
      default:
        return { text: "text-yellow-500/70", dot: "bg-yellow-500/40", bg: "border-cyan-500/5 bg-black/10" };
    }
  };

  const styles = getStatusStyles();

  return (
    <div className={`flex items-center justify-between px-4 py-3 rounded-2xl border transition-all duration-300 ${styles.bg}`}>
      <span className={status === "ACTIVE" ? "text-white font-medium" : "text-gray-400"}>{name}</span>

      <div className={`flex items-center gap-2 text-sm font-mono ${styles.text}`}>
        <div className={`h-2 w-2 rounded-full ${styles.dot}`}></div>
        {status}
      </div>
    </div>
  );
}

function ArchitectureBox({ title, isActive }) {
  return (
    <div className={`px-4 py-3 rounded-2xl border transition-all duration-500 text-center text-sm ${
      isActive 
        ? 'border-cyan-400 bg-cyan-500/10 text-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.15)] font-medium' 
        : 'border-cyan-500/20 bg-black/30 text-cyan-200/50'
    }`}>
      {title}
    </div>
  );
}

function Arrow() {
  return <div className="text-center text-cyan-500/40 select-none">↓</div>;
}

function MetricCard({ label, value }) {
  const numericValue = parseFloat(value);
  return (
    <div className="bg-black/30 border border-cyan-500/20 rounded-2xl p-6 transition-all duration-300">
      <div className="text-gray-400 text-sm mb-3">{label}</div>

      <div className="flex items-end justify-between">
        <div className={`text-4xl font-black transition-colors duration-500 ${numericValue > 0 ? 'text-cyan-300' : 'text-gray-600'}`}>
          {value}
        </div>

        <div className="h-16 w-3 rounded-full bg-cyan-500/10 overflow-hidden inner-shadow">
          <div
            className="w-full bg-cyan-400 rounded-full transition-all duration-1000 ease-out"
            style={{ height: `${numericValue * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}

