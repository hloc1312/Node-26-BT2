const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
// const sequelize = require(".");

// const User = sequelize.define(
//   "User",
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     firstName: {
//       type: DataTypes.STRING(50),
//       field: "first_name", // dùng để map với column trong db => SELECT first_name as firstName FROM user;
//     },
//     lastName: {
//       type: DataTypes.STRING(50),
//       field: "last_name",
//     },
//     email: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true,
//       validate: {
//         isEmail: {
//           msg: "Email is not valid",
//         },
//         customerValidator: (value) => {
//           // logic validation
//           // Nếu không thỏa mãn logic
//           // throw new Error("message")
//           // if (value !== "nhox@gmail.com") {
//           //   throw new Error("Email is not matched");
//           // }
//         },
//       },

//       // Override lại data lấy từ DB lền
//       get() {
//         const rawValue = this.getDataValue("email");
//         return rawValue ? rawValue.toUpperCase() : null;
//       },
//     },
//     // confirmPassword: {},
//     password: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       validate: {
//         customConfirmPassword: (value) => {
//           // logic validation
//           // Nếu không thỏa mãn logic
//           // throw new Error("message")
//           // if (value !== this.confirmPassword) {
//           //   throw new Error("Password is not matched");
//           // }
//         },
//       },
//       // Sẽ được chạy trước khi create/update
//       set(value) {
//         // không được lưu trực tiếp plaintext password trực tiếp xuống DB.
//         // ta cần hash password bằng thư viện bcrypt
//         const salt = bcrypt.genSaltSync();
//         const hashPassword = bcrypt.hashSync(value, salt);
//         this.setDataValue("password", hashPassword);
//       },
//     },
//   },
//   {
//     tableName: "users",
//     // disable createdAt, updatedAt
//     timestamps: false,
//     // Bỏ qua column password khi tìm kiếm các record
//     defaultScope: {
//       attributes: {
//         exclude: ["password"], // theo tên property
//       },
//     },

//     // các phương thức được tự động chạy sau một hành động (create/update/delete)
//     hooks: {
//       // Xóa property password của record được trả ra sau khi tạo user thành công
//       afterSave: (record) => {
//         delete record.dataValues.password;
//       },
//     },
//   }
// );

// module.exports = User;

// Cách viết với mối quan hệ
module.exports = (sequelize) => {
  return sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      firstName: {
        type: DataTypes.STRING(50),
        field: "first_name", // dùng để map với column trong db => SELECT first_name as firstName FROM user;
      },
      lastName: {
        type: DataTypes.STRING(50),
        field: "last_name",
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: "Email is not valid",
          },
          customerValidator: (value) => {
            // logic validation
            // Nếu không thỏa mãn logic
            // throw new Error("message")
            // if (value !== "nhox@gmail.com") {
            //   throw new Error("Email is not matched");
            // }
          },
        },

        // Override lại data lấy từ DB lền
        get() {
          const rawValue = this.getDataValue("email");
          return rawValue ? rawValue.toUpperCase() : null;
        },
      },
      // confirmPassword: {},
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          customConfirmPassword: (value) => {
            // logic validation
            // Nếu không thỏa mãn logic
            // throw new Error("message")
            // if (value !== this.confirmPassword) {
            //   throw new Error("Password is not matched");
            // }
          },
        },
        // Sẽ được chạy trước khi create/update
        set(value) {
          // không được lưu trực tiếp plaintext password trực tiếp xuống DB.
          // ta cần hash password bằng thư viện bcrypt
          const salt = bcrypt.genSaltSync();
          const hashPassword = bcrypt.hashSync(value, salt);
          this.setDataValue("password", hashPassword);
        },
      },
    },
    {
      tableName: "users",
      // disable createdAt, updatedAt
      timestamps: false,
      // Bỏ qua column password khi tìm kiếm các record
      defaultScope: {
        attributes: {
          exclude: ["password"], // theo tên property
        },
      },

      // các phương thức được tự động chạy sau một hành động (create/update/delete)
      hooks: {
        // Xóa property password của record được trả ra sau khi tạo user thành công
        afterSave: (record) => {
          delete record.dataValues.password;
        },
      },
    }
  );
};
