const db = require('../db')

class userToTagController {

    /**************************************************************
     * Создание новой связи между user_id (пользоватля) и tag_id (тега)
     * @param req
     * @param res
     * @returns {Promise<void>}
     **************************************************************/
    async addUserToTag(req, res) {
        const {user_id, tag_id} = req.body
        const newUTE = await db.query(`insert into "user_to_tag" (user_id, tag_id) 
                                        values ($1, $2) 
                                        on conflict do nothing 
                                        returning * `, [user_id, tag_id])
        /* const newUTE = await db.query(`insert into "user_to_tag" (user_id, tag_id)
                                        select $1, $2
                                        where
                                        not exists (
                                            select id from "user_to_tag" 
                                            where user_id = $1 and tag_id = $2
                                        )
                                        returning * `, [user_id, tag_id]) */
        res.json(newUTE.rows[0])
    }

    /**************************************************************
     * Получение всех связей
     * @param req
     * @param res
     * @returns {Promise<void>}
     **************************************************************/
    async getAllUserToTag(req, res) {
        const allUserToTags = await db.query(`select * from "user_to_tag"`)
        res.json(allUserToTags.rows)
    }

    /**************************************************************
     * Получение всех связей пользователя по user_id
     * @param req
     * @param res
     * @returns {Promise<void>}
     **************************************************************/
    async getTagToIdUser(req, res) {
        const user_id = req.params.user_id
        const userToTag = await db.query(`select * from "user_to_tag" where user_id = $1`, [user_id])
        res.json(userToTag.rows)
    }

    /**************************************************************
     * Получение связи по user_id (пользователя) и tag_id (тега)
     * @param req
     * @param res
     * @returns {Promise<void>}
     **************************************************************/
    async getIdUserToIdTag(req, res) {
        const {user_id, tag_id} = req.body
        const userToTag = await db.query(`select * from "user_to_tag" where user_id = $1 and tag_id = $2`, [user_id, tag_id])
        res.json(userToTag.rows[0])
    }

    /**************************************************************
     * Получение тегов по user_id (пользователя)
     * @param req
     * @param res
     * @returns {Promise<void>}
     **************************************************************/
    async getTagsByUserId(req, res) {
        const user_id = req.params.id
        const userToTag = await db.query(`select t.* from tag as t
                                          inner join user_to_tag as ut on t.id = ut.tag_id
                                          where ut.user_id = $1`, [user_id])
        res.json(userToTag.rows)
    }

    /**************************************************************
     * Удаление связи по user_id и tag_id
     * @param req
     * @param res
     * @returns {Promise<void>}
     **************************************************************/
    async deleteUserToTagByBothIds(req, res) {
        const {user_id, tag_id} = req.body
        const userToTag = await db.query(`delete from "user_to_tag" 
                                          where user_id = $1 and tag_id = $2`,
            [user_id, tag_id])
        res.json(userToTag.rows[0])
    }
}

module.exports = new userToTagController()