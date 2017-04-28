/* eslint no-console: "off" */
import morgan from 'morgan';
import app from './app';

let port = process.env.PORT || 3000;
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  port = 8080;
}

app.listen(port, () => {
  console.log('Magic happening at: ', port);
});


