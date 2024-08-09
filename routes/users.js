const Joi = require("joi");
const router = require("express").Router();

class User {
  constructor(userController) {
    this.userController = userController;
    this.init();
  }
  init() {
    this.setMiddleware();
    this.setRoutes();
  }

  setMiddleware() {
    // we can add anys middlewares
    router.use((req, res, next) => {
      next();
    });
  }

  setRoutes() {
    router.post("/login", (req, res) => {
      const schema = Joi.object({
        name: Joi.alternatives().try(
          Joi.string().alphanum().min(3).max(30).required(),
          Joi.string().email().required()
        ),
        password: Joi.string().alphanum().min(3).max(30).required(),
      });

      const { error } = schema.validate(req.body);
      if (!error) {
        const { name, password } = req.body;

        this.userController
          .login(name, password)
          .then((data) => {
            return res.status(200).json(data);
          })
          .catch((error) => {
            return res.status(400).json(error);
          });
      } else {
        return res.status(400).json({ msg: error.details[0].message });
      }
    });

    router.get("/getusers", (req, res) => {
      try {
        this.userController
          .getallusers()
          .then((data) => {
            return res.status(200).json(data);
          })
          .catch((error) => {
            return res.status(400).json(error);
          });
      } catch (error) {
        return res.status(400).json(error);
      }
    });
  }
  route() {
    return router;
  }
}

module.exports = (userController) => {
  return new User(userController);
};
