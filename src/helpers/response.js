const response = (payload, ...rest) => {
  return {
    status: "Success",
    data: payload,
    ...rest,
  };
};

module.exports = { response };
