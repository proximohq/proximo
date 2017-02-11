const CrudController = require('./crud-controller');

module.exports = class FindByIdController extends CrudController {
  execute() {
    super.execute();

    this.model.findOne({
      where: { id: this.request.params.id }
    })
    .then(this._handleSuccess.bind(this))
    .catch(this._handleError.bind(this));
  }

  _handleSuccess(record) {
    if (record !== null) {
      this.response.json(record);
    } else {
      this.response.status(404);
      this.response.json(null);
    }
  }
}
