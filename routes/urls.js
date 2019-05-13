const express = require('express');
const router = express.Router();
import validUrl from 'valid-url';
import shortId from 'shortid';

import models, { sequelize } from '../models/index';

/* GET shortended_url and redirect to original_url */
router.get('/:url_code', async (req, res, next) => {
  const code = req.params.url_code;
  try {
    const url = await models.Url.findOne({ where: {url_code: code} });
    if (url) {
      return res.redirect(url.original_url);
    } else {
      res.status(404).json({message: "Shortened url code not found"});
    }
  } catch (error) {
    res.status(500).json({message: 'Error fetching shortened url info', error: error});
  };
});

/* GET url by url_code */
router.get('/urls/:url_code', async (req, res, next) => {
  const urlCode = req.params.url_code;
  try {
    const url = await models.Url.findOne({ where: {url_code: urlCode} });
    if (url) {
      res.status(200).json({
        id: url.id,
        shortened_url: url.shortened_url,
        original_url: url.original_url
      });
    } else {
      res.status(404).json({message: "Url with provided code not found"});
    }
  } catch (error) {
    res.status(500).json({message: 'Error fetching shortened url', error: error});
  };
});

/* POST create shortend url. */
router.post('/urls', async (req, res, next) => {
  const { originalUrl } = req.body;
  const isValidUrl = validUrl.isUri(originalUrl);
  if (isValidUrl) {
    try {
      const urlCode = shortId.generate();
      const shortenedUrl = `${process.env.BASE_URL}/${urlCode}`;
      const urlRecord = await models.Url.create({
        original_url: originalUrl,
        shortened_url: shortenedUrl,
        url_code: urlCode
      });
      res.status(200).json({
        id: urlRecord.id,
        shortened_url: urlRecord.shortened_url
      });
    } catch (error) {
      res.status(500).json({message: 'Error creating shortened url', error: error});
    }
  } else {
    return res.status(422).json({message: 'Invalid url provided'});
  };
});

module.exports = router;
