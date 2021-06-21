/**
 * @author Vighnesh Raut <rvighnes@amazon.com>
 */

require('dotenv').config();
const app = require('./src/app');

app.listen(3000, () => {
  console.log('server listening on port 3000');
});
