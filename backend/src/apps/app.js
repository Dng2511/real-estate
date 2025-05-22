const express = require('express');
const config = require('config');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(config.get("app.prefix"), require(`${__dirname}/../routers/web`));

module.exports = app;