import React, {useEffect, useState} from 'react';
import {
    Button,
    ContentCard,
    Group,
    Panel,
    PanelHeader,
    PanelHeaderBack,
    SimpleCell,
    Snackbar,
    Spacing
} from '@vkontakte/vkui';

import Icon28Place_outline from '@vkontakte/icons/dist/28/place_outline';
import Icon28Сalendar_outline from '@vkontakte/icons/dist/28/calendar_outline';
import Icon28Recent_outline from '@vkontakte/icons/dist/28/recent_outline';
import Icon28Message_outline from '@vkontakte/icons/dist/28/message_outline';
import {Icon28CheckCircleOutline} from "@vkontakte/icons";

import {addUserToEvent, deleteUserToEventByBothIds, getIdUserToIdEvent} from "../http/user_to_eventAPI";
import {getTagsByEventId} from "../http/event_to_tagAPI"
import {ROUTES} from '../routes';
import img_not_found from "../img/img_not_found.jpg"

const TagButtons = (props) => {
    return props.tags.map((tag) => (
        <Button key={tag.id} mode="outline">
            {tag.title_ru}
        </Button>
    ))
}

const EventPage = (props) => {
    const [addText, setAddText] = useState(false);
    const buttonText = addText ? 'Отписаться' : 'Подписаться';
    const [snackbar, setSnackbar] = useState(null);
    const [canModify, setCanModify] = useState(false)

    const [tags, setTags] = useState([])

    useEffect(async () => {
        async function fetchData() {
            const idUserEvent = await getIdUserToIdEvent(props.fetchedUser.id, props.event.id)
            if (idUserEvent) {
                setAddText(true)//проверка на пустоту
            }
            setCanModify(idUserEvent?.can_modify)
            setTags(await getTagsByEventId(props.event.id))
        }

        await fetchData();
    }, []);

    return (
        <Panel>
            <PanelHeader
                before={<PanelHeaderBack onClick={() => props.setActiveStory(props.previousPage)}
                                         data-to={props.previousPage}/>}
            >
                {props.event.name}
            </PanelHeader>

            <div className="event_img">
                <img src={props.event.url ? props.event.url : img_not_found}
                     style={{maxHeight: '40%', maxWidth: '100%'}}/>
            </div>
            <ContentCard
                header={props.event.name}
                caption={props.event.text}
            />

            <div style={{display: 'block'}}>
                <Group>
                    <SimpleCell subtitle={props.event.place} before={<Icon28Place_outline/>}>
                        Место
                    </SimpleCell>

                    <SimpleCell subtitle={new Date(props.event.date).toLocaleString('rus', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                    })}
                                before={<Icon28Сalendar_outline/>}>
                        Дата
                    </SimpleCell>

                    <SimpleCell subtitle={props.event.time.slice(0, -3)} before={<Icon28Recent_outline/>}>
                        Время
                    </SimpleCell>

                    {props.event.chat_link &&
                        <SimpleCell subtitle={props.event.chat_link} before={<Icon28Message_outline/>}>
                            Чат
                        </SimpleCell>
                    }
                    <div className='tagButtons'>
                        <TagButtons tags={tags}/>
                    </div>


                </Group>

                <Spacing size={30}/>

            </div>

            {!canModify && (<div className="post__btns">
                <Button stretched size="m" mode="secondary"
                        onClick={async () => {
                            if (addText === true) {
                                setAddText(false);
                                await deleteUserToEventByBothIds(props.fetchedUser.id, props.event.id)
                            } else {
                                setAddText(true);
                                await addUserToEvent(props.fetchedUser.id, props.event.id, false);//добавляем связь

                                if (snackbar) return;
                                setSnackbar(
                                    <Snackbar
                                        onClose={() => setSnackbar(null)}
                                        before={<Icon28CheckCircleOutline fill="var(--vkui--color_icon_positive)"/>}
                                    >
                                        Вы подписались на события
                                    </Snackbar>,
                                );
                            }
                        }
                        }
                >
                    {buttonText}
                </Button>
            </div>)}

            {canModify && (
                <Group>
                    <Button mode="secondary" stretched
                            onClick={() => props.setActiveStory(ROUTES.EDIT_EVENT)}
                    >
                        Редактировать
                    </Button>

                    <Spacing size={4}/>

                    <Button mode="primary" appearance="negative" stretched
                            onClick={() => {
                                props.openDeletion(props.event.id)
                            }}
                    >
                        Удалить
                    </Button>

                </Group>


            )}
            {snackbar}
        </Panel>
    );
}

export default EventPage;