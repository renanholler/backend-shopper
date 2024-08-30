import { NextFunction, Request, Response } from 'express';
import { base64ToBuffer } from '../../../src/app/middlewares/upload/base64ToBuffer';

jest.mock('../../../src/app/utils/base64Validator', () => ({
  extractMimeType: jest.fn((base64: string) => 'image/png'),
}));

jest.mock('../../../src/app/utils/convertBase64ToBuffer', () => ({
  convertBase64ToBuffer: jest.fn((base64: string) =>
    Buffer.from(base64, 'base64'),
  ),
}));

describe('base64ToBuffer Middleware', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      body: {
        image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...',
      },
    };
    res = {};
    next = jest.fn();
  });

  it('should convert base64 to buffer and extract mime type', () => {
    base64ToBuffer(req as Request, res as Response, next);

    expect(req.body.mime_type).toBe('image/png');
    expect(req.body.image).toBeInstanceOf(Buffer);
    expect(next).toHaveBeenCalledWith();
  });

  it('should call next with an error if image is not provided', () => {
    req.body.image = undefined;

    try {
      base64ToBuffer(req as Request, res as Response, next);
    } catch (error) {
      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Image not provided',
        }),
      );
    }
  });
});
