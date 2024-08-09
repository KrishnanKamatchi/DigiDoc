class documentsController {
  constructor(database) {
    this.db = database;
  }

  create(name, version, content) {
    return new Promise((resolve, reject) => {
      this.db.run(
        `INSERT INTO documents (name, version, content) VALUES (?, ?, ?)`,
        [name, version, content],
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve({ msg: "Document created successfully" });
          }
        }
      );
    });
  }

  update(name, version, content) {
    return new Promise((resolve, reject) => {
      this.db.run(
        `UPDATE documents SET content = ? WHERE name = ? AND version = ?`,
        [content, name, version],
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve({ msg: "Document updated successfully" });
          }
        }
      );
    });
  }

  get(name, version) {
    return new Promise((resolve, reject) => {
      this.db.get(
        `SELECT name, version, content FROM documents WHERE name = ? AND version = ?`,
        [name, version],
        (err, row) => {
          if (err) {
            reject(err);
          } else {
            resolve(row);
          }
        }
      );
    });
  }

  delete(name, version) {
    return new Promise((resolve, reject) => {
      this.db.run(
        `DELETE FROM documents WHERE name = ? AND version = ?`,
        [name, version],
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve({ msg: "Document deleted successfully" });
          }
        }
      );
    });
  }
}

module.exports = (db) => {
  return new documentsController(db);
};
