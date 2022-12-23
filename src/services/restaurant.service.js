const { AppError } = require("../helpers/error");
const { Restaurant, User } = require("../models");

const getRestaurant = async () => {
  try {
    const restaurants = await Restaurant.findAll({
      // include: "userLike", // get sẽ kèm theo restaurantLike
      // bỏ thông tin restaurantLike khi get dữ liệu
      // include: {
      //   association: "userLike",
      //   through: {
      //     attributes: [],
      //   },
      // },
      // inlude là 1 array: tìm chủ nhà hàng, tìm user nào đã like
      include: [
        // "owner",
        // Có thể exclude ở nhiều model
        {
          association: "owner",
          attributes: {
            exclude: ["email", "password"],
          },
        },
        {
          association: "userLike",
          attributes: {
            exclude: ["email", "password"],
          },
          through: {
            attributes: [],
          },
        },
      ],
    });
    return restaurants;
  } catch (error) {
    throw error;
  }
};

const likeRestaurant = async (userId, restaurantId) => {
  try {
    const restaurant = await Restaurant.findByPk(restaurantId);
    if (!restaurant) {
      throw new AppError(400, "Restaurant not found");
    }
    const user = await User.findByPk(userId);
    if (!user) {
      throw new AppError(400, "User not found");
    }

    // log prototype là các method của 1 object
    console.log(restaurant.__proto__);

    // Khi thiết lập relationships cho các model, mặc định sequelize sẽ tạo ra các phương thức cho các model để tương tác với các model khác
    // await restaurant.addUserLike(user.id);

    const hasLiked = await restaurant.hasUserLike(user.id);
    if (hasLiked) {
      await restaurant.removeUserLike(user.id);
    } else {
      await restaurant.addUserLike(user.id);
    }
    return null;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getRestaurant,
  likeRestaurant,
};
