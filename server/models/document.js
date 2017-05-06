module.exports = (sequelize, DataTypes) => {
  const Document = sequelize.define('Document', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { notEmpty: true }
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: { notEmpty: true }
    },
    access: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'public',
      validate: { isIn: [['public', 'private', 'role']] }
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    authorRoleId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    classMethods: {
      associate(models) {
        Document.belongsTo(models.User, {
          foreignKey: 'authorId',
          onDelete: 'CASCADE'
        });
      }
    }
  });
  return Document;
};
