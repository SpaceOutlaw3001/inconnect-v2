import host from "./index";

/**************************************************************
 * Создание новой связи между user_id (пользователя) и event_id (события)
 **************************************************************/
export const addUserToEvent = async (uid, eid, can_modify) => {
    const {data} = await host.post(`api/userEvent`, {"user_id": uid, "event_id": eid, "can_modify": can_modify})
    return data
}


/**************************************************************
 * Получение всех связей
 **************************************************************/
// TODO: не используется
export const getUserToEvents = async () => {
    const {data} = await host.get(`api/userEvent`)
    return data
}

/**************************************************************
 * Получение всех связей пользователя по user_id
 **************************************************************/
// TODO: не используется
export const getEventToIdUser = async (user_id) => {
    const {data} = await host.get(`api/userEvent/userId/${user_id}`)
    return data
}
/**************************************************************
 * Получение событий-подписок пользователя по user_id
 **************************************************************/
export const getEventSubsByUserId = async (user_id) => {
    const {data} = await host.get(`api/userEvent/subscriptions/${user_id}`)
    return data
}
/**************************************************************
 * Получение созданных пользователем событий по user_id
 **************************************************************/
export const getCreatedEventsByUserId = async (user_id) => {
    const {data} = await host.get(`api/userEvent/createdEvents/${user_id}`)
    return data
}

/**************************************************************
 * Получение связи по user_id (пользователя) и event_id (события)
 **************************************************************/
export const getIdUserToIdEvent = async (uid, eid) => {
    const {data} = await host.post(`api/userEvent/IdId`,{"user_id": uid, "event_id": eid})
    return data
}

/**************************************************************
 * Получение списка активных событий по user_id (пользователя)
 **************************************************************/
// TODO: не используется
export const getEventsByUserId = async (user_id) => {
    const {data} = await host.get(`api/userEvent/eventByUser/${user_id}`)
    return data
}

/**************************************************************
 * Получение списка неактивных событий по user_id (пользователя)
 **************************************************************/
export const getNotActiveEventsByUserId = async (user_id) => {
    const {data} = await host.get(`api/userEvent/notActiveEventByUser/${user_id}`)
    return data
}

/**************************************************************
 * Получение списка рекомендованных событий по user_id (пользователя)
 **************************************************************/
export const getRecEventsByUserId = async (user_id) => {
    const {data} = await host.get(`api/userEvent/recEventByUser/${user_id}`)
    return data
}

/**************************************************************
 * Удаление связи по event_id
 **************************************************************/
export const deleteUserToEventByEventId = async (event_id) => {
    const {data} = await host.delete(`api/userEvent/delAllByEventId/${event_id}`)
    return data
}

/**************************************************************
 * Удаление связи по user_id и event_id
 **************************************************************/
export const deleteUserToEventByBothIds = async (user_id, event_id) => {
    const {data} = await host.put(`api/userEvent/delByBothIds`,
            {user_id, event_id})
    return data
}