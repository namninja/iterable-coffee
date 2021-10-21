"use strict";

exports.DATABASE_URL =
  process.env.DATABASE_URL ||
  "mongodb+srv://zero-admin:WutangClan@cluster0-pfvwv.mongodb.net/iterable-coffee?retryWrites=true";
exports.TEST_DATABASE_URL =
  process.env.TEST_DATABASE_URL ||
  "mongodb+srv://zero-admin:WutangClan@cluster0-pfvwv.mongodb.net/test-iterable-coffee?retryWrites=true";

exports.PORT = process.env.PORT || 80;
