const express = require('express');
const config = require('config');

const firestore = require('../firestore');
const characterRoute = require('./character');
const router = express.Router();
const characterConfig = config.get('characters');

router.use('/:roomKey', (req, res, next) => {
  req.roomKey = req.params.roomKey.trim();
  next();
}, characterRoute);

router.post('/', (req, res, next) => {
  const roomName = req.body.roomName.trim();
  const roomKey = roomName.toLowerCase().replace(/[^a-z0-9]/g, '-');

  const newRoom = {
    name: roomName,
    characterTemplate: characterConfig.template,
    password: null,
  }

  firestore.collection('rooms').doc(roomKey).get()
    .then((roomRef) => {
      if (!roomRef.exists) return firestore.collection('rooms').doc(roomKey).set(newRoom);

      return Promise.resolve();
    })
    .then(() => {
      res.redirect(`/room/${roomKey}/characters`);
    })
    .catch(err => {
      next(err);
    })
});

router.get('/:roomKey', (req, res, next) => {
  const roomKey = req.params.roomKey.trim();
  firestore.collection('rooms').doc(roomKey).get()
    .then((doc) => {
      const room = doc.data();
      res.render('dm/index', { title: room.name });
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
