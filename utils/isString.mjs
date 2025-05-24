export const isString = (value) => {
  if (typeof value !== "string") {
    throw new TypeError("Value must be a string");
  }
};
