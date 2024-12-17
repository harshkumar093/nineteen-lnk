const { responseBack } = require("../../util/functions");
const taskService = require("../services/task.service");
const ENTITY = "task";
exports.createTask = async (req, res) => {
  const { story_id, title, description } = req.body;
  console.log(req.body);
  try {
    const task = await taskService.createTask({ story_id, title, description });
    responseBack(201, task, `${ENTITY} created successfully`, res);
  } catch (err) {
    console.log(err);
    responseBack(500, err, `Failed to create ${ENTITY}`, res);
  }
};

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await taskService.getAllTasks();
    responseBack(201, tasks, `All ${ENTITY}(s) fetched successfully.`, res);
  } catch (err) {
    responseBack(500, err, `Failed to fetch ${ENTITY}(s)`, res);
  }
};

exports.getTaskById = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await taskService.getTaskById(id);
    if (!task)
      return responseBack(
        404,
        null,
        `Failed to fetch ${ENTITY} :: id: ${id}`,
        res
      );
    responseBack(201, task, `Fetched ${ENTITY} succesfully :: id: ${id}`, res);
  } catch (err) {
    responseBack(
      500,
      err,
      `Failed to fetch ${ENTITY} :: id: ${id}, error: ${JSON.stringify(err)}`,
      res
    );
  }
};

exports.getTasksByStoryId = async (req, res) => {
  const { storyId } = req.params; // Assuming `storyId` is passed as a route parameter
  try {
    const tasks = await taskService.getTasksByStoryId(storyId);
    if (!tasks || tasks.length === 0)
      return responseBack(
        404,
        null,
        `No tasks found for storyId: ${storyId}`,
        res
      );
    responseBack(
      201,
      tasks,
      `Fetched tasks successfully for storyId: ${storyId}`,
      res
    );
  } catch (err) {
    console.log(err);
    responseBack(
      500,
      err,
      `Failed to fetch tasks for storyId: ${storyId}, error: ${JSON.stringify(
        err
      )}`,
      res
    );
  }
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const updated = await taskService.updateTask(id, { name });
    if (!updated)
      return responseBack(
        404,
        null,
        `Failed to update ${ENTITY} :: id: ${id}`,
        res
      );
    responseBack(
      201,
      updated,
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

exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await taskService.deleteTask(id);
    if (!deleted)
      return responseBack(
        404,
        null,
        `Failed to delete ${ENTITY} :: id: ${id}`,
        res
      );
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
      `Failed to delete ${ENTITY} :: id: ${id}, error: ${JSON.stringify(err)}`,
      res
    );
  }
};
