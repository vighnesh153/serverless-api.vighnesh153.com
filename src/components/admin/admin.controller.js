/**
 * @author Vighnesh Raut <rvighnes@amazon.com>
 */

const router = require('express').Router();

const config = require('../../config');
const middlewares = require('../../middlewares');
const Dynamo = require('../../services/Dynamo');

const commonData = {config};

// Dashboard
router.get('/', async (req, res) => {
  const audits = await Dynamo.batchRead(config.TABLE_NAMES.AUDITS, {
    Limit: 5,
  })
  return res.render(config.VIEWS.ADMIN.DASHBOARD, { ...commonData, audits, });
});

router.use((req, res) => {
  console.log('404 route triggerred');
  console.log('req', req);
  res.render(config.VIEWS[404], { ...commonData, })
});


module.exports = router;
