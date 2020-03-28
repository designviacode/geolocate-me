const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
// LIBRARIES
const publicIP = require('public-ip');
const geoIP = require('geoip-lite');

const PORT = process.env.PORT || 8080;
const app = express();
app.use(helmet());
app.use(bodyParser.json());

app.get('/api/ip-geo', async (req, res) => {
  let requestedIP = await publicIP.v4();
  let requestedGeolocation = await geoIP.lookup(requestedIP);

  res.json({
    success: true,
    data: {
      ip: requestedIP,
      geo: {
        latitude: requestedGeolocation.ll[0] || 0,
        longitude: requestedGeolocation.ll[1] || 0
      }
    }
  });
});

app.listen(
  PORT,
  () => console.log(`Listening on localhost:${PORT}`)
);