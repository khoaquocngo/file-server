import type { Request, Response } from '@gln-libs/node-infrastructure';

export const example = async (req: Request, res: Response): Promise<void> => {
  res.resSuccess('This is File Server');
};
