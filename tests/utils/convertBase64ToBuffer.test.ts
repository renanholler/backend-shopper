import { convertBase64ToBuffer } from '../../src/app/utils/convertBase64ToBuffer';

describe('convertBase64ToBuffer', () => {
  it('should convert a valid base64 string to a buffer', () => {
    const base64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...';
    const buffer = convertBase64ToBuffer(base64);

    expect(buffer).toBeInstanceOf(Buffer);
    expect(buffer.length).toBeGreaterThan(0);
  });

  it('should not throw an error if the base64 string is invalid', () => {
    const invalidBase64 = 'invalid_base64_string';
    const buffer = convertBase64ToBuffer(invalidBase64);

    expect(buffer).toBeInstanceOf(Buffer);
  });

  it('should not throw an error if the base64 string has an unsupported format', () => {
    const unsupportedBase64 = 'data:application/pdf;base64,JVBERi0xLjQKJcTl8u...';
    const buffer = convertBase64ToBuffer(unsupportedBase64);
    expect(buffer).toBeInstanceOf(Buffer);
  });
});
