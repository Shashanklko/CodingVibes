import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronRight, 
  Code2, 
  Lightbulb, 
  HelpCircle,
  Trophy,
  Star,
  Target,
  Zap
} from 'lucide-react';
import type { RoadmapData, Level, Topic } from '../types/roadmap';

interface Props {
  data: RoadmapData;
}

const levelIcons = {
  Beginner: <Star className="w-5 h-5 text-green-500" />,
  Intermediate: <Target className="w-5 h-5 text-blue-500" />,
  Advanced: <Zap className="w-5 h-5 text-orange-500" />,
  'Top-Notch / Expert': <Trophy className="w-5 h-5 text-purple-500" />,
  'Top-Notch': <Trophy className="w-5 h-5 text-purple-500" />
};

export const RoadmapViewer: React.FC<Props> = ({ data }) => {
  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
          {data.title}
        </h1>
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {data.summary.standards_covered.map((std, i) => (
            <span key={i} className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
              {std}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {Object.entries(data.summary.levels).map(([level, count]) => (
            <div key={level} className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-200 dark:border-slate-700">
              <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400">{count}</div>
              <div className="text-sm font-medium text-slate-500 dark:text-slate-400">{level}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Levels Timeline */}
      <div className="space-y-16">
        {data.levels.map((level, idx) => (
          <LevelSection key={level.level} level={level} index={idx} />
        ))}
      </div>
    </div>
  );
};

const LevelSection: React.FC<{ level: Level; index: number }> = ({ level, index }) => {
  return (
    <div className="relative">
      <div className="sticky top-0 z-10 bg-slate-50/90 dark:bg-slate-950/90 backdrop-blur-md py-4 border-b border-slate-200 dark:border-slate-800 mb-8 flex items-center gap-3">
        {levelIcons[level.level as keyof typeof levelIcons] || <Star className="w-5 h-5 text-indigo-500" />}
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          {level.level} Phase
        </h2>
      </div>
      
      <div className="space-y-6 pl-2 sm:pl-6 border-l-2 border-indigo-100 dark:border-indigo-900/50 ml-4">
        {level.topics.map((topic, idx) => (
          <TopicCard key={topic.id} topic={topic} index={idx + 1} />
        ))}
      </div>
    </div>
  );
};

const TopicCard: React.FC<{ topic: Topic; index: number }> = ({ topic, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Timeline Dot */}
      <div className="absolute -left-[45px] sm:-left-[61px] top-6 w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 border-4 border-slate-50 dark:border-slate-950 flex items-center justify-center text-xs font-bold text-indigo-600 dark:text-indigo-400 shadow-sm">
        {topic.id}
      </div>

      <div 
        className={`bg-white dark:bg-slate-900 rounded-2xl border transition-all duration-300 ${isOpen ? 'border-indigo-500 shadow-lg shadow-indigo-500/10' : 'border-slate-200 dark:border-slate-800 shadow-sm hover:border-indigo-300 dark:hover:border-indigo-700'}`}
      >
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none"
        >
          <h3 className="text-xl font-bold text-slate-900 dark:text-white pr-4">
            {topic.concept}
          </h3>
          <div className="text-slate-400 dark:text-slate-500 flex-shrink-0 bg-slate-50 dark:bg-slate-800 p-2 rounded-full">
            {isOpen ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
          </div>
        </button>

        {isOpen && (
          <div className="px-6 pb-6 pt-2 border-t border-slate-100 dark:border-slate-800/50 space-y-6 animate-in slide-in-from-top-4 fade-in duration-200">
            {/* Description */}
            <div className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
              {topic.description}
            </div>

            {/* Real World Example */}
            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/30 rounded-xl p-5">
              <div className="flex items-center gap-2 text-amber-700 dark:text-amber-500 font-bold mb-2">
                <Lightbulb className="w-5 h-5" />
                Real World Analogy
              </div>
              <p className="text-amber-900 dark:text-amber-200/80 leading-relaxed">
                {topic.real_world_example}
              </p>
            </div>

            {/* Code Snippet */}
            <div className="rounded-xl overflow-hidden bg-slate-900 shadow-inner">
              <div className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-slate-400 text-sm font-mono border-b border-slate-700">
                <Code2 className="w-4 h-4" />
                Snippet
              </div>
              <pre className="p-4 overflow-x-auto text-sm text-slate-50 font-mono leading-relaxed">
                <code>{topic.code}</code>
              </pre>
            </div>

            {/* Practice Questions */}
            {topic.practice_questions && topic.practice_questions.length > 0 && (
              <div className="bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/30 rounded-xl p-5">
                <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-400 font-bold mb-3">
                  <HelpCircle className="w-5 h-5" />
                  Test Your Knowledge
                </div>
                <ul className="space-y-3">
                  {topic.practice_questions.map((q, i) => (
                    <QuestionItem key={i} question={q} index={i} />
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const QuestionItem: React.FC<{ question: any; index: number }> = ({ question, index }) => {
  const [isRevealed, setIsRevealed] = useState(false);
  
  const qText = typeof question === 'string' ? question : question.q || question.question;
  const aText = typeof question === 'string' ? 'Detailed answer will be provided here.' : question.a || question.answer || 'Detailed answer will be provided here.';

  return (
    <li className="flex flex-col gap-2 text-indigo-900 dark:text-indigo-200/80 mb-4">
      <div className="flex items-start gap-3">
        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-xs font-bold text-indigo-600 dark:text-indigo-400 mt-0.5">
          {index + 1}
        </span>
        <div className="flex-1">
          <span className="font-medium">{qText}</span>
          <div className="mt-2">
            {!isRevealed ? (
              <button 
                onClick={() => setIsRevealed(true)}
                className="text-xs font-semibold bg-indigo-100 hover:bg-indigo-200 dark:bg-indigo-900/50 dark:hover:bg-indigo-800 text-indigo-700 dark:text-indigo-300 px-3 py-1 rounded transition-colors"
              >
                Reveal Answer
              </button>
            ) : (
              <div className="text-sm bg-white dark:bg-slate-800 p-3 rounded border border-indigo-100 dark:border-indigo-800/50 text-slate-700 dark:text-slate-300 mt-1 animate-in fade-in duration-200 slide-in-from-top-1">
                <span className="font-bold text-indigo-500 mr-2">A:</span>
                {aText}
              </div>
            )}
          </div>
        </div>
      </div>
    </li>
  );
};
