const db = require("../../database/config/db");

exports.getAllUsers = () => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM Users", [], (err, rows) => {
      if (err) reject(err);
      resolve(rows);
    });
  });
};

exports.createUser = (user) => {
  return new Promise((resolve, reject) => {
    console.log(user);
    const { email, password } = user;
    db.run(
      "INSERT INTO Users (email, password) VALUES (?, ?)",
      [email, password],
      function (err) {
        if (err) reject(err);
        resolve({ id: this.lastID, email, password });
      }
    );
  });
};

exports.getUserById = (id) => {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM Users WHERE id = ?", [id], (err, row) => {
      if (err) reject(err);
      resolve(row);
    });
  });
};

exports.updateUser = (id, user) => {
  return new Promise((resolve, reject) => {
    const { email, password } = user;
    db.run(
      "UPDATE Users SET email = ?, password = ? WHERE id = ?",
      [email, password, id],
      function (err) {
        if (err) reject(err);
        resolve({ id, email, password });
      }
    );
  });
};

exports.deleteUser = (id) => {
  return new Promise((resolve, reject) => {
    db.run("DELETE FROM Users WHERE id = ?", [id], function (err) {
      if (err) reject(err);
      resolve();
    });
  });
};
