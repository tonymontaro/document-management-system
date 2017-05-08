import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

routes(app);

app.get('/', (req, res) => {
  res.send({ message: 'Document Manangement System API' });
});

export default app;
