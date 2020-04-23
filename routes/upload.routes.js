const express = require('express')
const router = express.Router()
const multer = require('multer')
const Picture = require('../models/picture.model')

// File upload settings
const uploadLocal = multer({ dest: './public/uploads/' })






// Local upload files routes
router.get('/upload-local', (req, res, next) => res.render('files/upload-form', { dest: 'CDN', path: 'upload-local' }))
router.post('/upload-local', uploadLocal.single('imageFile'), (req, res, next) => {

    // Validator
    req.file.size > 3000000 ? console.log("El tamaño de imagen es tochísimo") : console.log('El tamaño de imagen mola')

    Picture.create({
        name: req.body.imageName,
        path: `/uploads/${req.file.filename}`,
        originalName: req.file.originalname
    })
        .then(() => res.redirect('/gallery'))
        .catch(err => next(new Error(err)))
})






// CDN file upoloads routs

const cloudUploader = require('../configs/cloudinary.config')

router.get('/upload-cdn', (req, res, next) => res.render('files/upload-form', { dest: 'CDN', path: 'upload-cdn' }))
router.post('/upload-cdn', cloudUploader.single('imageFile'), (req, res, next) => {

    Picture.create({
        name: req.body.imageName,
        path: req.file.url,
        originalName: req.file.originalname
    })
        .then(() => res.redirect('/gallery'))
        .catch(err => next(new Error(err)))
})


module.exports = router