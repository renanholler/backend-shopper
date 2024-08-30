import {
  extractMimeType,
  isValidBase64,
} from '../../src/app/utils/base64Validator';

describe('Base64 Validator Utilities', () => {
  describe('isValidBase64', () => {
    it('should return true for valid base64 image strings', () => {
      const validBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...';
      expect(isValidBase64(validBase64)).toBe(true);
    });

    it('should return false for invalid base64 strings', () => {
      const invalidBase64 = 'invalid_base64_string';
      expect(isValidBase64(invalidBase64)).toBe(false);
    });

    it('should return false for base64 strings with unsupported MIME types', () => {
      const unsupportedBase64 =
        'data:image/gif;base64,R0lGODlhPQBEAPeoAJosM....';
      expect(isValidBase64(unsupportedBase64)).toBe(false);
    });
  });

  describe('extractMimeType', () => {
    it('should extract the correct MIME type from a valid base64 string', () => {
      const base64 = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...';
      expect(extractMimeType(base64)).toBe('jpeg');
    });

    it('should throw an error if the base64 string format is invalid', () => {
      const invalidBase64 = 'invalid_base64_string';
      expect(() => extractMimeType(invalidBase64)).toThrow(
        'Failed to extract MIME type',
      );
    });

    it('should throw an error if the base64 string has unsupported MIME type', () => {
      const unsupportedBase64 =
        'data:image/gif;base64,R0lGODlhPQBEAPeoAJosM....';
      expect(() => extractMimeType(unsupportedBase64)).toThrow(
        'Failed to extract MIME type',
      );
    });
  });
});
