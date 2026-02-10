import { GoogleGenAI, Type } from "@google/genai";
import { InputData, AnalysisResult } from "../types";

export const analyzeMatch = async (resume: InputData, jd: InputData): Promise<AnalysisResult> => {
  // Check if API key exists, otherwise throw to be caught by component
  const apiKey = process.env.REACT_APP_API_KEY || 
                 (import.meta as any).env?.VITE_API_KEY ||
                  process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API key is missing. Please ensure process.env.API_KEY is configured.");
  }

  const ai = new GoogleGenAI({ apiKey: apiKey});
  
  const parts: any[] = [
    { text: "You are an expert technical recruiter and ATS (Applicant Tracking System) simulator. Analyze the provided candidate's Resume against the provided Job Description." }
  ];

  parts.push({ text: "\n--- RESUME START ---\n" });
  if (resume.type === 'text') {
    parts.push({ text: resume.content });
  } else if (resume.type === 'file' && resume.mimeType) {
    parts.push({
      inlineData: {
        mimeType: resume.mimeType,
        data: resume.content
      }
    });
  }
  parts.push({ text: "\n--- RESUME END ---\n" });

  parts.push({ text: "\n--- JOB DESCRIPTION START ---\n" });
  if (jd.type === 'text') {
    parts.push({ text: jd.content });
  } else if (jd.type === 'file' && jd.mimeType) {
    parts.push({
      inlineData: {
        mimeType: jd.mimeType,
        data: jd.content
      }
    });
  }
  parts.push({ text: "\n--- JOB DESCRIPTION END ---\n" });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: { parts },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: {
              type: Type.NUMBER,
              description: "An integer from 0 to 100 representing how well the resume matches the job description."
            },
            missingKeywords: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Exactly 3 crucial keywords, skills, or requirements missing from the resume but present in the JD."
            },
            feedback: {
              type: Type.STRING,
              description: "A short, encouraging one-sentence feedback summarizing the gap."
            },
            tips: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Exactly 3 highly actionable, specific tips for the candidate to improve their resume based on the job description to increase their match score."
            }
          },
          required: ["score", "missingKeywords", "feedback", "tips"]
        }
      }
    });

    const textOutput = response.text || "{}";
    const result: AnalysisResult = JSON.parse(textOutput);
    return result;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
