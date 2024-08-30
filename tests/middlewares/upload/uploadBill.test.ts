import { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { uploadBill } from '../../../src/app/middlewares/upload/uploadBill';
import { uploadImage } from '../../../src/app/services/geminiUploadService';

jest.mock('fs');
jest.mock('path');
jest.mock('../../../src/app/services/geminiUploadService');

describe('uploadBill Middleware', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;
  const tempFilePath = 'temp_image.png';

  beforeEach(() => {
    req = { body: { image: 'fake_image_data', mime_type: 'png' } };
    res = {};
    next = jest.fn();

    (path.join as jest.Mock).mockReturnValue(tempFilePath);
    (fs.writeFileSync as jest.Mock).mockImplementation(() => {});
    (fs.unlinkSync as jest.Mock).mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should upload the image and set the image_url in req.body', async () => {
    (uploadImage as jest.Mock).mockResolvedValue(
      'http://example.com/image.png',
    );

    await uploadBill(req as Request, res as Response, next);

    expect(fs.writeFileSync).toHaveBeenCalledWith(tempFilePath, req.body.image);
    expect(uploadImage).toHaveBeenCalledWith(
      tempFilePath,
      'Bill',
      req.body.mime_type,
    );
    expect(fs.unlinkSync).toHaveBeenCalledWith(tempFilePath);
    expect(req.body.image_url).toBe('http://example.com/image.png');
    expect(next).toHaveBeenCalled();
  });

  it('should call next with an error if upload fails', async () => {
    const error = new Error('Upload failed');
    (uploadImage as jest.Mock).mockRejectedValue(error);

    await uploadBill(req as Request, res as Response, next);

    expect(fs.writeFileSync).toHaveBeenCalledWith(tempFilePath, req.body.image);
    expect(uploadImage).toHaveBeenCalledWith(
      tempFilePath,
      'Bill',
      req.body.mime_type,
    );
    expect(fs.unlinkSync).toHaveBeenCalledWith(tempFilePath);
    expect(next).toHaveBeenCalledWith(error);
  });
});
