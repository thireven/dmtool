const express = require('express');
const config = require('config');
const router = express.Router();
const characterConfig = config.get('characters');

router.get('/characters', (req, res) => {
  res.render('dm/characters');
});

router.get('/characters/template/:templateId/form', (req, res) => {
  const template = characterConfig.template;
  res.render('dm/characterForm', { template });
});

router.get('/characters/template', (req, res) => {
  const template = JSON.stringify(characterConfig.template);
  res.render('dm/characterTemplate', { template });
});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Why 2222' });
});


module.exports = router;
