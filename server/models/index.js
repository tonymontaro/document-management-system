import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import configuration from '../config/config';

const basename = path.basename(module.filename);
const env = process.env.NODE_ENV || 'development';
const config = configuration[env];
const db = {};
const sequelize = new Sequelize(process.env[config.use_env_variable]);

fs
  .readdirSync(__dirname)
  .filter(file =>
    (file.indexOf('.') !== 0)
    && (file !== basename)
    && (file.slice(-3) === '.js')
  )
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
