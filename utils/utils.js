module.exports = {
  init: () => {
    String.prototype.toObjectId = function () {
      const ObjectId = require("mongoose").Types.ObjectId;
      return new ObjectId(this.toString());
    };
    return true;
  },
};
