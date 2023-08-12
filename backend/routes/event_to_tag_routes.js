const Router = require('express')
const router = new Router()
const eventToTagController = require('../controller/event_to_tag_controller')
const {body, param} = require("express-validator");
const {validateMethod} = require("../validating");

/**************************************************************
 * Запросы на создание
 **************************************************************/
router.post('/eventTag', body(['event_id', 'tag_id']).isInt(),
    (req,res) => validateMethod(req,res, eventToTagController.addEventToTag))

/**************************************************************
 * Запросы на получение
 **************************************************************/
router.get('/eventTag', eventToTagController.getAllEventToTag)
router.post('/eventTag/IdId', body(["event_id", "tag_id"]).isInt(),
    (req,res) => validateMethod(req,res, eventToTagController.getIdEventToIdTag))
router.get('/eventTag/tagIdByEvent/:id', param('id').isInt(),
    (req,res) => validateMethod(req,res, eventToTagController.getTagIdByEventId))
router.get('/eventTag/tagsByEvent/:id', param('id').isInt(),    (req,res) => validateMethod(req,res, eventToTagController.getTagsByEventId))
router.get('/eventTag/eventByTag/:id', param('id').isInt(),
    (req,res) => validateMethod(req,res, eventToTagController.getEventByTagId))

/**************************************************************
 * Запросы на удаление
 **************************************************************/
router.delete('/eventTag/delAllByEventId/:id', param('id').isInt(),
    (req,res) => validateMethod(req,res, eventToTagController.deleteEventToTagByEventId))
router.put('/eventTag/delByIds', param(['event_id', 'tag_id']).isInt(),
    (req,res) => validateMethod(req,res, eventToTagController.deleteEventToTagByBothIds))

module.exports = router