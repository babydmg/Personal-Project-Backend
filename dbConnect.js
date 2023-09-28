const { connect } = require('mongoose');

const dbConnect = async () => {
  await connect(process.env.DATABASE_URL)
    .then(() => console.log('DATABASE Connected Successfully'))
    .catch((e) => console.log(e));
};

module.exports = dbConnect;
