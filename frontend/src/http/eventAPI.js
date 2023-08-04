import host from "./index";

/**************************************************************
 * Создание нового события
 **************************************************************/
export const addEvent = async (name, text, place, date, 
                               time, chat_link, picture_id) => {
    const {data} = await host.post('api/event', 
    {"name": name, "text": text, "place": place, "date": date,
    "time": time, "chat_link": chat_link, "picture_id": picture_id})
    return data
}

/**************************************************************
 * Получение всех событий
 **************************************************************/
export const getEvents = async () => {
    const {data} = await host.get('api/event')
    return data
}

/**************************************************************
 * Получение события по id
 **************************************************************/
export const getEventById = async (id) => {
    const {data} = await host.get(`api/event/id/${id}`)
    return data
}


/**************************************************************
 * Обновление данных события по id
 **************************************************************/
export const putEventById = async (id, name, text, place, date, 
                                   time, chat_link, picture_id) => {
    const {data} = await host.put(`api/event/id/${id}`,
    {"name": name, "text": text, "place": place, "date": date,
    "time": time, "chat_link": chat_link, "picture_id": picture_id})
    return data
}


/**************************************************************
 * Удаление события по id
 **************************************************************/
export const deleteEventById = async (id) => {
    const {data} = await host.delete(`api/event/id/${id}`)
    return data
}