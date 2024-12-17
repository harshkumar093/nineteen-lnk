const db = require("../../database/config/db");
const FN = "task.service.js";

exports.createTask = ({ story_id, title, description }) => {
  console.log(
    `[${FN}.createTask] :: title: ${title}, description: ${description}, story_id:${story_id}`
  );
  return new Promise((resolve, reject) => {
    const query =
      "INSERT INTO Task (story_id, name, description) VALUES (?, ?, ?)";
    db.run(query, [story_id, title, description], function (err) {
      if (err) return reject(err);
      resolve({ id: this.lastID, story_id, title, description });
    });
  });
};

exports.getAllTasks = () => {
  console.log(`[${FN}.getAllTasks]`);
  return new Promise((resolve, reject) => {
    const query = `
      SELECT Task.id, Task.name, 
             IFNULL(SUM(SubTask.hours), 0) AS totalHours,
             Story.name AS storyName
      FROM Task
      LEFT JOIN SubTask ON Task.id = SubTask.task_id
      INNER JOIN Story ON Task.story_id = Story.id
      GROUP BY Task.id
    `;
    db.all(query, (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
};

exports.getTaskById = (id) => {
  console.log(`[${FN}.getTaskById] :: id: ${id}`);
  return new Promise((resolve, reject) => {
    const query = `
      SELECT Task.id, Task.name, 
             IFNULL(SUM(SubTask.hours), 0) AS totalHours,
             Story.name AS storyName
      FROM Task
      LEFT JOIN SubTask ON Task.id = SubTask.task_id
      INNER JOIN Story ON Task.story_id = Story.id
      WHERE Task.id = ?
      GROUP BY Task.id
    `;
    db.get(query, [id], (err, row) => {
      if (err) return reject(err);
      resolve(row);
    });
  });
};

exports.getTasksByStoryId = (storyId) => {
  console.log(`[${FN}.getTasksByStoryId] :: storyId: ${storyId}`);
  return new Promise((resolve, reject) => {
    const query = `
      SELECT 
        Task.id AS taskId, 
        Task.name AS taskName,
        Task.description AS description,
        IFNULL(SUM(SubTask.hours), 0) AS totalHours
      FROM Task
      LEFT JOIN SubTask ON Task.id = SubTask.task_id
      WHERE Task.story_id = ?
      GROUP BY Task.id`;
    db.all(query, [storyId], (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
};

exports.updateTask = (id, { name }) => {
  console.log(`[${FN}.updateTask] :: name: ${name}, id:${id}`);
  return new Promise((resolve, reject) => {
    const query = "UPDATE Task SET name = ? WHERE id = ?";
    db.run(query, [name, id], function (err) {
      if (err) return reject(err);
      resolve(this.changes > 0);
    });
  });
};

exports.deleteTask = (id) => {
  console.log(`[${FN}.deleteTask] :: id:${id}`);
  return new Promise((resolve, reject) => {
    const query = "DELETE FROM Task WHERE id = ?";
    db.run(query, [id], function (err) {
      if (err) return reject(err);
      resolve(this.changes > 0);
    });
  });
};
