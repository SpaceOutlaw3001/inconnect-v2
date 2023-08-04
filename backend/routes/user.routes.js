const Router = require('express')
const router = new Router()
const userController = require('../controller/user.controller')

/**************************************************************
 * Запросы на создание
 **************************************************************/
router.post('/user', userController.addId)

/**************************************************************
 * Запросы на получение
 **************************************************************/
router.get('/user', userController.getAllId)
router.get('/user/:id', userController.getId)

/**************************************************************
 * Запросы на обновление
 **************************************************************/
router.put('/user/:id', userController.updateId)

/**************************************************************
 * Запросы на удаление
 **************************************************************/
router.delete('/user/:id', userController.deleteId)

module.exports = router