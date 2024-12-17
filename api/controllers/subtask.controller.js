const { responseBack } = require("../../util/functions");
const subTaskService = require("../services/subtask.service");
const ENTITY = "subtask";
exports.createSubTask = async (req, res) => {
  const { task_id, title, description, hours } = req.body;
  try {
    const subTask = await subTaskService.createSubTask({
      task_id,
      title,
      description,
      hours,
    });
    responseBack(201, subTask, `${ENTITY} created successfully`, res);
  } catch (err) {
    console.log(err);
    responseBack(500, err, `Failed to create ${ENTITY}`, res);
  }
};

exports.getAllSubTasks = async (req, res) => {
  try {
    const subTasks = await subTaskService.getAllSubTasks();
    responseBack(201, subTasks, `All ${ENTITY}(s) fetched successfully.`, res);
  } catch (err) {
    console.log(err);
    responseBack(500, err, `Failed to fetch ${ENTITY}(s)`, res);
  }
};

exports.getSubTaskById = async (req, res) => {
  const { id } = req.params;
  try {
    const subTask = await subTaskService.getSubTaskById(id);
    if (!subTask)
      return responseBack(
        404,
        null,
        `Failed to fetch ${ENTITY} :: id: ${id}`,
        res
      );
    responseBack(
      201,
      subTask,
      `Fetched ${ENTITY} succesfully :: id: ${id}`,
      res
    );
  } catch (err) {
    responseBack(
      500,
      err,
      `Failed to fetch ${ENTITY} :: id: ${id}, error: ${JSON.stringify(err)}`,
      res
    );
  }
};

exports.getSubTasksByTaskId = async (req, res) => {
  const { taskId } = req.params; // Assuming `taskId` is passed as a route parameter
  try {
    const subtasks = await subTaskService.getSubTasksByTaskId(taskId);
    if (!subtasks || subtasks.length === 0)
      return responseBack(
        404,
        null,
        `No subtasks found for taskId: ${taskId}`,
        res
      );

    responseBack(
      201,
      subtasks,
      `Fetched subtasks successfully for taskId: ${taskId}`,
      res
    );
  } catch (err) {
    console.log(err);
    responseBack(
      500,
      err,
      `Failed to fetch subtasks for taskId: ${taskId}, error: ${JSON.stringify(
        err
      )}`,
      res
    );
  }
};

exports.updateSubTask = async (req, res) => {
  const { id } = req.params;
  const { name, hours } = req.body;
  try {
    const updated = await subTaskService.updateSubTask(id, { name, hours });
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

exports.deleteSubTask = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await subTaskService.deleteSubTask(id);
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
