import { Express, Request, Response } from 'express';
import {
  createUserHandler,
  createUserProfileHandler,
} from './controllers/user.controller';
import {
  logOutUserHandler,
  loginUserHandler,
} from './controllers/auth.controller';
import deserializeUser from './middlewares/deserializeUser';
import requireUser from './middlewares/requireUser';
import {
  createUserInputSchema,
  createUserProfileInputSchema,
} from './schemas/user.schema';
import { loginInputSchema } from './schemas/auth.schema';
import { validateInput } from './utils/validateAndThrow';
import swaggerUI from 'swagger-ui-express';
import swaggerDocs from './../swagger.json';
import { createUserHobbyInputSchema } from './schemas/hobby.schema';
import {
  addHobbyToUserHandler,
  getHobbiesHandler,
  getHobbyAndUserHandler,
  getInfiniteHobbiesHandler,
  getInfiniteHobbyAndUserHandler,
} from './controllers/hobby.controller';

export default function routes(app: Express) {
  app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200));
  app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

  app.post(
    '/api/register',
    validateInput(createUserInputSchema),
    createUserHandler,
  );
  app.post('/api/login', validateInput(loginInputSchema), loginUserHandler);

  app.use(deserializeUser);
  app.use(requireUser);

  app.post(
    '/api/user/profile',
    validateInput(createUserProfileInputSchema),
    createUserProfileHandler,
  );
  app.post(
    '/api/user/hobby',
    validateInput(createUserHobbyInputSchema),
    addHobbyToUserHandler,
  );
  app.get('/api/hobbies', getHobbiesHandler);
  app.get('/api/hobbies/:cursor', getInfiniteHobbiesHandler);
  app.get('/api/hobies/users/:hobbyName', getHobbyAndUserHandler);
  app.get(
    '/api/hobbies/users/:hobbyName/:hobbyId/:userProfileId',
    getInfiniteHobbyAndUserHandler,
  );

  app.delete('/api/logout', logOutUserHandler);
  app.get('/api/user', (req, res) =>
    res.status(200).json({ user: res.locals.user }),
  );
}
