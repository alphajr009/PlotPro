const ee = require('@google/earthengine');
const initGEE = require('../utils/geeInit');

initGEE();

exports.getNDVITileUrl = async (req, res) => {
  try {
    const { locationPoints, startDate, endDate } = req.body;

    if (!locationPoints || !Array.isArray(locationPoints) || locationPoints.length < 3) {
      return res.status(400).json({ error: 'Invalid locationPoints. Minimum 3 points required.' });
    }

    if (!startDate || !endDate) {
      return res.status(400).json({ error: 'Start and end date are required.' });
    }

    const coordinates = [
      ...locationPoints.map(p => [p.longitude, p.latitude]),
      [locationPoints[0].longitude, locationPoints[0].latitude],
    ];

    const polygon = ee.Geometry.Polygon([coordinates]);

    const image = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
      .filterBounds(polygon)
      .filterDate(startDate, endDate)
      .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
      .sort('CLOUDY_PIXEL_PERCENTAGE')
      .first();

    const info = await image.getInfo();
    if (!info || !info.id) {
      return res.status(404).json({ error: 'No suitable Sentinel-2 image found for this area or time range.' });
    }

    const rawNDVI = image.normalizedDifference(['B8', 'B4']).rename('NDVI');
    const ndviClipped = rawNDVI.clip(polygon).resample('bicubic');
    const ndviMasked = ndviClipped.updateMask(ee.Image.constant(1).clip(polygon));

    const visParams = {
      min: 0.0,
      max: 1.0,
      palette: ['brown', 'yellow', 'green'],
    };

    ndviMasked.getMap(visParams, (map, error) => {
      if (error || !map || !map.urlFormat) {
        return res.status(500).json({ error: 'Failed to generate NDVI tile.' });
      }

      return res.status(200).json({ tileUrl: map.urlFormat });
    });

  } catch (err) {
    console.error('[NDVI Controller Error]', err);
    return res.status(500).json({ error: 'Internal Server Error: ' + err.message });
  }
};
