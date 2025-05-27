const ee = require('@google/earthengine');
const privateKey = require('../gee-private-key.json');

function initGEE() {
  ee.data.authenticateViaPrivateKey(privateKey, () => {
    ee.initialize(null, null, () => {
      console.log('✅ Earth Engine initialized successfully');
    }, (err) => {
      console.error('❌ Earth Engine initialization failed:', err);
    });
  }, (err) => {
    console.error('❌ GEE authentication failed:', err);
  });
}

module.exports = initGEE;