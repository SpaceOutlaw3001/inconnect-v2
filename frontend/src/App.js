import React, {useEffect, useState} from 'react';
import bridge from '@vkontakte/vk-bridge';
import {
	AdaptivityProvider,
	Alert,
	AppRoot,
	Button,
	ConfigProvider,
	Group,
	ModalPage,
	ModalPageHeader,
	ModalRoot,
	Panel,
	PanelHeaderClose,
	PanelHeaderSubmit,
	Spacing,
	SplitCol,
	SplitLayout,
	View
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import {ROUTES} from './routes'
import {NavigationBar} from './components/NavBar';
import TagButtonsList from './components/TagButtonsList';

import {deleteEventById} from './http/eventAPI';
import {deleteUserToEventByEventId, getNotActiveEventsByUserId} from './http/user_to_eventAPI';
import {addUser} from './http/userAPI';
import {getTags} from './http/tagAPI';
import {getTagsByUserId} from './http/user_to_tagAPI';
import {deleteEventToTagByEventId, getTagIdByEventId} from './http/event_to_tagAPI';
import {getAllPictures} from './http/pictureAPI';


const App = () => {
    const [activeStory, setActiveStory] = useState(ROUTES.REC_EVENTS);
    const [previousPage, setPreviousPage] = useState(ROUTES.REC_EVENTS);
    const [fetchedUser, setUser] = useState(null);
    const [popout, setPopout] = useState(null);//<ScreenSpinner size='large' />

    // События
    const [events, setEvents] = useState([]); // неактивные события (панель поиска)
    const [currentEvent, setCurrentEvent] = useState(null);
    // Теги
    const [tags, setTags] = useState([]);
    const [userTags, setUserTags] = useState([]);
    const [selectedTagIds, setSelectedTagIds] = useState([]);
    //
    const [pictures, setPictures] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const user = await bridge.send('VKWebAppGetUserInfo');
            setUser(user);
            setPopout(null);

            await addUser(user.id);
            setTags(await getTags());
            setEvents(await getNotActiveEventsByUserId(user.id));
            setUserTags(await getTagsByUserId(user.id));
            setPictures(await getAllPictures());
        };

        fetchData();
    }, []);

    const checkTags = (tagsIDs, eventTags) => {
        let res
        if (eventTags.length < tagsIDs.length) {
            res = false
        } else {
            res = tagsIDs.find(t => !eventTags.includes(t)) === null
        }
        return res
    }

    //---- Modals ----
    const [activeModal, setActiveModal] = useState(null);
    const [modalHistory, setModalHistory] = useState([]);

    const changeActiveModal = (activeModal) => {
        activeModal = activeModal || null;
        let localModalHistory = modalHistory ? [...modalHistory] : [];

        if (activeModal === null) {
            localModalHistory = [];
        } else if (modalHistory.indexOf(activeModal) !== -1) {
            localModalHistory = localModalHistory.splice(0, localModalHistory.indexOf(activeModal) + 1);
        } else {
            localModalHistory.push(activeModal);
        }

        setActiveModal(activeModal);
        setModalHistory(localModalHistory);
    };

    const modalBack = () => {
        changeActiveModal(modalHistory[modalHistory.length - 2]);
    };

    const modal = (
        <ModalRoot activeModal={activeModal} onClose={modalBack}>
            <ModalPage
                id={ROUTES.MODAL_PAGE_SEARCH}
                onClose={async () => {
                    modalBack()
                    setSelectedTagIds([])
                    setEvents(await getNotActiveEventsByUserId(fetchedUser?.id))
                }
                }
                header={
                    <ModalPageHeader
                        before={
                            /* sizeX.compact && (
                                <PanelHeaderClose className={sizeX.compact.className} onClick={modalBack} />
                            ) */
                            <PanelHeaderClose onClick={async () => {
                                modalBack()
                                setSelectedTagIds([])
                                setEvents(await getNotActiveEventsByUserId(fetchedUser?.id))
                            }}/>

                        }
                        after={<PanelHeaderSubmit onClick={async () => {
                            modalBack()
                        }}/>}
                    >
                        Выбор тегов
                    </ModalPageHeader>
                }
            >
                <Group className='tagButtons'>
                    <TagButtonsList tags={tags}
                                    selectedTagIds={selectedTagIds}
                                    setSelectedTagIds={setSelectedTagIds}
                    />
                    <Spacing size={50}/>
                </Group>
                <Button stretched
                        onClick={async () => {
                            if (!fetchedUser) {
                                console.log('fetched user null')
                            } else if (selectedTagIds.length) {
                                console.log("tags selected")
                                // setEvents(await getEventsSearchedByTags(selectedTagIds, fetchedUser?.id))
                                const eventsList = []
                                const allEvents = await getNotActiveEventsByUserId(fetchedUser.id)
                                for (const event in allEvents) {
                                    if(event?.id) {
                                        const eventTags = await getTagIdByEventId(event.id)
                                        if (checkTags(selectedTagIds, eventTags)) {
                                            eventsList.push(event)
                                            console.log(`included ${event.name}`)
                                        }
                                    } else {
                                        console.warn(`event null ${JSON.stringify(event)}`)
                                    }
                                }
                                setEvents(eventsList)
                            } else {
                                console.log("no tags selected")
                                setEvents(await getNotActiveEventsByUserId(fetchedUser.id))
                            }
                        }}>
                    Подтвердить выбор
                </Button>
                <Spacing size={10}/>
            </ModalPage>

        </ModalRoot>
    )

    const closePopout = () => {
        setPopout(null);
    };
    const openDeletion = (event_id) => {
        setPopout(
            <Alert
                actions={[
                    {
                        title: 'Отмена',
                        autoClose: true,
                        mode: 'cancel',
                    },
                    {
                        title: 'Удалить',
                        autoClose: true,
                        mode: 'destructive',
                        action: async () => {
                            await Promise.all(
                                [
                                    deleteEventToTagByEventId(event_id),
                                    deleteUserToEventByEventId(event_id),
                                    deleteEventById(event_id)
                                ]
                            )
                            setActiveStory(ROUTES.ACTIVE_EVENTS)
                        },
                    },
                ]}
                actionsLayout="horizontal"
                onClose={closePopout}
                header="Удаление события"
                text="Вы уверены, что хотите удалить это событие?"
            />,
        );
    };

    return (
        <ConfigProvider>
            <AdaptivityProvider>
                <AppRoot>

                    <SplitLayout modal={modal} popout={popout}>
                        <SplitCol>
                            <View activePanel="modals">
                                <Panel id="modals">
                                    <NavigationBar activeStory={activeStory} setActiveStory={setActiveStory}
                                                   fetchedUser={fetchedUser} changeActiveModal={changeActiveModal}
                                                   events={events}
                                                   tags={tags} userTags={userTags}
                                                   SetUserTags={setUserTags}
                                                   previousPage={previousPage} setPreviousPage={setPreviousPage}
                                                   currentEvent={currentEvent} setCurrentEvent={setCurrentEvent}
                                                   openDeletion={openDeletion}
                                                   pictures={pictures}
                                    />
                                </Panel>
                            </View>
                        </SplitCol>
                    </SplitLayout>

                </AppRoot>
            </AdaptivityProvider>
        </ConfigProvider>
    );

}

export default App;
