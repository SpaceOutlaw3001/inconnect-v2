const db = require('../db')

class tagController {
    cache;

    /**************************************************************
     * Создание нового тега
     * @param req
     * @param res
     * @returns {Promise<void>}
     **************************************************************/
    async addTag(req, res) {
        const {name, title_ru} = req.body
        const newTag = await db.query(`insert into "tag" (name, title_ru)
                                       values ($1, $2)
                                       returning * `, [name, title_ru])
        res.json(newTag.rows[0])
    }

    /**************************************************************
     * Получение всех тегов
     * @param req
     * @param res
     * @returns {Promise<void>}
     **************************************************************/
    async getAllTag(req, res) {
        if(!this.cache) {
            this.cache = (await db.query(`select *
                                        from "tag"`)).rows
        }
        res.json(this.cache)

    }

    /**************************************************************
     * Получение тегов по id
     * @param req
     * @param res
     * @returns {Promise<void>}
     **************************************************************/
    async getIdTag(req, res) {
        const id = req.params.id
        const tag = await db.query(`select *
                                    from "tag"
                                    where id = $1`, [id])
        res.json(tag.rows)
    }

    /**************************************************************
     * Получение тегов по имени (name)
     * @param req
     * @param res
     * @returns {Promise<void>}
     **************************************************************/
    async getTagByName(req, res) {
        const name = req.params.name
        const tag = await db.query(`select *
                                    from "tag"
                                    where name = $1`, [name])
        res.json(tag.rows)
    }


    /**************************************************************
     * Обновление данных тега по id
     * @param req
     * @param res
     * @returns {Promise<void>}
     **************************************************************/
    async updateIdTag(req, res) {
        const id = req.params.id
        const {name, title_ru} = req.body
        const tag = await db.query(`update "tag"
                                    set name     = $1,
                                        title_ru = $2
                                    where id = $3
                                    returning *`, [name, title_ru, id])
        res.json(tag.rows[0])
    }


    /**************************************************************
     * Удаление тега по id
     * @param req
     * @param res
     * @returns {Promise<void>}
     **************************************************************/
    async deleteIdTag(req, res) {
        const id = req.params.id
        const tag = await db.query(`delete
                                    from "tag"
                                    where id = $1`, [id])
        res.json(tag.rows[0])
    }
}

module.exports = new tagController()