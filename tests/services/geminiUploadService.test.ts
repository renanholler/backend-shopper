import { GoogleAIFileManager } from '@google/generative-ai/server';

jest.mock('@google/generative-ai/server', () => {
  return {
    GoogleAIFileManager: jest.fn().mockImplementation(() => ({
      uploadFile: jest.fn(),
    })),
  };
});

jest.mock('../../src/app/utils/createError', () => {
  return {
    createError: jest.fn((status, code, message) => {
      return new Error(message);
    }),
  };
});

const uploadImage = jest.fn((filePath, displayName, mimeType) => {
  return Promise.resolve('gs://bucket/file.png');
});

jest.mock('../../src/app/services/geminiUploadService', () => {
  return {
    uploadImage,
  };
});

const mockedFileManager = new GoogleAIFileManager('dummy-key');

describe('uploadImage', () => {
  const filePath = 'path/to/file.png';
  const displayName = 'Test Image';
  const mimeType = 'png';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return the file URI after a successful upload', async () => {
    (mockedFileManager.uploadFile as jest.Mock).mockResolvedValue({
      file: { uri: 'gs://bucket/file.png' },
    });

    const result = await uploadImage(filePath, displayName, mimeType);
    expect(result).toBe('gs://bucket/file.png');
  });
});
