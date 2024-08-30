import { analyzeImage } from '../../src/app/services/geminiAnalysisService';

jest.mock('../../src/app/services/geminiAnalysisService', () => ({
  analyzeImage: jest.fn(),
}));

describe('analyzeImage', () => {
  const uri = 'gs://bucket/file.png';
  const mimeType = 'png';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return the text response after successful analysis', async () => {
    // Mock the function to return the expected response
    (analyzeImage as jest.Mock).mockResolvedValue('100.00');

    const result = await analyzeImage(uri, mimeType);
    expect(result).toBe('100.00');
  });

  it('should throw an error if the response does not contain text', async () => {
    // Mock the function to throw an error
    (analyzeImage as jest.Mock).mockRejectedValue(
      new Error('A resposta do modelo não foi como esperado.'),
    );

    await expect(analyzeImage(uri, mimeType)).rejects.toThrow(
      'A resposta do modelo não foi como esperado.',
    );
  });

  it('should call createError and throw when analysis fails', async () => {
    // Mock the function to throw a generic error
    (analyzeImage as jest.Mock).mockRejectedValue(
      new Error('Falha ao analisar a imagem.'),
    );

    await expect(analyzeImage(uri, mimeType)).rejects.toThrow(
      'Falha ao analisar a imagem.',
    );
  });
});
