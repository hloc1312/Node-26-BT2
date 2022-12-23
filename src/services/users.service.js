const { AppError } = require("../helpers/error");
// const User = require("../models/User");
const { User, Restaurant } = require("../models");

// class UserService {
//   async getUsers() {
//     try {
//       const users = await User.findAll();
//       return users;
//     } catch (error) {
//       throw error;
//     }
//   }
// }
// const userService = new UserService();

// Service nhận vào data từ Controller
// Nhiệm vụ: Xử lý nghiệp vụ của ứng dụng, sau đó gọi tới model của sequelize để query xuống DB, nhận data từ DB và return về cho Controller
const getUser = async () => {
  try {
    const users = await User.findAll({
      // restaurants này là giá trị as ở file model
      include: "restaurants",
      // Nếu không as thì phải import Restaurant vào.
      // Mặc định lấy tên model làm tên Key
      // Nếu dùng as thì model và service đều dùng as, ngược lại không dùng as thì phải import và không dùng as
      // include: Restaurant,
    });
    return users;
  } catch (error) {
    throw error;
    // throw new AppError(500, "Something went wrong with DB");
  }
};

const createUser = async (data) => {
  try {
    const user = await User.findOne({
      where: {
        email: data.email,
      },
    });

    // Nếu email tồn lại
    if (user) {
      // throw error ở try sẽ chạy xuống catch
      // throw new Error("Email exist");
      throw new AppError(400, "Email exist");
    }

    // Ví dụ trong trường hợp admin thêm user, chỉ cần dùng email, ta cần phải tạo một mật khẩu ngẫu nhiên
    if (!data.password) {
      data.password = Math.random().toString(36).slice(2);
      // Gửi email về cho user mật khẩu này
    }

    const createUser = await User.create(data);
    return createUser;
  } catch (error) {
    throw error;
    // throw new AppError(500, "Something went wrong with DB");
  }
};

// Delete
// User.findOne({where:{id:1}}) // nếu không tìm thấy trả về lỗi
// User.destroy({where:{id:1}})
const deleteUser = async (id) => {
  try {
    const user = await User.findOne({
      where: {
        id: id,
      },
    });

    // Nếu không có user trả lỗi
    if (!user) {
      throw new AppError(400, "User not exist");
    }
    await User.destroy({ where: { id: id } });
    // return deleteUser;
  } catch (error) {
    throw error;
    // throw new AppError(500, "Something went wrong with DB");
  }
};

// Update
// User.findOne({where:{id:1}}) // nếu không tìm thấy trả về lỗi
// User.update(data, {where:{id:1}})
// User.findOne({where:{id:1}})

const updateUser = async (payload, id) => {
  try {
    const user = await User.findOne({
      where: {
        id,
      },
    });
    if (!user) {
      throw new AppError(400, "User is not exist");
    }
    await User.update(payload, { where: { id } });
    const selectUser = await User.findOne({ where: { id: id } });
    return selectUser;
  } catch (error) {
    throw error;
    // throw new AppError(500, "Something went wrong with DB");
  }
};
module.exports = {
  getUser,
  createUser,
  deleteUser,
  updateUser,
};
