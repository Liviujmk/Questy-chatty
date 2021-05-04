const express = require('express');
const router = express.Router()
const Room = require('../models/room')

router.get('/', (req, res) => {
    res.render('index', {
        room: new Room()
    })
})

router.get('/:code', async(req,res) => {
    const room = await Room.findOne({code: req.params.code})
    if(room) {
        res.render('rooms/show', {
            room: room
        })
    } else {
        res.status(404).send("<h1>Room not found</h1>")
    }
    console.log(req.params.code);
})

router.post('/', async(req, res, next) => {
    req.room = new Room()
    next()
}, saveRoomAndRedirect())

function saveRoomAndRedirect() {
    return async(req, res) => {
        let room = req.room
        room.code = req.body.code
        try {
          room = await room.save()
          res.redirect(`/${room.code}`)
          /*res.send('nice')*/
        } catch (e) {
          //res.redirect('/dashboard/rooms/new')
          res.send('Not working')
        }
      }
}

module.exports = router