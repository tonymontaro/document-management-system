import express from 'express';
import morgan from 'morgan';

const app = express();
const port = process.env.PORT || 8080;

app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send({ message: 'Welcome to the future, yeah!' });
});

app.listen(port, () => {
  console.log('Magic happening at: ', port);
});

// Export the server for testing
export default app;
