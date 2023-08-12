const Router = require('express')
const router = new Router()
const pictureController = require('../controller/picture.controller')
const {body, param} = require("express-validator");
const {validateMethod} = require("../validating");

/**************************************************************
 * Запросы на создание
 **************************************************************/
/*
router.post('/picture', body("tag_id").isInt(), body('url').isURL({protocols: ['https']}),
    (req,res) => validateMethod(req,res, pictureController.addPicture))
*/

/**************************************************************
 * Запросы на получение
 **************************************************************/
router.get('/picture', pictureController.getAllPictures.bind(pictureController))
/*
router.get('/picture/:id', param('id').isInt(),
    (req,res) => validateMethod(req,res, pictureController.getPictureById))

router.get('/picture/tag_id/:tag_id', param('tag_id').isInt(),
    (req,res) => validateMethod(req,res, pictureController.getPictureByTagId))
*/

/**************************************************************
 * Запросы на обновление
 **************************************************************/
/*
router.put('/picture/:id', param('id').isInt(),body("tag_id").isInt(), body('url').isURL({protocols: ['https']}),
    (req,res) => validateMethod(req,res, pictureController.updatePictureById))
*/

/**************************************************************
 * Запросы на удаление
 **************************************************************/
/*
router.delete('/picture/:id',param('id').isInt(),
    (req,res) => validateMethod(req,res, pictureController.deletePictureById))
*/

module.exports = router