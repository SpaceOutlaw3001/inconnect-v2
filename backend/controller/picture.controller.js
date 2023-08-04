const db = require('../db')

class pictureController {

    /**************************************************************
     * Создание новой картинки
     * @param req
     * @param res
     * @returns {Promise<void>}
     **************************************************************/
    async addPicture(req, res) {
        const {tag_id, url} = req.body
        const newPic = await db.query(`insert into "picture" (tag_id, url) values ($1, $2) returning * `, [tag_id, url])
        res.json(newPic.rows[0])
    }

    /**************************************************************
     * Получение всех картинок
     * @param req
     * @param res
     * @returns {Promise<void>}
     **************************************************************/
    async getAllPictures(req, res) {
        const allPics = await db.query(`select * from "picture"`)
        res.json(allPics.rows)
    }

    /**************************************************************
     * Получение картинки по id
     * @param req
     * @param res
     * @returns {Promise<void>}
     **************************************************************/
    async getPictureById(req, res) {
        const id = req.params.id
        const pic = await db.query(`select * from "picture" where id = $1`, [id])
        res.json(pic.rows)
    }

    /**************************************************************
     * Получение картинок по id тега (tag_id)
     * @param req
     * @param res
     * @returns {Promise<void>}
     **************************************************************/
    async getPictureByTagId(req, res) {
        const tag_id = req.params.tag_id
        const pic = await db.query(`select * from "picture" where tag_id = $1`, [tag_id])
        res.json(pic.rows)
    }

    /**************************************************************
     * Обновление данных картинки по id
     * @param req
     * @param res
     * @returns {Promise<void>}
     **************************************************************/
    async updatePictureById(req, res) {
        const id = req.params.id
        const {tag_id, url} = req.body
        const pic = await db.query(`update "picture" set tag_id = $1, url = $2 where id = $3 returning *`, [tag_id, url, id])
        res.json(pic.rows[0])
    }


    /**************************************************************
     * Удаление картинки по id
     * @param req
     * @param res
     * @returns {Promise<void>}
     **************************************************************/
    async deletePictureById(req, res) {
        const id = req.params.id
        const pic = await db.query(`delete from "picture" where id = $1`, [id])
        res.json(pic.rows[0])
    }
}

module.exports = new pictureController()