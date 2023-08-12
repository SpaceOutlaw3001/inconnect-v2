const Router = require('express')
const router = new Router()
const eventController = require('../controller/event.controller')
const {param, body} = require("express-validator");
const {bodyTextChain, paramTextChain, validateMethod} = require("../validating");

/**************************************************************
 * Запросы на создание
 **************************************************************/
router.post('/event',
    bodyTextChain(
        ['name', 'text', 'place']
    ),
    body('date').isDate(),
    body('time').isTime({}),
    body('picture_id').isInt(),
    body('chat_link').optional().isURL(),
    (req,res) => validateMethod(req,res, eventController.addEvent))

/**************************************************************
 * Запросы на получение
 **************************************************************/
router.get('/event', eventController.getAllEvents)
router.get('/event/id/:id', param('id').isInt(),
    (req,res) => validateMethod(req,res, eventController.getById.bind(eventController)))

router.get('/event/name/:name', paramTextChain('name'),
    (req,res) => validateMethod(req,res, eventController.getByName))

/**************************************************************
 * Запросы на обновление
 **************************************************************/
router.put('/event/id/:id', param('id').isInt(),
    bodyTextChain(
        ['name', 'text', 'place']
    ),
    body('date').isDate(),
    body('time').isTime({}),
    body('picture_id').isInt(),
    body('chat_link').optional().isURL(),
    (req,res) => validateMethod(req,res, eventController.updateById))

/**************************************************************
 * Запросы на удаление
 **************************************************************/
router.delete('/event/id/:id', param('id').isInt(),
    (req,res) => validateMethod(req,res, eventController.deleteById))

module.exports = router