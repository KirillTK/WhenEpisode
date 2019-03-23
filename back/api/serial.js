const express = require('express');
const request = require('request');
const rp = require('request-promise');

const rpForJson = rp.defaults({ json: true });
const { apiKey } = require('../configurations/serialConfig');

const router = express.Router();

router.get('/search/:search', (req, res, next) => {
  const { search } = req.params;

  request(`https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&language=en-US&query=${search}`, (error, response, body) => {
    if (error) next();
    res.send(JSON.parse(body));
  });
});

router.get('/getTvInfo/:id', (req, res, next) => {
  const { id } = req.params;

  request(`https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&language=en-US`, (error, response, body) => {
    if (error) next();
    res.send(JSON.parse(body));
  });
});

router.get('/getTvEpisodes/:id', async (req, res, next) => {
  const { id } = req.params;
  const serialResponse = await rp(`https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&language=en-US`);
  const serial = JSON.parse(serialResponse);

  const promises = [];
  serial.seasons.forEach((season) => {
    promises.push(rpForJson(`https://api.themoviedb.org/3/tv/${id}/season/${season.season_number}?api_key=${apiKey}&language=en-US`));
  });

  const result = await Promise.all(promises);
  res.send(result);
});

module.exports = router;
