const db = require("../../database/config/db");
const FN = "project.service.js";
exports.createProject = ({ title, description, userId }) => {
  console.log(
    `[${FN}.createProject] :: name: ${title}, description:${description}, userId:${userId}`
  );
  return new Promise((resolve, reject) => {
    const query =
      "INSERT INTO Project (name, description, userId) VALUES (?, ?, ?)";
    db.run(query, [title, description, userId], function (err) {
      if (err) return reject(err);
      resolve({ id: this.lastID, title, description, userId });
    });
  });
};

exports.getAllProjects = () => {
  console.log(`[${FN}.getAllProjects]`);
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM Project";
    db.all(query, (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
};

exports.getProjectById = (id) => {
  console.log(`[${FN}.getProjectById] :: id: ${id}`);
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM Project WHERE id = ?";
    db.get(query, [id], (err, row) => {
      if (err) return reject(err);
      resolve(row);
    });
  });
};

exports.getProjectsByUserId = (userId) => {
  console.log(`[${FN}.getProjectsByUserId] :: userId: ${userId}`);
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM Project WHERE userId = ?";
    db.all(query, [userId], (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
};

exports.updateProject = (id, { name }) => {
  console.log(`[${FN}.updateProject] :: name: ${name}, id:${id}`);
  return new Promise((resolve, reject) => {
    const query = "UPDATE Project SET name = ? WHERE id = ?";
    db.run(query, [name, id], function (err) {
      if (err) return reject(err);
      resolve(this.changes > 0);
    });
  });
};

exports.deleteProject = (id) => {
  console.log(`[${FN}.deleteProject] :: id:${id}`);
  return new Promise((resolve, reject) => {
    const query = "DELETE FROM Project WHERE id = ?";
    db.run(query, [id], function (err) {
      if (err) return reject(err);
      resolve(this.changes > 0);
    });
  });
};
