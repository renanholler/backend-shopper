export function isValidBase64(base64: string): boolean {
  const base64Regex = /^(data:image\/(png|jpeg|webp|heic|heif);base64,)/;
  return base64Regex.test(base64);
}

export function extractMimeType(base64: string): string {
  try {
    const match = base64.match(/^data:image\/(png|jpeg|webp|heic|heif);base64,/);
    if (!match) throw new Error('Invalid base64 format');
    return match[1];
  } catch (error) {
    console.error('Error extracting MIME type:', error);
    throw new Error('Failed to extract MIME type');
  }
}
