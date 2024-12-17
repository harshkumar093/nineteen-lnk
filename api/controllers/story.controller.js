const { responseBack } = require("../../util/functions");
const storyService = require("../services/story.service");
const ENTITY = "story";
exports.createStory = async (req, res) => {
  const { projectId, title, description } = req.body;
  try {
    const story = await storyService.createStory({
      projectId,
      title,
      description,
    });
    responseBack(201, story, `${ENTITY} created successfully`, res);
  } catch (err) {
    console.log(err);
    responseBack(500, err, `Failed to create ${ENTITY}`, res);
  }
};

exports.getAllStories = async (req, res) => {
  try {
    const stories = await storyService.getAllStories();
    responseBack(201, stories, `All ${ENTITY}(s) fetched successfully.`, res);
  } catch (err) {
    responseBack(500, err, `Failed to fetch ${ENTITY}(s)`, res);
  }
};

exports.getStoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const story = await storyService.getStoryById(id);
    if (!story)
      return responseBack(
        404,
        null,
        `Failed to fetch ${ENTITY} :: id: ${id}`,
        res
      );
    responseBack(201, story, `Fetched ${ENTITY} succesfully :: id: ${id}`, res);
  } catch (err) {
    responseBack(
      500,
      err,
      `Failed to fetch ${ENTITY} :: id: ${id}, error: ${JSON.stringify(err)}`,
      res
    );
  }
};

exports.getStoriesByProjectId = async (req, res) => {
  const { projectId } = req.params; // Assuming `projectId` is passed as a route parameter
  try {
    const stories = await storyService.getStoriesByProjectId(projectId);
    if (!stories || stories.length === 0)
      return responseBack(
        404,
        null,
        `No stories found for projectId: ${projectId}`,
        res
      );
    responseBack(
      201,
      stories,
      `Fetched stories successfully for projectId: ${projectId}`,
      res
    );
  } catch (err) {
    responseBack(
      500,
      err,
      `Failed to fetch stories for projectId: ${projectId}, error: ${JSON.stringify(
        err
      )}`,
      res
    );
  }
};

exports.updateStory = async (req, res) => {
  const { id } = req.params;
  const { name, hours } = req.body;
  try {
    const updated = await storyService.updateStory(id, { name, hours });
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

exports.deleteStory = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await storyService.deleteStory(id);
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
