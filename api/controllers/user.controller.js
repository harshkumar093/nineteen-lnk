const { responseBack } = require("../../util/functions");
const userService = require("../services/user.service");
const ENTITY = "user";
exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    responseBack(201, users, `All ${ENTITY}(s) fetched successfully`, res);
  } catch (err) {
    responseBack(500, err, `Failed to create ${ENTITY}(s)`, res);
  }
};

exports.createUser = async (req, res) => {
  try {
    console.log(req.body);
    const user = await userService.createUser(req.body);
    responseBack(201, user, `${ENTITY} created successfully.`, res);
  } catch (err) {
    console.log(err);
    responseBack(500, err, `Failed to create ${ENTITY}`, res);
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user)
      return responseBack(
        404,
        null,
        `Failed to fetch ${ENTITY} :: id: ${id}`,
        res
      );
    responseBack(201, user, `Fetched ${ENTITY} succesfully :: id: ${id}`, res);
  } catch (err) {
    responseBack(
      500,
      err,
      `Failed to fetch ${ENTITY} :: id: ${id}, error: ${JSON.stringify(err)}`,
      res
    );
  }
};

exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await userService.updateUser(req.params.id, req.body);
    responseBack(
      201,
      updatedUser,
      `Updated ${ENTITY} succesfully :: id: ${id}`,
      res
    );
  } catch (err) {
    responseBack(
      500,
      err,
      `Failed to update ${ENTITY} :: id: ${id}, error: ${JSON.stringify(err)}`,
      res
    );
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await userService.deleteUser(id);
    responseBack(
      201,
      deleted,
      `Deleted ${ENTITY} succesfully :: id: ${id}`,
      res
    );
  } catch (err) {
    responseBack(
      500,
      err,
      `Failed to delete ${ENTITY} :: id: ${
        req.params.id
      }, error: ${JSON.stringify(err)}`,
      res
    );
  }
};
