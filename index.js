import {createTypes, createReducer, createActions} from './reduxGenerator';
//import webservices from './webservices';
var webservices       = require('./webservices');

module.exports = {
  createTypes:createTypes,
  createReducer:createReducer,
  createActions:createActions,
  webservices:webservices,
};
