module.exports = function enumFn() {
  var items = Array.prototype.slice.call(arguments);

  return {
    type: `ENUM("${items.join("', '")}")`
  };
}
