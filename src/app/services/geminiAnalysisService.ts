import { GoogleGenerativeAI } from '@google/generative-ai';
import 'dotenv/config';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

export async function analyzeImage(
  uri: string,
  mimeType: string,
): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
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
    return result.response.text();
  } catch (error) {
    console.error('Error analyzing image:', error);
    throw new Error('Failed to analyze image');
  }
}
