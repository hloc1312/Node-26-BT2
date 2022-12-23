const { response } = require("../helpers/response");
const restaurantService = require("../services/restaurant.service");
const getRestaurants = () => {
  return async (req, res, next) => {
    try {
      const restaurants = await restaurantService.getRestaurant();

      res.status(200).json(response(restaurants));
      // res.status(200).json({ data: restaurants });
    } catch (error) {
      next(error);
    }
  };
};

// POST localhost:4000/restaurants/:restaurantId/like - body {userId: 1}
const likeRestaurant = () => {
  return async (req, res, next) => {
    try {
      const { restaurantId } = req.params;
      const { userId } = req.body;
      await restaurantService.likeRestaurant(userId, restaurantId);
      res.status(200).json(response("Oke"));
    } catch (error) {
      next(error);
    }
  };
};

module.exports = {
  getRestaurants,
  likeRestaurant,
};
