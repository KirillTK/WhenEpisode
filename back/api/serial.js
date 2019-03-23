const express = require('express');
const request = require('request');
const { apiKey } = require('../configurations/serialConfig');

const router = express.Router();

router.get('/search/:search', (req, res, next) => {
  const { search } = req.params;

  request(`https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&language=en-US&query=${search}`, (error, response, body) => {
    if (error) next();
    res.send(body);
  });
});

router.get('/getTvInfo/:id', (req, res, next) => {
  const { id } = req.params;

  request(`https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&language=en-US`, (error, response, body) => {
    if (error) next();
    res.send(body);
  });
});

router.get('/getTvEpisodes/:id', (req, res, next) => {
  const { id } = req.params;

  request(`https://api.themoviedb.org/3/tv/${id}/season/1?api_key=${apiKey}&language=en-US`, (error, response, body) => {
    if (error) next();
    res.send(body);
  });
});

module.exports = router;
