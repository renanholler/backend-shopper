import { GoogleAIFileManager } from '@google/generative-ai/server';
import 'dotenv/config';
import { createError } from '../utils/createError';

const fileManager = new GoogleAIFileManager(process.env.GEMINI_API_KEY as string);

export async function uploadImage(filePath: string, displayName: string, mimeType: string): Promise<string> {
  try {
    const uploadResponse = await fileManager.uploadFile(filePath, {
      mimeType: `image/${mimeType}`,
      displayName,
    });

    if (uploadResponse?.file?.uri) {
      return uploadResponse.file.uri;
    } else {
      throw createError(500, 'UPLOAD_ERROR', 'O upload não retornou o URI do arquivo como esperado.');
    }
  } catch (error) {
    console.error('Erro ao fazer upload da imagem:', error);
    throw createError(500, 'UPLOAD_FAILED', 'Falha ao fazer upload da imagem.');
  }
}
