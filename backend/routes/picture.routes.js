const Router = require('express')
const router = new Router()
const pictureController = require('../controller/picture.controller')

/**************************************************************
 * Запросы на создание
 **************************************************************/
router.post('/picture', pictureController.addPicture)

/**************************************************************
 * Запросы на получение
 **************************************************************/
router.get('/picture', pictureController.getAllPictures)
router.get('/picture/:id', pictureController.getPictureById)
router.get('/picture/tag_id/:tag_id', pictureController.getPictureByTagId)

/**************************************************************
 * Запросы на обновление
 **************************************************************/
router.put('/picture/:id', pictureController.updatePictureById)

/**************************************************************
 * Запросы на удаление
 **************************************************************/
router.delete('/picture/:id', pictureController.deletePictureById)


module.exports = router