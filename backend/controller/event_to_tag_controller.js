const db = require('../db')

class eventToTagController {

    /**************************************************************
     * Создание новой связи между event_id (событием} и tag_id (тегом)
     * @param req
     * @param res
     * @returns {Promise<void>}
     **************************************************************/
    async addEventToTag(req, res) {
        const {event_id, tag_id} = req.body
        const newETT = await db.query(`insert into "event_to_tag" (event_id, tag_id)
                                       values ($1, $2)
                                       on conflict do nothing
                                       returning * `, [event_id, tag_id])
        res.json(newETT.rows[0])
    }


    /**************************************************************
     * Получение всех связей
     * @param req
     * @param res
     * @returns {Promise<void>}
     **************************************************************/
    async getAllEventToTag(req, res) {
        const allEventToTags = await db.query(`select *
                                               from "event_to_tag"`)
        res.json(allEventToTags.rows)
    }

    /**************************************************************
     * Получение связи по event_id (события) и tag_id (тега)
     * @param req
     * @param res
     * @returns {Promise<void>}
     **************************************************************/
    async getIdEventToIdTag(req, res) {
        const {event_id, tag_id} = req.body
        const eventToTag = await db.query(`select *
                                           from "event_to_tag"
                                           where event_id = $1
                                             and tag_id = $2`, [event_id, tag_id])
        res.json(eventToTag.rows)
    }

    /**************************************************************
     * Получение всех tag_id (тега) по event_id (события)
     * @param req
     * @param res
     * @returns {Promise<void>}
     **************************************************************/
    async getTagIdByEventId(req, res) {
        const event_id = req.params.id
        const eventToTag = await db.query(`select tag_id
                                           from "event_to_tag"
                                           where event_id = $1;`, [event_id])
        res.json(eventToTag.rows)
    }

    /**************************************************************
     * Получение всех тегов по event_id (события)
     * @param req
     * @param res
     * @returns {Promise<void>}
     **************************************************************/
    async getTagsByEventId(req, res) {
        const event_id = req.params.id
        const eventToTag = await db.query(`select t.* from tag as t
                                           inner join event_to_tag as et
                                           on t.id = et.tag_id
                                           where et.event_id = $1`, [event_id])
        res.json(eventToTag.rows)
    }

    /**************************************************************
     * Получение всех событий по tag_id (тега)
     * @param req
     * @param res
     * @returns {Promise<void>}
     **************************************************************/
    async getEventByTagId(req, res) {
        const tag_id = req.params.id
        const event = await db.query(`select e.* from event as e 
    inner join event_to_tag as et on et.event_id = e.id 
    where et.tag_id = $1;`, [tag_id])
        res.json(event.rows)
    }

    /**************************************************************
     * Удаление связи по event_id и tag_id
     * @param req
     * @param res
     * @returns {Promise<void>}
     **************************************************************/
    async deleteEventToTagByBothIds(req, res) {
        const {event_id, tag_id} = req.body
        const eventToTag = await db.query(`delete
                                           from "event_to_tag"
                                           where event_id = $1
                                           and tag_id = $2`, [event_id, tag_id])
        res.json(eventToTag.rows[0])
    }

    /**************************************************************
     * Удаление связей события по event_id
     * @param req
     * @param res
     * @returns {Promise<void>}
     **************************************************************/
    async deleteEventToTagByEventId(req, res) {
        const event_id = req.params.id
        const eventToTag = await db.query(`delete
                                           from "event_to_tag"
                                           where event_id = $1`, [event_id])
        res.json(eventToTag.rows[0])
    }
}

module.exports = new eventToTagController()