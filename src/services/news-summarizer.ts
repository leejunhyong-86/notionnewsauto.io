import { GoogleGenerativeAI } from '@google/generative-ai';
import { config } from '../config/env.js';

let genAI: GoogleGenerativeAI | null = null;

// Gemini API 초기??
if (config.ai.geminiApiKey) {
  genAI = new GoogleGenerativeAI(config.ai.geminiApiKey);
}

/**
 * ?�스�??��?�?번역?�고 ??줄로 ?�약
 */
export async function summarizeNewsInKorean(
  title: string,
  description?: string
): Promise<string | null> {
  // API ?��? ?�으�??�약?��? ?�음
  if (!genAI || !config.ai.geminiApiKey) {
    console.log('?�️ Gemini API ?��? ?�정?��? ?�아 ?�약??건너?�니??');
    return null;
  }

  try {
    // ?�용 가?�한 모델: gemini-2.5-flash (빠르�??�율??, gemini-1.5-pro (고품�?
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    // ?�약 ?�롬?�트
    const prompt = `?�음 ?�스 기사�??��?�?번역?�고 ??줄로 ?�약?�주?�요. ?�약?� 50???�내�?간결?�게 ?�성?�주?�요.

?�목: ${title}
${description ? `?�용: ${description.substring(0, 500)}` : ''}

??�??�약 (?��?, 50???�내):`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const summary = response.text().trim();

    return summary;
  } catch (error) {
    console.error('?�스 ?�약 ?�패:', error);
    return null;
  }
}
