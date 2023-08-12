import React, {useEffect, useState} from 'react'
import {
    Button,
    Footnote,
    FormItem,
    FormLayout,
    HorizontalScroll,
    Input,
    Panel,
    PanelHeader,
    PanelHeaderBack,
    Spacing,
    Textarea
} from '@vkontakte/vkui'
import TagButtonsList from './TagButtonsList'
import PictureItems from './Pictures'
import {ROUTES} from '../routes'
import {putEventById} from "../http/eventAPI"
import {addEventToTag, deleteEventToTagByEventId, getTagIdByEventId} from "../http/event_to_tagAPI"

const EditEventPage = ({event, pics, setActiveStory, tags}) => {

    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()
    const currentMonth = currentDate.getMonth() + 1
    const currentDay = currentDate.getDate()
    const startDate = `${currentYear}-${
        (currentMonth > 9) ? `${currentMonth}` : `0${currentMonth}`}-${
        (currentDay > 9) ? `${currentDay}` : `0${currentDay}`}`

    const defaultDate = `${new Date(event.date).getFullYear()}-${
        (new Date(event.date).getMonth() + 1 > 9) ?
            `${new Date(event.date).getMonth() + 1}` : `0${new Date(event.date).getMonth() + 1}`}-${
        (new Date(event.date).getDate() > 9) ?
            `${new Date(event.date).getDate()}` : `0${new Date(event.date).getDate()}`}`

    const [nameFormStatus, setNameFormStatus] = useState(true)
    const [textFormStatus, setTextFormStatus] = useState(true)
    const [placeFormStatus, setPlaceFormStatus] = useState(true)
    const [tagsFormStatus, setTagsFormStatus] = useState(true)
    const nameWordLimit = 50
    const textWordLimit = 100

    const [selectedTagIds, setSelectedTagIds] = useState([])
    const [selectedPic, setSelPic] = useState(event.picture_id)

    useEffect(() => {
        async function fetchData() {
            setSelectedTagIds(await getTagIdByEventId(event.id))
        }

        fetchData()
    }, [])


    return (
        <Panel>
            <PanelHeader before={<PanelHeaderBack onClick={() => setActiveStory(ROUTES.EVENT_PAGE)}
                                                  data-to={ROUTES.ACTIVE_EVENTS}/>}>
                Редактирование события
            </PanelHeader>

            <FormLayout>
                <FormItem top="Название" status={nameFormStatus ? "default" : "error"}
                          bottom={
                              nameFormStatus ? '' : `Задайте название не более ${nameWordLimit} символов`
                          }
                          onChange={(e) => {
                              const textLength = e.target.value.length
                              if (textLength > nameWordLimit || textLength === 0) {
                                  setNameFormStatus(false)
                              } else {
                                  setNameFormStatus(true)
                              }
                          }}
                >
                    <Input id="event_name" type="text"
                           defaultValue={event.name}
                           placeholder="Введите название"/>
                </FormItem>

                <FormItem top="Описание">
                    <Textarea id="event_text" type="text" rows={2}
                              status={textFormStatus ? "default" : "error"}
                              defaultValue={event.text}
                              onChange={(e) => {
                                  const textLength = e.target.value.length
                                  if (textLength > textWordLimit || textLength === 0) {
                                      setTextFormStatus(false)
                                  } else {
                                      setTextFormStatus(true)
                                  }
                              }}/>
                    <div style={{color: "#ff5c5c"}}>
                        <Spacing size={10}/>
                        <Footnote>{textFormStatus ? "" : `Задайте текст не более ${textWordLimit} символов`}</Footnote>
                    </div>
                </FormItem>

                <FormItem top="Место" status={placeFormStatus ? "default" : "error"}
                          bottom={
                              placeFormStatus ? '' : `Задайте текст не более ${textWordLimit} символов`
                          }
                          onChange={(e) => {
                              const textLength = e.target.value.length
                              if (textLength > textWordLimit || textLength === 0) {
                                  setPlaceFormStatus(false)
                              } else {
                                  setPlaceFormStatus(true)
                              }
                          }}
                >
                    <Input id="event_place" type="text"
                           defaultValue={event.place}
                           placeholder="Введите адрес"/>
                </FormItem>

                <FormItem top="Дата">
                    <Input type="date" id="event_date" name="appt"
                           min={(defaultDate < startDate) ? defaultDate : startDate}
                           max={`${currentYear + 1}-12-31`}
                           defaultValue={defaultDate}
                           required></Input>
                </FormItem>

                <FormItem top="Время">
                    <Input type="time" id="event_time" name="appt"
                           defaultValue={event.time.slice(0, -3)}
                           required>
                    </Input>
                </FormItem>

                <FormItem top="Теги" className='tagButtons'
                          status={tagsFormStatus ? "default" : "error"}
                >
                    <div style={{
                        border: 'solid', borderColor: tagsFormStatus ? "#969a9f" : "#ff5c5c",
                        borderWidth: '1px', borderRadius: '20px',
                        paddingBottom: '5%'
                    }}
                         onClick={() => {
                             setTagsFormStatus(selectedTagIds.length > 0)
                         }}>
                        <TagButtonsList className="TagButtonsList"
                                        tags={tags}
                                        selectedTagIds={selectedTagIds}
                                        setSelectedTagIds={setSelectedTagIds}
                        />
                    </div>
                    <div style={{color: "#ff5c5c"}}>
                        <Spacing size={10}/>
                        <Footnote>{(selectedTagIds.length > 0) ? "" : "Выберите теги"}</Footnote>
                    </div>
                </FormItem>

                <FormItem top="Ссылка на чат">
                    <Input id="chat_link" type="text"
                           defaultValue={event.chat_link}
                           placeholder="Вставьте ссылку"/>
                </FormItem>

                <HorizontalScroll>
                    <div style={{display: 'flex'}}>
                        <PictureItems pics={pics}
                                      selected={selectedPic}
                                      setSelected={setSelPic}/>
                    </div>

                </HorizontalScroll>
            </FormLayout>


            <Button mode="secondary" disabled={!(nameFormStatus && placeFormStatus
                && textFormStatus && tagsFormStatus)}
                    onClick={async () => {
                        const name = document.getElementById("event_name").value
                        const text = document.getElementById("event_text").value
                        const place = document.getElementById("event_place").value
                        const date = document.getElementById("event_date").value
                        const time = document.getElementById("event_time").value
                        const chat_link = document.getElementById("chat_link").value

                        await putEventById(event.id, name, text, place, date,
                            time, chat_link, selectedPic)
                        await deleteEventToTagByEventId(event.id)
                        await Promise.all(selectedTagIds.map(
                            async (tag_id) => await addEventToTag(event.id, tag_id)))

                        setActiveStory(ROUTES.ACTIVE_EVENTS)
                    }}
            >
                Сохранить
            </Button>
            <Spacing size={10}/>

        </Panel>
    )
};

export default EditEventPage;