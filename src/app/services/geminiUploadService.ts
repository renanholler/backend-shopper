import { GoogleAIFileManager } from '@google/generative-ai/server';
import 'dotenv/config';

const fileManager = new GoogleAIFileManager(
  process.env.GEMINI_API_KEY as string,
);

export async function uploadImage(
  filePath: string,
  displayName: string,
  mimeType: string,
): Promise<string> {
  const uploadResponse = await fileManager.uploadFile(filePath, {
    mimeType: `image/${mimeType}`,
    displayName,
  });
  return uploadResponse.file.uri;
}
