const CrudController = require('./crud-controller');

module.exports = class UpdateOneController extends CrudController {
  execute() {
    this.model.findById(this.request.params.id)
    .then((record) => {
      if (record === null) return this._handle404();

      return record.update(this.request.body, this.scope)
      .then(this._handleSuccess.bind(this))
    })
    .catch(this._handleError.bind(this));
  }

  _handleSuccess(record) {
    this.response.json(record);
  }
}
