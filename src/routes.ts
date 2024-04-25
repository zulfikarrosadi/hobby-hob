import { Express, Request, Response } from 'express';
import {
  createUserHandler,
  createUserProfileHandler,
  getUserProfileHandler,
} from './controllers/user.controller';
import {
  logOutUserHandler,
  loginUserHandler,
  refreshToken,
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
  getHobbyByIdHandler,
  getInfiniteHobbiesHandler,
  getInfiniteHobbyAndUserHandler,
} from './controllers/hobby.controller';
import {
  createPost,
  deletePost,
  getPosts,
  updatePost,
} from './controllers/post.controller';
import { createPostSchema, updatePostSchema } from './schemas/post.schema';

export default function routes(app: Express) {
  app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200));
  app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

  app.post(
    '/api/register',
    validateInput(createUserInputSchema),
    createUserHandler,
  );
  app.post('/api/login', validateInput(loginInputSchema), loginUserHandler);
  app.get('/api/refresh', refreshToken);

  app.use(deserializeUser);
  app.use(requireUser);

  app.patch(
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
  app.get('/api/hobbies/:hobbyId', getHobbyByIdHandler);
  app.get('/api/hobbies/:cursor', getInfiniteHobbiesHandler);
  app.get('/api/hobbies/users/:hobbyId', getHobbyAndUserHandler);
  app.get(
    '/api/hobbies/users/:hobbyId/:userProfileId',
    getInfiniteHobbyAndUserHandler,
  );

  app.get('/api/hobbies/:hobbyId/posts', getPosts);
  app.post('/api/posts', validateInput(createPostSchema), createPost);
  app.put('/api/posts/:postId', validateInput(updatePostSchema), updatePost);
  app.delete('/api/posts/:postId', deletePost);

  app.delete('/api/logout', logOutUserHandler);
  app.get('/api/user/:userProfileId', getUserProfileHandler);
}
