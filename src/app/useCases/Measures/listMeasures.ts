import { Request, Response } from 'express';
import { Measure } from '../../models/Measure';

export async function listMeasures(req: Request, res: Response) {
  try {
    const { customer_code } = req.params;
    const { measure_type } = req.query;

    const measures = await Measure.find(
      measure_type ? { customer_code, measure_type } : { customer_code },
    );
    if (measures.length === 0) {
      return res.status(404).json({
        error_code: 'MEASURES_NOT_FOUND',
        error_description: 'Nenhuma leitura encontrada',
      });
    }
    res.status(200).json({
      customer_code,
      measures: measures.map(
        ({
          measure_uuid,
          measure_datetime,
          measure_type,
          has_confirmed,
          image_url,
        }) => ({
          measure_uuid,
          measure_datetime,
          measure_type,
          has_confirmed,
          image_url,
        }),
      ),
    });
  } catch (error) {
    console.error('Error listing measures:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}
