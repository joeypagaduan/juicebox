const express = require('express');
const apiRouter = express.Router();

//DAY 2: jsonwebtoken
const jwt = require('jsonwebtoken');
const { getUserById } = require('../db');
const { JWT_SECRET } = process.env;

//setting req.user
apiRouter.use(async (req, res, next) => {
    const prefix = 'Bearer';
    const auth = req.header('Authorization');

    if (!auth) {
        next();
    }   else if (auth.startsWith(prefix)) {
        const token = auth.slice(prefix.length);
    
        try {
            const { id } = jwt.verify(token, JWT_SECRET);

            if (id) {
                req.user = await getUserById(id);
                next();
            }
        }   catch ({ name, message }) {
            next({ name, message });
        }
    }   else {
        next({
            name: 'AuthorizationHeaderError',
            message: `Authorization token must start with ${ prefix }`
        });
    }
});

// Routers from Day 1
const usersRouter = require('./users');
apiRouter.use('/users', usersRouter);

const postsRouter = require('./posts');
apiRouter.use('/posts', postsRouter);

const tagsRouter = require('./tags');
apiRouter.use('/tags', tagsRouter);


//Error Handler (JSON error obj.)
apiRouter.use((error, req, res, next) => {
    res.send({
      name: error.name,
      message: error.message
    });
  });

module.exports = apiRouter;