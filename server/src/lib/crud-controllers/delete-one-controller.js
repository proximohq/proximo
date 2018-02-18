const CrudController = require('./crud-controller');

module.exports = class DeleteOneController extends CrudController {
  execute () {
    this.model.findById(this.request.params.id)
      .then((record) => {
        if (record === null) return this._handle404();

        return record.destroy(this.request.body)
        .then(this._handleSuccess.bind(this));
      })
      .catch(this._handleError.bind(this));
  }

  _handleSuccess () {
    this.response.json(null);
  }
};
