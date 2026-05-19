export interface Topic {
  id: number;
  concept: string;
  description: string;
  real_world_example: string;
  code: string;
  practice_questions?: string[];
}

export interface Level {
  level: string;
  topics: Topic[];
}

export interface RoadmapSummary {
  total_concepts: number;
  levels: Record<string, number>;
  standards_covered: string[];
  key_themes: string[];
}

export interface RoadmapData {
  title: string;
  version: string;
  language: string;
  levels: Level[];
  summary: RoadmapSummary;
}
