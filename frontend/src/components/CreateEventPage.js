import React, {useState} from 'react'
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
import {addEvent} from "../http/eventAPI"
import {addUserToEvent} from "../http/user_to_eventAPI"
import {addEventToTag} from "../http/event_to_tagAPI"


const CreateEventPage = (props) => {
    /* const onChange = (e) => {
        const { name, value } = e.currentTarget;} */
    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()
    const currentMonth = currentDate.getMonth()+1
    const currentDay = currentDate.getDate()
    const defaultDate = `${currentYear}-${
        (currentMonth > 9) ? `${currentMonth}`:`0${currentMonth}`}-${
        (currentDay > 9) ? `${currentDay}`:`0${currentDay}`}`

    const [nameFormStatus, setNameFormStatus] = useState(false)
    const [textFormStatus, setTextFormStatus] = useState(false)
    const [placeFormStatus, setPlaceFormStatus] = useState(false)
    const [tagsFormStatus, setTagsFormStatus] = useState(false)
    const nameWordLimit = 50
    const textWordLimit = 100

    const [selectedTagIds, setSelectedTagIds] = useState([])
    const [selectedPic, setSelPic] = useState(props.pics[0].id)
    // const [borderColor, setBorderColor] = useState("#ff5c5c") //selectedTagIds ? "#969a9f":"#ff5c5c"
    
    /* useEffect(async () => {
        async function fetchData() {
            setBorderColor((selectedTagIds.length > 0) ? "#969a9f":"#ff5c5c")
        }
        await fetchData()
    }, []) */


    return (
        <Panel>
            <PanelHeader before={<PanelHeaderBack onClick={() => props.setActiveStory(ROUTES.ACTIVE_EVENTS)}
                         data-to={ROUTES.ACTIVE_EVENTS}/>}>
                Создание события
            </PanelHeader>

            <FormLayout>
                <FormItem top="Название" status={nameFormStatus ? "default":"error"}
                          bottom={
                            nameFormStatus ? '' : `Задайте название не более ${nameWordLimit} слов`
                          }
                          onChange={(e) => {
                            const textLength = e.target.value.length
                            if (textLength > nameWordLimit || textLength === 0) {
                                setNameFormStatus(false)
                            }
                            else {
                                setNameFormStatus(true)
                            }
                        }}
                >
                    <Input id="event_name" type="text" placeholder="Введите название"/>
                </FormItem>

                <FormItem top="Описание">
                    <Textarea id="event_text" type="text" rows={2} status={textFormStatus ? "default":"error"}
                                onChange={(e) => {
                                    const textLength = e.target.value.length
                                    if (textLength > textWordLimit || textLength === 0) {
                                        setTextFormStatus(false)
                                    }
                                    else {
                                        setTextFormStatus(true)
                                    }
                                }}/>
                    <div style={{color:"#ff5c5c"}}>
                        <Spacing size={10}/>
                        <Footnote>{textFormStatus ? "":`Задайте текст не больше ${textWordLimit} слов`}</Footnote>
                    </div>
                </FormItem>

                <FormItem top="Место" status={placeFormStatus ? "default":"error"}
                          bottom={
                            placeFormStatus ? '' : `Задайте текст не более ${textWordLimit} слов`
                          }
                          onChange={(e) => {
                            const textLength = e.target.value.length
                            if (textLength > textWordLimit || textLength === 0) {
                                setPlaceFormStatus(false)
                            }
                            else {
                                setPlaceFormStatus(true)
                            }
                        }}
                >
                    <Input id="event_place" type="text" placeholder="Введите адрес"/>
                </FormItem>

                <FormItem top="Дата">
                    <Input type="date" id="event_date" name="appt"
                            defaultValue={defaultDate}
                            min={defaultDate}
                            max={`${currentYear+1}-12-31`}
                            required></Input>
                </FormItem>
                
                <FormItem top="Время">
                    <Input type="time" id="event_time" name="appt"
                            defaultValue="10:00"
                            required>
                    </Input>
                </FormItem>
                
                <FormItem top="Теги" className='tagButtons'
                          status={tagsFormStatus ? "default":"error"}
                    >
                    <div style={{border: 'solid', borderColor: tagsFormStatus ? "#969a9f":"#ff5c5c",
                                borderWidth: '1px', borderRadius: '20px',
                                paddingBottom: '5%'}}
                                onClick={() => {
                                    setTagsFormStatus(selectedTagIds.length > 0)
                                  }}>
                        <TagButtonsList className="TagButtonsList"
                                        tags={props.tags}
                                        selectedTagIds = {selectedTagIds}
                                        setSelectedTagIds = {setSelectedTagIds}
                                        />
                    </div>
                    <div style={{color:"#ff5c5c"}}>
                        <Spacing size={10}/>
                        <Footnote>{(selectedTagIds.length > 0) ? "":"Выберите теги"}</Footnote>
                    </div>
                </FormItem>

                <FormItem top="Ссылка на чат">
                    <Input id="chat_link" type="text" placeholder="Вставьте ссылку"/>
                </FormItem>

                <HorizontalScroll>
                <div style={{display: 'flex'}}>
                    <PictureItems pics={props.pics}
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
                        const event = await addEvent(name, text, place, date,
                        time, chat_link, selectedPic)

                        await addUserToEvent(props.fetchedUser.id, event.id, true)
                        await Promise.all(selectedTagIds.map((tag_id) => addEventToTag(event.id, tag_id)));

                        props.setActiveStory(ROUTES.ACTIVE_EVENTS)
                        } }
                        >
                Создать событие
            </Button>
            <Spacing size={10}/>
            
        </Panel>
    )
};

export default CreateEventPage;