import { Router } from 'express';

import { example } from './utils';
const ExampleController = Router();

ExampleController.route('').get(example);

export default ExampleController;
