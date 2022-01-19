const pkg = require("mongoose");
const { connect, connection } = pkg;
require("../helpers");

const {
  MESSAGES,
  VARIABLES_ENV: { URI_DB },
} = require("../utils");

const db = connect(URI_DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connection.on("connected", () =>
  console.log(`${MESSAGES.connected}`.brightBlue.bold)
);

connection.on("err", (err) =>
  console.log(`${MESSAGES.errMsg}: ${err.message}`.red.bold)
);

connection.on("disconnected", () =>
  console.log(`${MESSAGES.disconnected}`.brightBlue.bold)
);

process.on("SIGINT", async () => {
  connection.close();
  console.log(`${MESSAGES.closeConnection}`);
  process.exit(1);
});

module.exports = db;