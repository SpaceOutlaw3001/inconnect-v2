const Router = require('express')
const router = new Router()
const userEventController = require('../controller/user_to_event_controller')

/**************************************************************
 * Запросы на создание
 **************************************************************/
router.post('/userEvent', userEventController.addUserToEvent)

/**************************************************************
 * Запросы на получение
 **************************************************************/
router.get('/userEvent', userEventController.getAllUserToEvent)
router.get('/userEvent/userId/:user_id', userEventController.getEventToIdUser)
router.post('/userEvent/IdId', userEventController.getIdUserToIdEvent)

router.get('/userEvent/eventByUser/:user_id', userEventController.getEventsByUserId)
router.get('/userEvent/recEventByUser/:user_id', userEventController.getRecEventsByUserId)
router.get('/userEvent/notActiveEventByUser/:user_id', userEventController.getNotActiveEventsByUserId)
router.get('/userEvent/subscriptions/:user_id', userEventController.getEventSubsByUserId)
router.get('/userEvent/createdEvents/:user_id', userEventController.getCreatedEventsByUserId)

/**************************************************************
 * Запросы на обновление
 **************************************************************/
router.put('/userEvent/id/:id', userEventController.updateUserToEventById)

/**************************************************************
 * Запросы на удаление
 **************************************************************/
router.delete('/userEvent/delAllByEventId/:id', userEventController.deleteUserToEventByEventId)
router.put('/userEvent/delByBothIds', userEventController.deleteUserToEventByBothIds)


module.exports = router