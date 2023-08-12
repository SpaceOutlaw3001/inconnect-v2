const db = require('../db')
const {validationResult} = require("express-validator");

class EventController {

    /**************************************************************
     * Создание нового события
     * @param req
     * @param res
     * @returns {Promise<void>}
     ************************************************************/
    async addEvent(req, res) {
        const {name, text, place, date, time, chat_link, picture_id} = req.body
        const newEvent = await db.query(`insert into event
                                             (name, text, place, date, time, chat_link, picture_id)
                                         values ($1, $2, $3, $4, $5, $6, $7)
                                         returning *`,
            [name, text, place, date, time, chat_link, picture_id])
        res.json(newEvent.rows[0])
    }

    /**************************************************************
     * Получение всех событий
     * @param req
     * @param res
     * @returns {Promise<void>}
     ************************************************************/
    async getAllEvents(req, res) {
        const allEvents = await db.query(`select *
                                          from event`)
        res.json(allEvents.rows)
    }

    /**************************************************************
     * Получение события по id
     * @param req
     * @param res
     * @returns {Promise<void>}
     ************************************************************/
    async getById(req, res) {
        const {id} = req.params;
        const event = await db.query(`select *
                                  from event
                                  where id = $1`, [id])
        res.json(event.rows[0])
    }

    /**************************************************************
     * Получение события по name (названия)
     * @param req
     * @param res
     * @returns {Promise<void>}
     ************************************************************/
    async getByName(req, res) {
        const name = req.params.name
        const event = await db.query(`select *
                                      from event
                                      where name = $1`, [name])
        res.json(event.rows[0])
    }


    /**************************************************************
     * Обновление данных события по id
     * @param req
     * @param res
     * @returns {Promise<void>}
     ************************************************************/
    async updateById(req, res) {
        const id = req.params.id
        const {name, text, place, date, time, chat_link, picture_id} = req.body
        const event = await db.query(`update event
                                      set name       = $1,
                                          text       = $2,
                                          place      = $3,
                                          date       = $4,
                                          time       = $5,
                                          chat_link  = $6,
                                          picture_id = $7
                                      where id = $8
                                      returning *`, [name, text, place, date, time, chat_link, picture_id, id])
        res.json(event.rows[0])
    }


    /**************************************************************
     * Удаление события по id
     * @param req
     * @param res
     * @returns {Promise<void>}
     **************************************************************/
    async deleteById(req, res) {
        const id = req.params.id
        const event = await db.query(`delete
                                      from event
                                      where id = $1`, [id])
        res.json(event.rows[0])
    }

}

module.exports = new EventController()