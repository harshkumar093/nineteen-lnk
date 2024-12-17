const db = require("../../database/config/db");
const FN = "subtask.service.js";
exports.createSubTask = ({ task_id, title, description, hours }) => {
  console.log(
    `[${FN}.createTask] :: title: ${title}, description: ${description}, task_id:${task_id}, hours: ${hours}`
  );
  return new Promise((resolve, reject) => {
    const query =
      "INSERT INTO SubTask (task_id, name,description, hours) VALUES (?, ?, ?, ?)";
    db.run(query, [task_id, title, description, hours], function (err) {
      if (err) return reject(err);
      resolve({ id: this.lastID, task_id, title, description, hours });
    });
  });
};

exports.getAllSubTasks = () => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT SubTask.id, SubTask.name, SubTask.hours, Task.name AS taskName
      FROM SubTask
      INNER JOIN Task ON SubTask.task_id = Task.id
    `;
    db.all(query, (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
};

exports.getSubTaskById = (id) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT SubTask.id, SubTask.name, SubTask.hours, Task.name AS taskName
      FROM SubTask
      INNER JOIN Task ON SubTask.task_id = Task.id
      WHERE SubTask.id = ?
    `;
    db.get(query, [id], (err, row) => {
      if (err) return reject(err);
      resolve(row);
    });
  });
};

exports.getSubTasksByTaskId = (taskId) => {
  console.log(`[${FN}.getSubTasksByTaskId] :: taskId: ${taskId}`);
  return new Promise((resolve, reject) => {
    const query = `
      SELECT 
        SubTask.id AS subTaskId,
        SubTask.name AS subTaskName,
        SubTask.hours AS subTaskHours,
        SubTask.description AS description
      FROM SubTask
      WHERE SubTask.task_id = ?`;

    db.all(query, [taskId], (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
};

exports.updateSubTask = (id, { name, hours }) => {
  return new Promise((resolve, reject) => {
    const query = "UPDATE SubTask SET name = ?, hours = ? WHERE id = ?";
    db.run(query, [name, hours, id], function (err) {
      if (err) return reject(err);
      resolve(this.changes > 0);
    });
  });
};

exports.deleteSubTask = (id) => {
  return new Promise((resolve, reject) => {
    const query = "DELETE FROM SubTask WHERE id = ?";
    db.run(query, [id], function (err) {
      if (err) return reject(err);
      resolve(this.changes > 0);
    });
  });
};
