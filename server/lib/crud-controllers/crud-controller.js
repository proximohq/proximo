module.exports = class CrudController {
  constructor(model, request, response) {
    this.model = model;
    this.request = request;
    this.response = response;
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
