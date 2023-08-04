import host from "./index";

/**************************************************************
 * Получение всех картинок
 **************************************************************/
export const getAllPictures = async () => {
    const {data} = await host.get(`api/picture`)
    return data
}