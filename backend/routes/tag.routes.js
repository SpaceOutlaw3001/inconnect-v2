const Router = require('express')
const router = new Router()
const tagController = require('../controller/tag.controller')

/**************************************************************
 * Запросы на создание
 **************************************************************/
router.post('/tag', tagController.addTag)

/**************************************************************
 * Запросы на получение
 **************************************************************/
router.get('/tag', tagController.getAllTag)
router.get('/tag/:id', tagController.getIdTag)
router.get('/tag/name/:name', tagController.getTagByName)

/**************************************************************
 * Запросы на обновление
 **************************************************************/
router.put('/tag/:id', tagController.updateIdTag)

/**************************************************************
 * Запросы на удаление
 **************************************************************/
router.delete('/tag/:id', tagController.deleteIdTag)


module.exports = router