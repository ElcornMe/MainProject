const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ProductPerOrder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ProductPerOrder.init({

  }, {
    sequelize,
    modelName: 'ProductPerOrder',
  });
  return ProductPerOrder;
};
