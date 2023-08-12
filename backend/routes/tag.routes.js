const Router = require('express')
const router = new Router()
const tagController = require('../controller/tag.controller')
const {param} = require("express-validator");
const {paramTextChain, validateMethod} = require("../validating");

/**************************************************************
 * Запросы на создание
 **************************************************************/
/*
router.post('/tag', bodyTextChain(["name", "title_ru"]), body(['name', "title_ru"]).isLength({max: 50}),
    (req,res) => validateMethod(req,res, tagController.addTag))
*/

/**************************************************************
 * Запросы на получение
 **************************************************************/
router.get('/tag', tagController.getAllTag.bind(tagController))
/*
router.get('/tag/:id', param('id').isInt(),
    (req,res) => validateMethod(req,res, tagController.getIdTag))
router.get('/tag/name/:name', paramTextChain('name'),
    (req,res) => validateMethod(req,res, tagController.getTagByName))
*/

/**************************************************************
 * Запросы на обновление
 **************************************************************/
/*
router.put('/tag/:id', param('id').isInt(), bodyTextChain(["name", "title_ru"]),body(['name', "title_ru"]).isLength({max: 50}),
    (req,res) => validateMethod(req,res, tagController.updateIdTag))
*/

/**************************************************************
 * Запросы на удаление
 **************************************************************/
/*
router.delete('/tag/:id', param('id').isInt(),
    (req,res) => validateMethod(req,res, tagController.deleteIdTag))
*/


module.exports = router