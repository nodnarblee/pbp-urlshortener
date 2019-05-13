const url = (sequelize, DataTypes) => {
  const Url = sequelize.define('url', {
    original_url: {
      type: DataTypes.STRING,
      unique: false,
    },
    shortened_url: {
      type: DataTypes.STRING,
      unique: true,
    },
    url_code: {
      type: DataTypes.STRING,
      unique: true,
    },
  });

  return Url;
};

export default url;
