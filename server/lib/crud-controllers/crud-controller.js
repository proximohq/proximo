module.exports = class CrudController {
  constructor(request, response, model, scope = {}) {
    this.request = request;
    this.response = response;
    this.model = model;
    this.scope = scope;
  }

  execute() {}

  _handleError(error) {
    this.response
    .status(500)
    .json({
      error: true,
      details: error
    });
  }
}
