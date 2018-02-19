const router = require('express').Router();
const path = require('path');

router.all('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../dist/index.html'));
});

module.exports = router;
