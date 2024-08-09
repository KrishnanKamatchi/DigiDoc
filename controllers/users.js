const bcrypt = require("bcrypt");

class userController {
  constructor(database) {
    this.db = database;
    this.init();
  }

  async init() {
    this.checkRootUserExist();
  }

  checkRootUserExist() {
    this.db.get(`SELECT * FROM users WHERE name = ?`, ["admin"], (err, row) => {
      if (err) {
        console.log(err);
      }
      if (!row) {
        this.createAdminUsers();
      }
    });
  }

  createAdminUsers() {
    this.getSalt()
      .then((salt) => {
        return new Promise((resolve, reject) => {
          bcrypt.hash("archive", salt, (err, hash) => {
            if (err) reject(err);
            resolve(hash);
          });
        });
      })
      .then((hash) => {
        this.db.run(
          `INSERT INTO users (name, password) VALUES (?, ?)`,
          ["admin", hash],
          (err) => {
            if (err) reject(err);
            return true;
          }
        );
      });
  }

  getSalt() {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(10, (err, salt) => {
        !err ? resolve(salt) : reject(err);
      });
    });
  }

  login(name, password) {
    return new Promise((resolve, reject) => {
      this.db.get(
        `SELECT name, password FROM users WHERE name = ?`,
        [name],
        (err, row) => {
          if (err) {
            reject(err);
          }

          if (row) {
            bcrypt.compare(password, row.password, (err, result) => {
              if (err) {
                reject(err);
              }

              if (result) {
                resolve({ msg: "Logged in successfully" });
              } else {
                reject({ msg: "Wrong password" });
              }
            });
          } else {
            reject({ msg: `user ${name} not found` });
          }
        }
      );
    });
  }

  getallusers() {
    return new Promise((resolve, reject) => {
      this.db.all(`SELECT name FROM users`, (err, rows) => {
        if (err) {
          reject(err);
        }
        console.log(rows);
        resolve(rows);
      });
    });
  }
}

module.exports = (database) => {
  return new userController(database);
};
