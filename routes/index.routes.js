const express = require('express')
const router = express.Router()

const Picture = require('../models/picture.model')

router.get('/', (req, res, next) => res.render('index'))
router.get('/gallery', (req, res, next) => {

    Picture.find()
        .then(allThePictures => res.render('pages/gallery-page', { allThePictures }))
        .catch(err => next(new Error(err)))

})

module.exports = router
