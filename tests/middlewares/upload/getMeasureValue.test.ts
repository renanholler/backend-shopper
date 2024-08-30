// /tests/middlewares/upload/getMeasureValue.test.ts
import { NextFunction, Request, Response } from 'express';
import { getMeasureValue } from '../../../src/app/middlewares/upload/getMeasureValue';
import { analyzeImage } from '../../../src/app/services/geminiAnalysisService';

// Mock da função analyzeImage
jest.mock('../../../src/app/services/geminiAnalysisService', () => ({
  analyzeImage: jest.fn(),
}));

describe('getMeasureValue Middleware', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction = jest.fn();

  beforeEach(() => {
    req = {
      body: {
        image_url: 'http://example.com/image.png',
        mime_type: 'image/png',
      },
    };
    res = {};
    jest.clearAllMocks();
  });

  it('should set measure_value in req.body if analyzeImage returns a valid value', async () => {
    (analyzeImage as jest.Mock).mockResolvedValue('42');

    await getMeasureValue(req as Request, res as Response, next);

    expect(req.body.measure_value).toBe(42);
    expect(next).toHaveBeenCalledWith(); // Chama next sem erros
  });

  it('should handle errors from analyzeImage and call next with an error', async () => {
    (analyzeImage as jest.Mock).mockRejectedValue(new Error('Analysis error'));

    await getMeasureValue(req as Request, res as Response, next);

    // Verifica se next foi chamado com o erro correto
    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({
        statusCode: 500,
        error_code: 'ANALYZE_IMAGE_FAILED',
        error_description: 'Falha ao analisar a imagem.',
      }),
    );
  });
});
