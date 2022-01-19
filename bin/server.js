const app = require("../app");
const db = require("../config");
const { mkdir } = require("fs/promises");
require("../helpers");

const {
  VARIABLES_ENV: { PORT = 3001, UPLOAD_DIR },
} = require("../utils");

db.then(() => {
  app.listen(PORT, async () => {
    await mkdir(UPLOAD_DIR, { recursive: true });
    console.log(`Server running. API port: ${PORT}`.brightBlue.bold);
  });
}).catch((err) => {
  console.log(`Server not running.Error: ${err.message}`.red.bold);
});