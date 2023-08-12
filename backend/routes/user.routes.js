const Router = require('express')
const router = new Router()
const userController = require('../controller/user.controller')
const {body, param} = require("express-validator");
const {validateMethod} = require("../validating");

/**************************************************************
 * Запросы на создание
 **************************************************************/
router.post('/user', body('id').isInt(),
    (req,res) => validateMethod(req,res, userController.addId.bind(userController)))

/**************************************************************
 * Запросы на получение
 **************************************************************/
// router.get('/user', userController.getAllId)
/*
router.get('/user/:id', param('id').isInt(),
    (req,res) => validateMethod(req,res, userController.getId))
*/

/**************************************************************
 * Запросы на обновление
 **************************************************************/
// router.put('/user/:id', userController.updateId)

/**************************************************************
 * Запросы на удаление
 **************************************************************/
// router.delete('/user/:id', userController.deleteId)

module.exports = router