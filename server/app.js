import express from 'express';
import routes from './routes';

const app = express();

routes(app);

app.get('/', (req, res) => {
  res.send({ message: 'Welcome to the future, yeah!' });
});

export default app;
