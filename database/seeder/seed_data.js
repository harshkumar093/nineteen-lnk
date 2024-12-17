const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Database connection
const dbPath = path.resolve(__dirname, "../database.sqlite");
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error connecting to SQLite database:", err.message);
  } else {
    console.log("Connected to SQLite database.");
  }
});

// Seed data
db.serialize(() => {
  console.log("Seeding database...");

  // Insert Users
  db.run(
    `INSERT INTO Users (email, password) VALUES ('user1@example.com', 'password1');`
  );
  db.run(
    `INSERT INTO Users (email, password) VALUES ('user2@example.com', 'password2');`
  );

  // Insert Projects
  db.run(`INSERT INTO Project (name, userId) VALUES ('Project A', 1);`);
  db.run(`INSERT INTO Project (name, userId) VALUES ('Project B', 2);`);

  // Insert Stories
  db.run(`INSERT INTO Story (name, projectId) VALUES ('Story 1', 1);`);
  db.run(`INSERT INTO Story (name, projectId) VALUES ('Story 2', 2);`);

  // Insert Tasks
  db.run(`INSERT INTO Task (name, story_id) VALUES ('Task 1', 1);`);
  db.run(`INSERT INTO Task (name, story_id) VALUES ('Task 2', 2);`);

  // Insert SubTasks
  db.run(
    `INSERT INTO SubTask (name, task_id, hours) VALUES ('SubTask 1', 1, 3);`
  );
  db.run(
    `INSERT INTO SubTask (name, task_id, hours) VALUES ('SubTask 2', 1, 5);`
  );
  db.run(
    `INSERT INTO SubTask (name, task_id, hours) VALUES ('SubTask 3', 2, 2);`
  );
  db.run(
    `INSERT INTO SubTask (name, task_id, hours) VALUES ('SubTask 4', 2, 4);`
  );
});

db.close((err) => {
  if (err) {
    console.error("Error closing the database connection:", err.message);
  } else {
    console.log("Seeding completed and database connection closed.");
  }
});
