const express = require('express');
const models = require('../../models');
const controllers = require('./crud-controllers');

module.exports = class Endpoint {
  constructor (router, modelName, pathName = null) {
    this.modelName = modelName;
    this.pathName = pathName || modelName;
    this.router = express.Router();
    this.model = models[ modelName ];

    this.attachActions();
    router.use(`/${this.pathName}`, this.router);
  }

  attachActions () {
    const crudActions = this.getCrudActions();

    for (let i in crudActions) {
      const crud = crudActions[i];
      const CrudController = crud.controller;

      this.router[crud.method](`${crud.path}`, (req, res) => {
        const ctrl = new CrudController(req, res, this.model);
        ctrl.execute();
      });
    }
  }

  getCrudActions () {
    return {
      selectAll: {
        path: '/',
        method: 'get',
        controller: controllers.selectAll
      },
      create: {
        path: '/',
        method: 'post',
        controller: controllers.create
      },
      findById: {
        path: '/:id',
        method: 'get',
        controller: controllers.findById
      },
      updateOne: {
        path: '/:id',
        method: 'put',
        controller: controllers.updateOne
      },
      deleteOne: {
        path: '/:id',
        method: 'delete',
        controller: controllers.deleteOne
      }
    };
  }
};
