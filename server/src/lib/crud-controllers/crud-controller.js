module.exports = class CrudController {
  constructor (request, response, model, scope = {}) {
    this.request = request;
    this.response = response;
    this.model = model;
    this.scope = scope;
  }

  execute () {}

  _handle404 () {
    this.response
    .status(404)
    .json(null);
  }

  _handleError (error) {
    this.response
      .status(500)
      .json({
        name: error.name,
        message: error.message,
        errors: error.errors
      });
  }
};
