import React, {useEffect, useState} from 'react';
import { QRCodeSVG } from 'qrcode.react';
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
import Icon28Calendar_outline from '@vkontakte/icons/dist/28/calendar_outline';
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

const EventPage = ({event, fetchedUser, openDeletion, previousPage, setActiveStory}) => {
    const [addText, setAddText] = useState(false);
    const buttonText = addText ? 'Отписаться' : 'Подписаться';
    const [snackbar, setSnackbar] = useState(null);
    const [canModify, setCanModify] = useState(false)

    const [tags, setTags] = useState([])

    useEffect(async () => {
        async function fetchData() {
            const idUserEvent = await getIdUserToIdEvent(fetchedUser.id, event.id)
            if (idUserEvent) {
                setAddText(true)//проверка на пустоту
            }
            setCanModify(idUserEvent?.can_modify)
            setTags(await getTagsByEventId(event.id))
        }

        await fetchData();
    }, []);

    return (
        <Panel>
            <PanelHeader
                before={<PanelHeaderBack onClick={() => setActiveStory(previousPage)}
                                         data-to={previousPage}/>}
            >
                {event.name}
            </PanelHeader>

            <div className="event_img">
                <img src={event.url ? event.url : img_not_found}
                     style={{maxHeight: '40%', maxWidth: '100%'}}/>
            </div>
            <ContentCard
                header={event.name}
                caption={event.text}
            />

            <div style={{display: 'block'}}>
                <Group>
                    <SimpleCell subtitle={event.place} before={<Icon28Place_outline/>}>
                        Место
                    </SimpleCell>

                    <SimpleCell subtitle={new Date(event.date).toLocaleString('rus', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                    })}
                                before={<Icon28Calendar_outline/>}>
                        Дата
                    </SimpleCell>

                    <SimpleCell subtitle={event.time.slice(0, -3)} before={<Icon28Recent_outline/>}>
                        Время
                    </SimpleCell>

                    {event.chat_link &&
                        <SimpleCell subtitle={event.chat_link} before={<Icon28Message_outline/>}>
                            Чат
                        </SimpleCell>
                    }
                    <div className='tagButtons'>
                        <TagButtons tags={tags}/>
                    </div>

                    {props.event.chat_link &&
                        <div style={{ textAlign: 'center', marginTop: '20px' }}>
                        <h3>QR-код чата</h3>
                        <QRCodeSVG 
                            value={props.event.chat_link.toString()}
                            size={256}
                            bgColor="#ffffff"
                            fgColor="#000000"
                            level="H"
                            includeMargin={true}
                        />
                    </div>
                    }

                </Group>

                <Spacing size={30}/>

            </div>

            {!canModify && (<div className="post__btns">
                <Button stretched size="m" mode="secondary"
                        onClick={async () => {
                            if (addText === true) {
                                setAddText(false);
                                await deleteUserToEventByBothIds(fetchedUser.id, event.id)
                            } else {
                                setAddText(true);
                                await addUserToEvent(fetchedUser.id, event.id, false);//добавляем связь

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
                            onClick={() => setActiveStory(ROUTES.EDIT_EVENT)}
                    >
                        Редактировать
                    </Button>

                    <Spacing size={4}/>

                    <Button mode="primary" appearance="negative" stretched
                            onClick={() => {
                                openDeletion(event.id)
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