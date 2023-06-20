const { Model, DataTypes } = require("sequelize");
const slugify = require("slugify");

class Product extends Model {
  static initModel(sequelize) {
    Product.init(
      {
        id: {
          type: DataTypes.BIGINT.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        abv: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        size: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        stock: {
          type: DataTypes.INTEGER,
          validate: {
            nonNegative(value) {
              if (value < 0) {
                throw new Error("Stock cannot be negative.");
              }
            },
          },
        },
        price: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
          validate: {
            nonNegative(value) {
              if (value < 0) {
                throw new Error("Stock cannot be negative.");
              }
            },
          },
        },
        image: {
          type: DataTypes.JSON,
        },
        featured: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
        active: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
        slug: {
          type: DataTypes.STRING,
        },
      },
      {
        sequelize,
        modelName: "product",
      },
    );

    // Product.addHook("beforeValidate", "generateSlug", (product) => {
    //   product.slug = slugify(product.name, { lower: true, replacement: "-" });
    // });

    Product.addHook("beforeValidate", "generateSlug", (product) => {
      const slugName = slugify(product.name, { lower: true, replacement: "-" });
      product.slug = `${slugName}-${product.id}`;
    });
    return Product;
  }
}

module.exports = Product;
