const Router = require('express')
const router = new Router()
const eventToTagController = require('../controller/event_to_tag_controller')

/**************************************************************
 * Запросы на создание
 **************************************************************/
router.post('/eventTag', eventToTagController.addEventToTag)

/**************************************************************
 * Запросы на получение
 **************************************************************/
router.get('/eventTag', eventToTagController.getAllEventToTag)
router.post('/eventTag/IdId', eventToTagController.getIdEventToIdTag)
router.get('/eventTag/tagIdByEvent/:id', eventToTagController.getTagIdByEventId)
router.get('/eventTag/tagsByEvent/:id', eventToTagController.getTagsByEventId)
router.get('/eventTag/eventByTag/:id', eventToTagController.getEventByTagId)

/**************************************************************
 * Запросы на удаление
 **************************************************************/
router.delete('/eventTag/delAllByEventId/:id', eventToTagController.deleteEventToTagByEventId)
router.put('/eventTag/delByIds', eventToTagController.deleteEventToTagByBothIds)


module.exports = router