const Router = require('express')
const router = new Router()
const userEventController = require('../controller/user_to_event_controller')
const {body, param} = require("express-validator");
const {validateMethod} = require("../validating");

/**************************************************************
 * Запросы на создание
 **************************************************************/
router.post('/userEvent', body(["user_id", "event_id"]).isInt(), body("can_modify").isBoolean(),
    (req,res) => validateMethod(req,res, userEventController.addUserToEvent))

/**************************************************************
 * Запросы на получение
 **************************************************************/
// router.get('/userEvent', userEventController.getAllUserToEvent)
router.get('/userEvent/userId/:user_id', param('user_id').isInt(),
    (req,res) => validateMethod(req,res, userEventController.getEventToIdUser))

router.post('/userEvent/IdId', body(["user_id", "event_id"]).isInt(),
    (req,res) => validateMethod(req,res, userEventController.getIdUserToIdEvent))

router.get('/userEvent/eventByUser/:user_id', param('user_id').isInt(),
    (req,res) => validateMethod(req,res, userEventController.getEventsByUserId))
router.get('/userEvent/recEventByUser/:user_id', param('user_id').isInt(),
    (req,res) => validateMethod(req,res, userEventController.getRecEventsByUserId))
router.get('/userEvent/notActiveEventByUser/:user_id', param('user_id').isInt(),
    (req,res) => validateMethod(req,res, userEventController.getNotActiveEventsByUserId))
router.get('/userEvent/subscriptions/:user_id', param('user_id').isInt(),
    (req,res) => validateMethod(req,res, userEventController.getEventSubsByUserId))
router.get('/userEvent/createdEvents/:user_id', param('user_id').isInt(),
    (req,res) => validateMethod(req,res, userEventController.getCreatedEventsByUserId))

/**************************************************************
 * Запросы на обновление
 **************************************************************/
router.put('/userEvent/id/:id', param('id').isInt(), body(["user_id", "event_id"]).isInt(), body("can_modify").isBoolean(),
    (req,res) => validateMethod(req,res, userEventController.updateUserToEventById))

/**************************************************************
 * Запросы на удаление
 **************************************************************/
router.delete('/userEvent/delAllByEventId/:id', param('id').isInt(),
    (req,res) => validateMethod(req,res, userEventController.deleteUserToEventByEventId))

router.put('/userEvent/delByBothIds', body(["user_id", "event_id"]).isInt(),
    (req,res) => validateMethod(req,res, userEventController.deleteUserToEventByBothIds))


module.exports = router