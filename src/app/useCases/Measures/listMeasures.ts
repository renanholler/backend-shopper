import { Request, Response } from 'express';

export async function listMeasure(req: Request, res: Response) {
  res.send('rota do List');
}
