import host from "./index";

/**************************************************************
 * Создание новой связи между event_id (событием} и tag_id (тегом)
 **************************************************************/
export const addEventToTag = async (eid, tid) => {
    const {data} = await host.post(`api/eventTag`, {"event_id": eid, "tag_id": tid})
    return data
}

/**************************************************************
 * Получение всех связей
 **************************************************************/
export const getAllEventToTag = async () => {
    const {data} = await host.get(`api/eventTag`)
    return data
}

/**************************************************************
 * Получение связи по event_id (события) и tag_id (тега)
 **************************************************************/
// TODO: не используется
export const getEventToTagByBothIds = async (eid, tid) => {
    const {data} = await host.get(`api/eventTag/IdId`, {params: {"event_id": eid, "tag_id": tid}})
    return data
}

/**************************************************************
 * Получение tag_id (тега) по event_id (события)
 **************************************************************/
export const getTagIdByEventId = async (eid) => {
    const {data} = await host.get(`api/eventTag/tagIdByEvent/${eid}`)
    return data.map(item => (item.tag_id))
}

/**************************************************************
 * Получение tag_id (тега) по event_id (события)
 **************************************************************/
export const getTagsByEventId = async (eid) => {
    const {data} = await host.get(`api/eventTag/tagsByEvent/${eid}`)
    return data
}

/**************************************************************
 * Получение всех событий по tag_id (тега)
 **************************************************************/
// TODO: не используется
export const getEventByTagId = async (tid) => {
    const {data} = await host.get(`api/eventTag/eventByTag/${tid}`)
    return data
}

/**************************************************************
 * Удаление связи по event_id
 **************************************************************/
export const deleteEventToTagByEventId = async (event_id) => {
    const {data} = await host.delete(`api/eventTag/delAllByEventId/${event_id}`)
    return data
}