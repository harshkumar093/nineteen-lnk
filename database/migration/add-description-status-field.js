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

// Migration to add `description` and `status` fields to tables
db.serialize(() => {
  console.log("Running migration to add `description` and `status` fields...");

  // Add `description` and `status` columns to Project table
  db.run(
    `ALTER TABLE Project ADD COLUMN description TEXT DEFAULT NULL;`,
    (err) => {
      if (err) console.error("Error adding description to Project:", err);
      else console.log("Added `description` to Project table.");
    }
  );

  db.run(
    `ALTER TABLE Project ADD COLUMN status TEXT DEFAULT 'pending';`,
    (err) => {
      if (err) console.error("Error adding status to Project:", err);
      else console.log("Added `status` to Project table.");
    }
  );

  // Add `description` and `status` columns to Story table
  db.run(
    `ALTER TABLE Story ADD COLUMN description TEXT DEFAULT NULL;`,
    (err) => {
      if (err) console.error("Error adding description to Story:", err);
      else console.log("Added `description` to Story table.");
    }
  );

  db.run(
    `ALTER TABLE Story ADD COLUMN status TEXT DEFAULT 'pending';`,
    (err) => {
      if (err) console.error("Error adding status to Story:", err);
      else console.log("Added `status` to Story table.");
    }
  );

  // Add `description` and `status` columns to Task table
  db.run(
    `ALTER TABLE Task ADD COLUMN description TEXT DEFAULT NULL;`,
    (err) => {
      if (err) console.error("Error adding description to Task:", err);
      else console.log("Added `description` to Task table.");
    }
  );

  db.run(
    `ALTER TABLE Task ADD COLUMN status TEXT DEFAULT 'pending';`,
    (err) => {
      if (err) console.error("Error adding status to Task:", err);
      else console.log("Added `status` to Task table.");
    }
  );

  // Add `description` and `status` columns to SubTask table
  db.run(
    `ALTER TABLE SubTask ADD COLUMN description TEXT DEFAULT NULL;`,
    (err) => {
      if (err) console.error("Error adding description to SubTask:", err);
      else console.log("Added `description` to SubTask table.");
    }
  );

  db.run(
    `ALTER TABLE SubTask ADD COLUMN status TEXT DEFAULT 'pending';`,
    (err) => {
      if (err) console.error("Error adding status to SubTask:", err);
      else console.log("Added `status` to SubTask table.");
    }
  );
});

db.close((err) => {
  if (err) {
    console.error("Error closing the database connection:", err.message);
  } else {
    console.log("Migration completed and database connection closed.");
  }
});
