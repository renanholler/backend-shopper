export function isValidBase64(base64: string): boolean {
  const base64Regex = /^(data:image\/(png|jpeg|webp|heic|heif);base64,)/;
  return base64Regex.test(base64);
}

export function extractMimeType(base64: string): string {
  const match = base64.match(/^data:image\/(png|jpeg|webp|heic|heif);base64,/);
  return match![1];
}
