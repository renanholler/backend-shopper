import { GoogleGenerativeAI } from '@google/generative-ai';
import 'dotenv/config';
import { createError } from '../utils/createError';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

export async function analyzeImage(uri: string, mimeType: string): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent([
      {
        fileData: {
          mimeType: `image/${mimeType}`,
          fileUri: uri,
        },
      },
      {
        text: "Return the value of the bill, only the value. If the value has ',', change to '.' (float value)",
      },
    ]);
    if (result?.response?.text) {
      return result.response.text();
    } else {
      throw createError(500, 'AI_RESPONSE_ERROR', 'A resposta do modelo não foi como esperado.');
    }
  } catch (error) {
    console.error('Erro ao analisar imagem:', error);
    throw createError(500, 'ANALYZE_IMAGE_FAILED', 'Falha ao analisar a imagem.');
  }
}
