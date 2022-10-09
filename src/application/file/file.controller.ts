import { Router } from 'express';

import { uploadFile } from './utils';
const FileController = Router();

FileController.route('').post(uploadFile);

export default FileController;
