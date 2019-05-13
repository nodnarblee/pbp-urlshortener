import models, { sequelize } from '../models/index'

export default async function truncate() {
  return await Promise.all(
    Object.values(sequelize.models).map(model => {
      return model.destroy({ truncate: true });
    })
  );
}
