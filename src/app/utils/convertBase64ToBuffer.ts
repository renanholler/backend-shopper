export function convertBase64ToBuffer(base64: string): Buffer {
  try {
    const base64Data = base64.replace(/^data:image\/\w+;base64,/, '');
    return Buffer.from(base64Data, 'base64');
  } catch (error) {
    console.error('Error converting base64 to buffer:', error);
    throw new Error('Failed to convert base64 to buffer');
  }
}
