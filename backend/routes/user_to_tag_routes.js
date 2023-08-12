const Router = require('express')
const router = new Router()
const userTagController = require('../controller/user_to_tag_controller')
const {body, param} = require("express-validator");
const {validateMethod} = require("../validating");

/**************************************************************
 * Запросы на создание
 **************************************************************/
router.post('/userTag', body(["user_id", "tag_id"]).isInt(),
    (req,res) => validateMethod(req,res, userTagController.addUserToTag))

/**************************************************************
 * Запросы на получение
 **************************************************************/
// router.get('/userTag', userTagController.getAllUserToTag)
router.get('/userTag/userId/:user_id', param('user_id').isInt(),
    (req,res) => validateMethod(req,res, userTagController.getTagToIdUser))
router.post('/userTag/IdId', body(["user_id", "tag_id"]).isInt(),
    (req,res) => validateMethod(req,res, userTagController.getIdUserToIdTag))
router.get('/userTag/tagsByUser/:id', param('id').isInt(),
    (req,res) => validateMethod(req,res, userTagController.getTagsByUserId))

/**************************************************************
 * Запросы на удаление
 **************************************************************/
router.put('/userTag/IdId', body(["user_id", "tag_id"]).isInt(),
    (req,res) => validateMethod(req,res, userTagController.deleteUserToTagByBothIds))


module.exports = router