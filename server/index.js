import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import routes from './routes';

if (process.env.NODE_ENV === 'development') {
  // load environmental variables
  dotenv.config();
}

const app = express();
const port = process.env.PORT || 8080;

app.use(morgan('dev'));

routes(app);

app.get('/', (req, res) => {
  res.send({ message: 'Welcome to the future, yeah!' });
});

app.listen(port);

// Export the server for testing
export default app;
