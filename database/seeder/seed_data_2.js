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
    `INSERT INTO Users (email, password) VALUES ('john.doe@example.com', 'securepassword1');`
  );
  db.run(
    `INSERT INTO Users (email, password) VALUES ('jane.smith@example.com', 'securepassword2');`
  );
  db.run(
    `INSERT INTO Users (email, password) VALUES ('emily.davis@example.com', 'securepassword3');`
  );
  db.run(
    `INSERT INTO Users (email, password) VALUES ('michael.brown@example.com', 'securepassword4');`
  );
  db.run(
    `INSERT INTO Users (email, password) VALUES ('sophia.wilson@example.com', 'securepassword5');`
  );

  // Insert Projects
  db.run(`INSERT INTO Project (name, userId) VALUES ('Website Redesign', 1);`);
  db.run(
    `INSERT INTO Project (name, userId) VALUES ('Mobile App Development', 2);`
  );
  db.run(
    `INSERT INTO Project (name, userId) VALUES ('Marketing Campaign', 3);`
  );
  db.run(
    `INSERT INTO Project (name, userId) VALUES ('E-commerce Platform', 1);`
  );
  db.run(
    `INSERT INTO Project (name, userId) VALUES ('Data Analysis Project', 2);`
  );

  // Insert Stories
  db.run(
    `INSERT INTO Story (name, projectId) VALUES ('Design Landing Page', 1);`
  );
  db.run(
    `INSERT INTO Story (name, projectId) VALUES ('Develop Login System', 1);`
  );
  db.run(
    `INSERT INTO Story (name, projectId) VALUES ('Setup API Integration', 2);`
  );
  db.run(
    `INSERT INTO Story (name, projectId) VALUES ('Create Marketing Materials', 3);`
  );
  db.run(
    `INSERT INTO Story (name, projectId) VALUES ('Build Product Catalog', 4);`
  );

  // Insert Tasks
  db.run(`INSERT INTO Task (name, story_id) VALUES ('Wireframe Design', 1);`);
  db.run(`INSERT INTO Task (name, story_id) VALUES ('Create UI Mockups', 1);`);
  db.run(
    `INSERT INTO Task (name, story_id) VALUES ('Develop Backend API', 2);`
  );
  db.run(
    `INSERT INTO Task (name, story_id) VALUES ('Integrate OAuth Login', 2);`
  );
  db.run(
    `INSERT INTO Task (name, story_id) VALUES ('Fetch Data from Third-party API', 3);`
  );
  db.run(
    `INSERT INTO Task (name, story_id) VALUES ('Design Marketing Posters', 4);`
  );

  // Insert SubTasks
  db.run(
    `INSERT INTO SubTask (name, task_id, hours) VALUES ('Sketch Initial Layout', 1, 2);`
  );
  db.run(
    `INSERT INTO SubTask (name, task_id, hours) VALUES ('Finalize Wireframe', 1, 3);`
  );
  db.run(
    `INSERT INTO SubTask (name, task_id, hours) VALUES ('Build API Endpoints', 2, 4);`
  );
  db.run(
    `INSERT INTO SubTask (name, task_id, hours) VALUES ('Write Unit Tests for API', 2, 2);`
  );
  db.run(
    `INSERT INTO SubTask (name, task_id, hours) VALUES ('Design Posters for Social Media', 3, 6);`
  );
  db.run(
    `INSERT INTO SubTask (name, task_id, hours) VALUES ('Draft Email Subject Lines', 4, 2);`
  );
});

db.close((err) => {
  if (err) {
    console.error("Error closing the database connection:", err.message);
  } else {
    console.log("Seeding completed and database connection closed.");
  }
});
