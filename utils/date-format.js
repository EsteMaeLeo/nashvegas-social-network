const date = require("date-and-time");

const formatDate = (createAt) => {
  const value = date.format(createAt, "dddd, MMMM DD YYYY' HH:mm:ss");

  return value;
};
module.exports = formatDate;
