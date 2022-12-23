// Setup Sequelize

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("node26-food", "root", "1234", {
  dialect: "mysql",
  host: "localhost",
  port: 3306,
});

// yarn add mysql2
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

// Khởi tạo model
const User = require("./User")(sequelize);
//  ==> thay vì viết vậy, thì viết nhanh như ở trên
// const UserFN = require('./User');
// const User = UserFN(sequelize)
const Restaurant = require("./Restaurant")(sequelize);

const RestaurantLikes = require("./RestaurantLikes")(sequelize);
// Định nghĩa relationship giữa các model

// User 1 - n Restaurant
Restaurant.belongsTo(User, { as: "owner", foreignKey: "userId" });
User.hasMany(Restaurant, { as: "restaurants", foreignKey: "userId" });

// sequelize.sync({ alter: true });

// User - Like - Restaurant
// User 1 - n RestaurantLikes
// Restaurant 1 - n RestaurantLikes
// User.belongsToMany(Restaurant, {
//   through: "restaurant_likes",
//   foreignKey: "user_id",
// });
// Restaurant.belongsToMany(User, {
//   through: "restaurant_likes",
//   foreignKey: "restaurant_id",
// });
User.belongsToMany(Restaurant, {
  as: "restaurantLike",
  through: RestaurantLikes,
  foreignKey: "userId", // key theo property
});
Restaurant.belongsToMany(User, {
  as: "userLike",
  through: RestaurantLikes,
  foreignKey: "restaurantId",
});

module.exports = {
  sequelize,
  User,
  Restaurant,
};
