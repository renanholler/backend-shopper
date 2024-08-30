import { model, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export const Measure = model(
  'Measure',
  new Schema({
    measure_uuid: {
      type: String,
      default: uuidv4,
      unique: true,
    },
    image_url: {
      type: String,
      required: false,
    },
    measure_value: {
      type: Number,
      required: false,
    },
    customer_code: {
      type: String,
      required: true,
    },
    measure_datetime: {
      type: Date,
      required: true,
    },
    measure_type: {
      type: String,
      required: true,
      enum: ['WATER', 'GAS'],
    },
    has_confirmed: {
      type: Boolean,
      default: false,
    },
  }),
);
