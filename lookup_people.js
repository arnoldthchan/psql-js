const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

const input = process.argv;

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query("SELECT $1::int AS TEXT", [input], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log(result.rows[0].input); //output: 1
    console.log(result);
    client.end();
  });
});