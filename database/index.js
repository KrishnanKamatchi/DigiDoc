const sqlite3 = require("sqlite3").verbose(console.log);
const path = require("path");
const fs = require("fs");

class dbConfig {
  constructor() {
    this.databasePath = path.resolve(path.join(__dirname, "../digidoc.db"));
    this.init();
  }

  init() {
    this.checkDatabase();
    this.setDatabase();
    this.createTables();
  }

  checkDatabase() {
    if (!fs.existsSync(this.databasePath)) {
      fs.writeFile(this.databasePath, "", (err) => {
        if (err) {
          console.log(err);
        }
      });
    }
  }

  setDatabase() {
    this.db = new sqlite3.Database(this.databasePath, (err) => {
      if (err) {
        console.log(err);
      }
    });
  }

  createTables() {
    this.db.serialize(() => {
      this.db.run(
        `CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT,
          password TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`
      );

      this.db.run(
        `CREATE TABLE IF NOT EXISTS documents (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT,
          version TEXT,
          content TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        
        )`
      );
    });
  }

  close() {
    this.db.close((err) => {
      if (err) {
        console.log(err);
      }
    });
  }
}
module.exports = () => {
  return new dbConfig();
};
