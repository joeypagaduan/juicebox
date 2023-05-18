// const express = require('express');
// const postsRouter = express.Router();

function requireUser(req, res, next) {
    if (!req.user) {
      next({
        name: "MissingUserError",
        message: "You must be logged in to perform this action"
      });
    }
  
    next();
  }

  //Use this in your other routes
// const { requireUser } = require(./utils');

//   someRouter.post('/some/route', requireUser, async (req, res, next) => {
//   });
  
  module.exports = {
    requireUser
  }