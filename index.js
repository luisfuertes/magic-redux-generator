import {createTypes, createReducer, createActions} from './reduxGenerator';
import * as webservices from './webservices';

module.exports = {
  createTypes:createTypes,
  createReducer:createReducer,
  createActions:createActions,
  webservices:webservices,
};
