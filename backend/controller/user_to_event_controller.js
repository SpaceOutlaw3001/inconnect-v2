const db = require('../db')

class userToEventController {

    /**************************************************************
     * Создание новой связи между user_id (пользователя) и event_id (события)
     * @param req
     * @param res
     * @returns {Promise<void>}
     **************************************************************/
    async addUserToEvent(req, res) {
        const {user_id, event_id, can_modify} = req.body
        const newUTE = await db.query(`insert into "user_to_event" (user_id, event_id, can_modify) 
                                        values ($1, $2, $3) 
                                        on conflict do nothing 
                                        returning * `, [user_id, event_id, can_modify])
        res.json(newUTE.rows[0])
    }

    /**************************************************************
     * Получение всех связей
     * @param req
     * @param res
     * @returns {Promise<void>}
     **************************************************************/
    async getAllUserToEvent(req, res) {
        const allUserToEvents = await db.query(`select * from "user_to_event"`)
        res.json(allUserToEvents.rows)
    }

    /**************************************************************
     * Получение всех связей пользователя по user_id
     * @param req
     * @param res
     * @returns {Promise<void>}
     **************************************************************/
    async getEventToIdUser(req, res) {
        const user_id = req.params.user_id
        const userToEvent = await db.query(`select * from "user_to_event" where user_id = $1`, [user_id])
        res.json(userToEvent.rows)
    }

    /**************************************************************
     * Получение событий-подписок пользователя по user_id
     * @param req
     * @param res
     * @returns {Promise<void>}
     **************************************************************/
    async getEventSubsByUserId(req, res) {
        const user_id = req.params.user_id
        const userToEvent = await db.query(`select e.*, p.url from event as e 
                                            inner join user_to_event as ue on e.id = ue.event_id
                                            inner join picture as p on p.id = e.picture_id
                                            where ue.user_id = $1 and ue.can_modify = false`, [user_id])
        res.json(userToEvent.rows)
    }

    /**************************************************************
     * Получение созданных пользователем событий по user_id
     * @param req
     * @param res
     * @returns {Promise<void>}
     **************************************************************/
    async getCreatedEventsByUserId(req, res) {
        const user_id = req.params.user_id
        const userToEvent = await db.query(`select e.*, p.url from event as e 
                                            inner join user_to_event as ue on e.id = ue.event_id 
                                            inner join picture as p on p.id = e.picture_id
                                            where ue.user_id = $1 and ue.can_modify = true`, [user_id])
        res.json(userToEvent.rows)
    }


    /**************************************************************
     * Получение связи по user_id (пользователя) и event_id (события)
     * @param req
     * @param res
     * @returns {Promise<void>}
     **************************************************************/
    async getIdUserToIdEvent(req, res) {
        const {user_id, event_id} = req.body
        const userToEvent = await db.query(`select * from "user_to_event" 
                                            where user_id = $1 and event_id = $2`,
            [user_id, event_id])
        res.json(userToEvent.rows[0])
    }

    /**************************************************************
     * Получение списка активных событий по user_id (пользователя)
     * @param req
     * @param res
     * @returns {Promise<void>}
     **************************************************************/
    async getEventsByUserId(req, res) {
        const user_id = req.params.user_id
        const events = await db.query(`select e.*, p.url from event as e 
                                        inner join user_to_event as ue on e.id = ue.event_id 
                                        inner join picture as p on p.id = e.picture_id
                                        where ue.user_id = $1`, [user_id])
        res.json(events.rows)
    }

    /**************************************************************
     * Получение списка неактивных событий по user_id (пользователя)
     * @param req
     * @param res
     * @returns {Promise<void>}
     **************************************************************/
    async getNotActiveEventsByUserId(req, res) {
        const user_id = req.params.user_id
        const events = await db.query(`select e.*, p.url from event as e 
                                        left join (select * from user_to_event
                                                    where user_id = $1)
                                        as ue on e.id = ue.event_id
                                        inner join picture as p on p.id = e.picture_id
                                        where ue.event_id is null`, [user_id])
        /* const events = await db.query(`select distinct e.* from event as e 
                                        left join user_to_event 
                                        as ue on e.id = ue.event_id 
                                        where ue.user_id != $1`, [user_id]) */
        res.json(events.rows)
    }

    /**************************************************************
     * Получение списка неактивных событий по user_id (пользователя)
     * с тегами пользователя (получение рекомендаций)
     * @param req
     * @param res
     * @returns {Promise<void>}
     **************************************************************/
    async getRecEventsByUserId(req, res) {
        const user_id = req.params.user_id
        const events = await db.query(`select distinct e.*, p.url from event as e 
                                        left join (select * from user_to_event
                                                    where user_id = $1)
                                        as ue on e.id = ue.event_id
                                        inner join event_to_tag as et on et.event_id = e.id
                                        inner join user_to_tag as ut on ut.tag_id = et.tag_id
                                        inner join picture as p on p.id = e.picture_id
                                        where ue.event_id is null and ut.user_id = $1`,
            [user_id])
        res.json(events.rows)
    }

    /**************************************************************
     * Обновление данных связи по id
     * @param req
     * @param res
     * @returns {Promise<void>}
     **************************************************************/
    async updateUserToEventById(req, res) {
        const id = req.params.id
        const {user_id, event_id, can_modify} = req.body
        const userToEvent = await db.query(`update "user_to_event"
                                            set user_id = $1, event_id = $2, can_modify = $3
                                            where id = $4
                                            returning *`, [user_id, event_id, can_modify, id])
        res.json(userToEvent.rows[0])
    }

    /**************************************************************
     * Удаление связей события по event_id
     * @param req
     * @param res
     * @returns {Promise<void>}
     **************************************************************/
    async deleteUserToEventByEventId(req, res) {
        const event_id = req.params.id
        const userToEvent = await db.query(`delete from "user_to_event" 
                                            where event_id = $1`, [event_id])
        res.json(userToEvent.rows[0])
    }

    /**************************************************************
     * Удаление связи по user_id и event_id
     * @param req
     * @param res
     * @returns {Promise<void>}
     **************************************************************/
    async deleteUserToEventByBothIds(req, res) {
        const {user_id, event_id} = req.body
        const userToEvent = await db.query(`delete from "user_to_event"
                                            where user_id = $1 and
                                            event_id = $2`, [user_id, event_id])
        res.json(userToEvent.rows[0])
    }
}

module.exports = new userToEventController()