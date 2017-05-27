module.exports = (sequelize, DataTypes) => {
  const Document = sequelize.define('Document', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { args: true, msg: 'Title already exist' },
      validate: { notEmpty: { args: true, msg: 'Title cannot be empty' } }
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: { notEmpty: { args: true, msg: 'Content cannot be empty' } }
    },
    access: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'public',
      validate: { isIn: { args: [['public', 'private', 'role']], msg: 'Use a valid access type' } }
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    classMethods: {
      associate(models) {
        Document.belongsTo(models.User, {
          foreignKey: 'authorId',
          onDelete: 'SET NULL'
        });
      }
    }
  });
  return Document;
};
