import React, { useState, useEffect } from 'react';
import { Routes, Route, NavLink, Navigate, useLocation } from 'react-router-dom';
import { Moon, Sun, Menu, X, BookOpen, Server, Layers, Coffee, Cpu, Database, Terminal, Code } from 'lucide-react';
import { roadmaps, RoadmapKey } from './data';
import { RoadmapViewer } from './components/RoadmapViewer';

const navItems: { key: RoadmapKey; path: string; label: string; icon: React.ReactNode; comingSoon?: boolean }[] = [
  { key: 'cpp', path: '/cpp', label: 'Advanced C++', icon: <Cpu className="w-5 h-5" /> },
  { key: 'rust', path: '/rust', label: 'Rust', icon: <Terminal className="w-5 h-5" /> },
  { key: 'javaCore', path: '/java', label: 'Core Java', icon: <Coffee className="w-5 h-5" /> },
  { key: 'springBoot', path: '/spring-boot', label: 'Spring Boot', icon: <Layers className="w-5 h-5" /> },
  { key: 'hibernate', path: '/hibernate', label: 'Hibernate ORM', icon: <Database className="w-5 h-5" /> },
  { key: 'docker', path: '/docker', label: 'Docker & K8s', icon: <BookOpen className="w-5 h-5" /> },
  { key: 'microservices', path: '/microservices', label: 'Microservices', icon: <Server className="w-5 h-5" /> },
  { key: 'react', path: '/react', label: 'React', icon: <Code className="w-5 h-5" /> },
];

function RoadmapPage({ dataKey }: { dataKey: RoadmapKey }) {
  const data = roadmaps[dataKey];
  return <RoadmapViewer data={data} />;
}

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Handle dark mode class on HTML element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row transition-colors duration-300">
      
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50">
        <div className="font-bold text-xl text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
          <img src="/logo.png" alt="CodingsVibes" className="w-8 h-8 rounded-lg object-cover" />
          CodingsVibes
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-full text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`
        ${isMobileMenuOpen ? 'fixed inset-0 z-40 mt-[73px]' : 'hidden'} 
        md:mt-0 md:sticky md:top-0 md:flex flex-col w-full md:w-72 h-[calc(100vh-73px)] md:h-screen 
        bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 shrink-0
      `}>
        <div className="hidden md:flex items-center justify-between p-6 pb-2">
          <div className="font-black text-2xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center gap-2">
            <img src="/logo.png" alt="CodingsVibes" className="w-10 h-10 rounded-xl object-cover" />
            CodingVibes
          </div>
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-full text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors"
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          <div className="px-3 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Available Roadmaps
          </div>
          {navItems.map((item) => (
            <NavLink
              key={item.key}
              to={item.path}
              className={({ isActive }) => `
                w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 font-medium
                ${item.comingSoon ? 'opacity-60 cursor-default grayscale pointer-events-none' : ''}
                ${isActive 
                  ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 shadow-sm' 
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200'}
              `}
            >
              {item.icon}
              {item.label}
              {item.comingSoon && <span className="ml-auto text-[10px] uppercase tracking-wider bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded-md text-slate-500">Coming Soon</span>}
            </NavLink>
          ))}
        </div>

      </aside>

      {/* Main Content Area */}
      <main className="flex-1 w-full bg-slate-50 dark:bg-slate-950 overflow-y-auto">
        <Routes>
          <Route path="/" element={<Navigate to="/cpp" replace />} />
          <Route path="/cpp" element={<RoadmapPage dataKey="cpp" />} />
          <Route path="/rust" element={<RoadmapPage dataKey="rust" />} />
          <Route path="/java" element={<RoadmapPage dataKey="javaCore" />} />
          <Route path="/spring-boot" element={<RoadmapPage dataKey="springBoot" />} />
          <Route path="/hibernate" element={<RoadmapPage dataKey="hibernate" />} />
          <Route path="/docker" element={<RoadmapPage dataKey="docker" />} />
          <Route path="/microservices" element={<RoadmapPage dataKey="microservices" />} />
          <Route path="/react" element={<RoadmapPage dataKey="react" />} />
          <Route path="*" element={<Navigate to="/cpp" replace />} />
        </Routes>
      </main>
      
    </div>
  );
}
