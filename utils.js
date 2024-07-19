const isEmail = (s) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(s);
};

const isUndefined = v => v === undefined;

module.exports = {
  isEmail,
  isUndefined,
};
