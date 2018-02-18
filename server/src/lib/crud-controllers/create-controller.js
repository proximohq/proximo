const CrudController = require('./crud-controller');

module.exports = class CreateController extends CrudController {
  execute () {
    this.model.create(this.request.body)
      .then(this._handleSuccess.bind(this))
      .catch(this._handleError.bind(this));
  }

  _handleSuccess (record) {
    this.response.json(record);
  }

  _handleError (error) {
    if (error.name === 'SequelizeValidationError') {
      this._handleValidationError(error);
    } else {
      super._handleError(error);
    }
  }

  _handleValidationError (error) {
    this.response.status(400)
    .json({
      name: 'ValidationError',
      message: error.message,
      errors: error.errors
    });
  }
};
