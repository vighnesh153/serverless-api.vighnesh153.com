/**
 * @author Vighnesh Raut <rvighnes@amazon.com>
 */

const healthCheck = (req, res) => {
  console.log('Health Check Success');
  res.sendStatus(200);
};

const rootWildcardHandler = (req, res) => {
  console.log('Inside Root Wild Card Route handler');
  return res.json({
    message: "✨✨✨👻👻👻 Oops. You are not supposed to be here. GO AWAY!!! or I will hack your computer using HTML 👻👻👻✨✨✨",
  });
};

const middlewares = {
  rootWildcardHandler,
  healthCheck,
};

module.exports = middlewares;
