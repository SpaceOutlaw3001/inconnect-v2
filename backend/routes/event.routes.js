const Router = require('express')
const router = new Router()
const eventController = require('../controller/event.controller')

/**************************************************************
 * Запросы на создание
 **************************************************************/
router.post('/event', eventController.addEvent)

/**************************************************************
 * Запросы на получение
 **************************************************************/
router.get('/event', eventController.getAllEvents)
router.get('/event/id/:id', eventController.getById)
router.get('/event/name/:name', eventController.getByName)

/**************************************************************
 * Запросы на обновление
 **************************************************************/
router.put('/event/id/:id', eventController.updateById)

/**************************************************************
 * Запросы на удаление
 **************************************************************/
router.delete('/event/id/:id', eventController.deleteById)

module.exports = router