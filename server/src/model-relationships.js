const db = require('../models');

db.users.hasMany(db.roles);
db.roles.belongsTo(db.clients);
