import type { Request, Response } from '@gln-libs/node-infrastructure';
import * as fs from 'fs';
import * as multipart from 'parse-multipart-data';

import { fileConfig } from '../../config';

const getBoundary = (headers): string => {
  const header: string = headers['content-type']?.toString() || '';

  const boundary = multipart.getBoundary(header);

  return boundary;
};

const getBuffers = async (req: Request): Promise<Buffer> => {
  const buffers = [];

  for await (const chunk of req) {
    buffers.push(chunk);
  }
  const data = Buffer.concat(buffers);

  return data;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const writeFileByBuffer = (parts: Array<any>): void => {
  for (let index = 0; index < parts.length; index++) {
    const { filename, data } = parts[index];
    // eslint-disable-next-line no-loop-func
    fs.writeFile(`${fileConfig.rootPath}/${filename}`, data, (error): void => {
      if (error) {
        logger.info(error.message);
      }
    });
  }
};

export const uploadFile = async (
  req: Request,
  res: Response
): Promise<Response> => {
  // Get boundary
  const boundary: string = getBoundary(req.headers);

  // Get buffers
  const buffers: Buffer = await getBuffers(req);

  // Parse datas
  const parts = multipart.parse(buffers, boundary);

  if (!parts.length) {
    res.resError('Error');
    return;
  }

  // Write file
  writeFileByBuffer(parts);

  res.resSuccess('Success');
};
