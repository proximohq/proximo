const CrudController = require('./crud-controller');

module.exports = class SelectAllController extends CrudController {
  execute() {
    this.model.findAndCountAll({
      limit: 100
    })
    .then(
      this._sendResponse.bind(this),
      this._handleError.bind(this)
    );
  }

  _sendResponse(result) {
    this.response.json({
      count: result.count,
      result: result.rows
    });
  }
}
