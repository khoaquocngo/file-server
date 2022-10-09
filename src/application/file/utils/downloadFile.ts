import type { Request, Response } from '@gln-libs/node-infrastructure';
import * as fs from 'fs';

import { fileConfig } from '../../config';

export const downloadFile = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { fileName } = req.params;

  const filePath = `${fileConfig.rootPath}/${fileName}`;

  const fileExists: boolean = fs.existsSync(filePath);
  if (!fileExists) {
    res.resError('File not found!');
    return;
  }

  const readStream = fs.createReadStream(filePath);

  readStream.on('open', () => {
    readStream.pipe(res);
  });

  readStream.on('error', err => {
    res.end(err);
  });
};
