"use strict";

exports.DATABASE_URL =
  process.env.DATABASE_URL ||
  "mongodb+srv://zero-admin:WutangClan@cluster0.pfvwv.mongodb.net/iterable-coffee?retryWrites=true";
exports.TEST_DATABASE_URL =
  process.env.TEST_DATABASE_URL ||
  "mongodb+srv://zero-admin:WutangClan@cluster0.pfvwv.mongodb.net/test-iterable-coffee?retryWrites=true";

exports.PORT = process.env.PORT || 80;

exports.SECRET = "f29c0de6f2d25e45f8eaa4fd3b933fa255b84d0950f97da0bb8689fc7fa1482b5028595f89bad06d2d5cc21270bc4b6145d7e22134131a88d982dc5de6c4f5fd"

exports.ITKEY = "4c325b5acb4b4754b15e5d4456c9418d"