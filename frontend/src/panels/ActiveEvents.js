import React, {useEffect, useState} from 'react';

import {
    CardGrid,
    FixedLayout,
    Footnote,
    Group,
    IconButton,
    Panel,
    PanelHeader,
    Separator,
    Spacing,
    Tabs,
    TabsItem,
    View,
    Text
} from '@vkontakte/vkui';
import {Icon56AddCircleOutline} from '@vkontakte/icons';
import {ROUTES} from '../routes';
import EventItems from '../components/EventItems';
import {getCreatedEventsByUserId, getEventSubsByUserId} from '../http/user_to_eventAPI';


const ActiveEvents = ({currentEvent, fetchedUser, previousPage, setActiveStory, setCurrentEvent, setPreviousPage}) => {
    const [menuOpened, setMenuOpened] = useState(false); // TODO: Используется?
    const [selected, setSelected] = useState('subscriptions');

    const [subs, setSubs] = useState();
    const [createdEvents, setCreatedEvents] = useState();

    useEffect(() => {
        const fetchData = () => {
            getEventSubsByUserId(fetchedUser.id).then(s => setSubs(s))
            getCreatedEventsByUserId(fetchedUser.id).then(s => setCreatedEvents(s))
            setPreviousPage(ROUTES.ACTIVE_EVENTS)
        };

        if(fetchedUser?.id)
            fetchData();
    }, [fetchedUser]);

    return (
        <View activePanel="horizontalCell">
            <Panel id="horizontalCell">
                <PanelHeader>Активные события</PanelHeader>

                <FixedLayout vertical="top" filled>
                    <DefaultInPanel
                        selected={selected}
                        setSelected={setSelected}
                        onMenuClick={(opened) => {
                            setMenuOpened((prevState) => (opened ? !prevState : false));
                        }}
                    />
                </FixedLayout>

                {selected === 'subscriptions' &&
                    <Group id="tab-content-subscriptions" aria-labelledby="tab-subscriptions" role="tabpanel">
                        <Spacing size={50}></Spacing>

                        <CardGrid size='l'>
                            {subs && subs.length !== 0 && <EventItems events={subs}
                                                                      previousPage={previousPage} setPreviousPage={setPreviousPage}
                                                                      currentEvent={currentEvent} setCurrentEvent={setCurrentEvent}
                                                                      fetchedUser={fetchedUser} setActiveStory={setActiveStory}
                            />}
                            {!subs &&
                                <Text align='center' style={{paddingTop: '3%'}}>
                                    {`Ваши события загружаются...`}
                                </Text>
                            }
                            {subs?.length === 0 &&
                                <Text align='center' style={{paddingTop: '3%'}}>
                                    {`Вы ещё не подписались на события`}
                                </Text>}
                        </CardGrid>

                    </Group>}

                {selected === 'created_events' &&
                    <Group id="tab-content-created_events" aria-labelledby="tab-created_events" role="tabpanel">
                        <Spacing size={50}></Spacing>

                        <CardGrid size='l'>
                            {createdEvents && createdEvents.length !== 0 && <EventItems events={createdEvents}
                                                                                  previousPage={previousPage}
                                                                                  setPreviousPage={setPreviousPage}
                                                                                  currentEvent={currentEvent}
                                                                                  setCurrentEvent={setCurrentEvent}
                                                                                  fetchedUser={fetchedUser}
                                                                                  setActiveStory={setActiveStory}
                            />}
                            {!createdEvents &&
                                <Text align='center' style={{paddingTop: '3%'}}>
                                    {`События загружаются...`}
                                </Text>}
                            {createdEvents?.length === 0 &&
                                <Text align='center' style={{paddingTop: '3%'}}>
                                    {`Вы ещё не создали ни одного события`}
                                </Text>}
                        </CardGrid>

                        <Spacing size={90}></Spacing>

                        <FixedLayout vertical="bottom" filled>
                            <Spacing size={5}></Spacing>
                            <div style={{display: 'flex', justifyContent: 'center',}}>
                                <IconButton onClick={async () => {
                                    setActiveStory(ROUTES.CREATE_EVENT)
                                }}
                                >
                                    <Icon56AddCircleOutline/>
                                </IconButton>
                            </div>
                            <Footnote style={{
                                display: 'flex', justifyContent: 'center',
                                paddingTop: '10px', paddingBottom: '10px'
                            }}>Создать</Footnote>
                            <Separator wide/>
                        </FixedLayout>
                    </Group>}

            </Panel>
        </View>
    );
}
const DefaultInPanel = ({onMenuClick, selected, setSelected}) => {
    return (
        <Tabs>
            <TabsItem
                selected={selected === 'subscriptions'}
                onClick={() => {
                    if (selected === 'subscriptions') {
                        onMenuClick(true);
                    }
                    setSelected('subscriptions');
                }}
                id="tab-subscriptions"
                aria-controls="tab-content-subscriptions"
            >
                Подписки
            </TabsItem>
            <TabsItem
                selected={selected === 'created_events'}
                onClick={() => {
                    onMenuClick(false);
                    setSelected('created_events');
                }}
                id="tab-created_events"
                aria-controls="tab-content-created_events"
            >
                Созданные события
            </TabsItem>
        </Tabs>
    );
};
/* Events.propTypes = {
    id: PropTypes.string.isRequired,
    go: PropTypes.func.isRequired,
}; */

export default ActiveEvents;
