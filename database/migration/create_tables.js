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

// Migration: Create Tables
db.serialize(() => {
  console.log("Running migration to create tables...");

  // Create Users Table
  db.run(
    `
    CREATE TABLE IF NOT EXISTS Users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `,
    (err) => {
      if (err) {
        console.error("Error creating Users table:", err.message);
      } else {
        console.log("Users table created successfully.");
      }
    }
  );

  // Create Project Table
  db.run(
    `
    CREATE TABLE IF NOT EXISTS Project (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      userId INTEGER NOT NULL,
      FOREIGN KEY (userId) REFERENCES Users (id) ON DELETE CASCADE
    );
  `,
    (err) => {
      if (err) {
        console.error("Error creating Project table:", err.message);
      } else {
        console.log("Project table created successfully.");
      }
    }
  );

  // Create Story Table
  db.run(
    `
    CREATE TABLE IF NOT EXISTS Story (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      projectId INTEGER NOT NULL,
      name TEXT NOT NULL,
      FOREIGN KEY (projectId) REFERENCES Project (id) ON DELETE CASCADE
    );
  `,
    (err) => {
      if (err) {
        console.error("Error creating Story table:", err.message);
      } else {
        console.log("Story table created successfully.");
      }
    }
  );

  // Create Task Table
  db.run(
    `
    CREATE TABLE IF NOT EXISTS Task (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      story_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      FOREIGN KEY (story_id) REFERENCES Story (id) ON DELETE CASCADE
    );
  `,
    (err) => {
      if (err) {
        console.error("Error creating Task table:", err.message);
      } else {
        console.log("Task table created successfully.");
      }
    }
  );

  // Create SubTask Table (only this table contains `hours`)
  db.run(
    `
    CREATE TABLE IF NOT EXISTS SubTask (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      task_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      hours INTEGER NOT NULL DEFAULT 0,
      FOREIGN KEY (task_id) REFERENCES Task (id) ON DELETE CASCADE
    );
  `,
    (err) => {
      if (err) {
        console.error("Error creating SubTask table:", err.message);
      } else {
        console.log("SubTask table created successfully.");
      }
    }
  );
});

db.close((err) => {
  if (err) {
    console.error("Error closing the database connection:", err.message);
  } else {
    console.log("Database connection closed.");
  }
});
