const { responseBack } = require("../../util/functions");
const projectService = require("../services/project.service");
const ENTITY = "project";
exports.createProject = async (req, res) => {
  const { title, description, userId } = req.body;
  try {
    const project = await projectService.createProject({
      title,
      description,
      userId,
    });
    responseBack(201, project, `${ENTITY} created successfully`, res);
  } catch (err) {
    console.log(err);
    responseBack(500, err, `Failed to create ${ENTITY}`, res);
  }
};

exports.getAllProjects = async (req, res) => {
  try {
    const projects = await projectService.getAllProjects();
    responseBack(201, projects, `All ${ENTITY}(s) fetched successfully.`, res);
  } catch (err) {
    responseBack(500, err, `Failed to fetch ${ENTITY}(s)`, res);
  }
};

exports.getProjectById = async (req, res) => {
  const { id } = req.params;
  try {
    const project = await projectService.getProjectById(id);
    if (!project)
      return responseBack(
        404,
        null,
        `Failed to fetch ${ENTITY} :: id: ${id}`,
        res
      );
    responseBack(
      201,
      project,
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

exports.getProjectsByUserId = async (req, res) => {
  const { userId } = req.params; // Assuming `userId` is passed as a route parameter
  try {
    const projects = await projectService.getProjectsByUserId(userId);
    if (!projects || projects.length === 0)
      return responseBack(
        404,
        null,
        `No projects found for userId: ${userId}`,
        res
      );
    responseBack(
      201,
      projects,
      `Fetched projects successfully for userId: ${userId}`,
      res
    );
  } catch (err) {
    responseBack(
      500,
      err,
      `Failed to fetch projects for userId: ${userId}, error: ${JSON.stringify(
        err
      )}`,
      res
    );
  }
};

exports.updateProject = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const updated = await projectService.updateProject(id, { name });
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

exports.deleteProject = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await projectService.deleteProject(id);
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
