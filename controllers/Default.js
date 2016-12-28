'use strict';

var url = require('url');


var Default = require('./DefaultService');


module.exports.findCategory = function findCategory (req, res, next) {
  Default.findCategory(req.swagger.params, res, next);
};

module.exports.findKeyword = function findKeyword (req, res, next) {
  Default.findKeyword(req.swagger.params, res, next);
};

module.exports.findNews = function findNews (req, res, next) {
  Default.findNews(req.swagger.params, res, next);
};

module.exports.findNewsByCategory = function findNewsByCategory (req, res, next) {
  Default.findNewsByCategory(req.swagger.params, res, next);
};

module.exports.findNewsById = function findNewsById (req, res, next) {
  Default.findNewsById(req.swagger.params, res, next);
};

module.exports.findNewsByKeyword = function findNewsByKeyword (req, res, next) {
  Default.findNewsByKeyword(req.swagger.params, res, next);
};
