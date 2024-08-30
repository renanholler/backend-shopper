import mongoose from 'mongoose';
import { Measure } from '../../src/app/models/Measure';

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/testdb');
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Measure Model', () => {
  it('should create a new measure', async () => {
    const measure = new Measure({
      image_url: 'http://example.com/image.png',
      customer_code: 'customer1',
      measure_datetime: new Date(),
      measure_type: 'WATER',
      measure_value: 100,
    });

    const savedMeasure = await measure.save();

    expect(savedMeasure).toHaveProperty('measure_uuid');
    expect(savedMeasure.measure_type).toBe('WATER');
  });

  it('should fail to create a measure with invalid measure_type', async () => {
    const measure = new Measure({
      image_url: 'http://example.com/image.png',
      customer_code: 'customer1',
      measure_datetime: new Date(),
      measure_type: 'INVALID_TYPE',
    });

    await expect(measure.save()).rejects.toThrow();
  });
});
