import express from 'express';
import morgan from 'morgan';
import routes from './routes';

const app = express();
let port = process.env.PORT || 3000;

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  port = 8080;
}

routes(app);

app.get('/', (req, res) => {
  res.send({ message: 'Welcome to the future, yeah!' });
});

app.listen(port);

// Export the server for testing
export default app;
