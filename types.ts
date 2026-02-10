export interface InputData {
  type: 'text' | 'file';
  content: string; // text string OR base64 data
  mimeType?: string;
  fileName?: string;
}

export interface AnalysisResult {
  score: number;
  missingKeywords: string[];
  feedback: string;
  tips: string[];
}
