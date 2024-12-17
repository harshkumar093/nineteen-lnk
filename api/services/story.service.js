const db = require("../../database/config/db");
const FN = "story.service.js";
exports.createStory = ({ projectId, title, description }) => {
  console.log(
    `[${FN}.createStory] :: name: ${title}, description:${description}, projectId:${projectId}`
  );
  return new Promise((resolve, reject) => {
    const query =
      "INSERT INTO Story (projectId, name, description) VALUES (?, ?, ?)";
    db.run(query, [projectId, title, description], function (err) {
      if (err) return reject(err);
      resolve({ id: this.lastID, projectId, title, description });
    });
  });
};

exports.getAllStories = () => {
  console.log(`[${FN}.getAllStories]`);
  return new Promise((resolve, reject) => {
    const query = `
      SELECT 
        Story.id, 
        Story.name, 
        IFNULL(SUM(Subtask.hours), 0) AS totalHours, 
        Project.name AS projectName
      FROM 
        Story
      LEFT JOIN Task ON Story.id = Task.story_id
      LEFT JOIN Subtask ON Task.id = Subtask.task_id
      INNER JOIN Project ON Story.projectId = Project.id
      GROUP BY 
        Story.id, Story.name, Project.name
    `;
    db.all(query, (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
};

exports.getStoryById = (id) => {
  console.log(`[${FN}.getStoryById] :: id: ${id}`);
  return new Promise((resolve, reject) => {
    const query = `
      SELECT 
        Story.id, 
        Story.name,
        Story.description, 
        IFNULL(SUM(Subtask.hours), 0) AS totalHours, 
        Project.name AS projectName
      FROM 
        Story
      LEFT JOIN Task ON Story.id = Task.story_id
      LEFT JOIN Subtask ON Task.id = Subtask.task_id
      INNER JOIN Project ON Story.projectId = Project.id
      WHERE 
        Story.id = ?
      GROUP BY 
        Story.id, Story.name, Project.name
    `;
    db.get(query, [id], (err, row) => {
      if (err) return reject(err);
      resolve(row);
    });
  });
};

exports.getStoriesByProjectId = (projectId) => {
  console.log(`[${FN}.getStoriesByProjectId] :: projectId: ${projectId}`);
  return new Promise((resolve, reject) => {
    const query = `
      SELECT 
        Story.id AS storyId, 
        Story.name AS storyName,
        Story.description AS description,
        IFNULL(SUM(SubTask.hours), 0) AS totalHours
      FROM Story
      LEFT JOIN Task ON Story.id = Task.story_id
      LEFT JOIN SubTask ON Task.id = SubTask.task_id
      WHERE Story.projectId = ?
      GROUP BY Story.id`;
    db.all(query, [projectId], (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
};

exports.updateStory = (id, { name }) => {
  console.log(
    `[${FN}.updateStory] :: name: ${name}, id:${id}, hours: ${hours}`
  );
  return new Promise((resolve, reject) => {
    const query = "UPDATE Story SET name = ? WHERE id = ?";
    db.run(query, [name, id], function (err) {
      if (err) return reject(err);
      resolve(this.changes > 0);
    });
  });
};

exports.deleteStory = (id) => {
  console.log(`[${FN}.deleteStory] :: id:${id}`);
  return new Promise((resolve, reject) => {
    const query = "DELETE FROM Story WHERE id = ?";
    db.run(query, [id], function (err) {
      if (err) return reject(err);
      resolve(this.changes > 0);
    });
  });
};
