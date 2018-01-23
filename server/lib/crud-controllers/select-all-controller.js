const CrudController = require('./crud-controller');

module.exports = class SelectAllController extends CrudController {
  execute () {
    const parameters = this._getQueryParameters();

    this.model.findAndCountAll(parameters)
      .then(
        this._sendResponse.bind(this),
        this._handleError.bind(this)
      );
  }

  _getQueryParameters () {
    let params = {
      limit: 100
    };

    if (this.request.query.where) {
      params.where = this.request.query.where;
    }

    params = Object.assign(params, this.scope);

    return params;
  }

  _sendResponse (result) {
    this.response.json({
      count: result.count,
      result: result.rows
    });
  }
};
