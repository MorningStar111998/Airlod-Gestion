// userRole.js

function getUserRole(req) {
  return req.session.userRole || "guest";
}

module.exports = getUserRole;
