const { DataTypes, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "RestaurantLikes",
    {
      userId: {
        type: DataTypes.INTEGER,
        field: "user_id",
      },
      restaurantId: {
        type: DataTypes.STRING(50),
        field: "restaurant_id",
      },

      createdAt: {
        type: DataTypes.DATE,
        field: "created_at",
        // current_timestamp ở extra column (tạo thời gian hiện tại khi tạo 1 record)
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    },
    {
      tableName: "restaurant_likes",
      // disable createdAt, updatedAt
      timestamps: false,
    }
  );
};
