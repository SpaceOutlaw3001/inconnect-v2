const Router = require('express')
const router = new Router()
const userTagController = require('../controller/user_to_tag_controller')

/**************************************************************
 * Запросы на создание
 **************************************************************/
router.post('/userTag', userTagController.addUserToTag)

/**************************************************************
 * Запросы на получение
 **************************************************************/
router.get('/userTag', userTagController.getAllUserToTag)
router.get('/userTag/userId/:user_id', userTagController.getTagToIdUser)
router.post('/userTag/IdId', userTagController.getIdUserToIdTag)
router.get('/userTag/tagsByUser/:id', userTagController.getTagsByUserId)

/**************************************************************
 * Запросы на удаление
 **************************************************************/
router.put('/userTag/IdId', userTagController.deleteUserToTagByBothIds)


module.exports = router