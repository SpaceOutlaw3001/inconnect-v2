import host from "./index";

/**************************************************************
 * Создание новой связи между user_id (пользователя) и tag_id (тега)
 **************************************************************/
export const addUserToTag = async (uid, tid) => {
    const {data} = await host.post(`api/userTag`, {"user_id": uid, "tag_id": tid})
    return data
}


/**************************************************************
 * Получение всех связей
 **************************************************************/
export const getUserToTags = async () => {
    const {data} = await host.get(`api/userTag`)
    return data
}


/**************************************************************
 * Получение всех связей пользователя по user_id
 **************************************************************/
export const getTagToIdUser = async (user_id) => {
    const {data} = await host.get(`api/userTag/userId/${user_id}`)
    return data
}

/**************************************************************
 * Получение связи по user_id (пользователя) и tag_id (тега)
 **************************************************************/
export const getIdUserToIdTag = async (uid, eid) => {
    const {data} = await host.post(`api/userTag/IdId`,{"user_id": uid, "tag_id": eid}) // post, get
    return data
}

/**************************************************************
 * Получение тегов по user_id (пользователя)
 **************************************************************/
export const getTagsByUserId = async (uid) => {
    const {data} = await host.get(`api/userTag/tagsByUser/${uid}`)
    return data
}


/**************************************************************
 * Удаление связи по user_id и tag_id
 **************************************************************/
export const deleteUserToTagByBothIds = async (uid, tid) => {
    const {data} = await host.put(`api/userTag/IdId`, {"user_id": uid, "tag_id": tid})
    return data
}