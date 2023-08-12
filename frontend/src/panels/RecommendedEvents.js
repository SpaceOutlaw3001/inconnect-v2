import React, {useEffect, useState} from 'react';
import {CardGrid, Group, Panel, PanelHeader, Text, View} from '@vkontakte/vkui';
import AlbumItems from '../components/AlbumItems';
import {ROUTES} from '../routes';
import {getRecEventsByUserId} from '../http/user_to_eventAPI';


const RecEvents = ({currentEvent, fetchedUser, previousPage, setActiveStory, setCurrentEvent, setPreviousPage, tags}) => {
    const [recEvent, setRecEvents] = useState()

    useEffect(() => {
        const fetchData = () => {
            getRecEventsByUserId(fetchedUser.id).then(s => setRecEvents(s))
            setPreviousPage(ROUTES.REC_EVENTS)
        };
        if(fetchedUser?.id)
            fetchData();
    }, [tags, fetchedUser]);

    return (
        <View activePanel="horizontalCell">
            <Panel id="horizontalCell">
                <PanelHeader>Рекомендации</PanelHeader>
                <Group>
                    <CardGrid size='l'>
                        {recEvent && recEvent.length !== 0 && <
                            AlbumItems events={recEvent}
                                       previousPage={previousPage} setPreviousPage={setPreviousPage}
                                       currentEvent={currentEvent} setCurrentEvent={setCurrentEvent}
                                       fetchedUser={fetchedUser} setActiveStory={setActiveStory}
                        />}
                        {!recEvent &&
                            <Text align='center' style={{paddingTop: '3%'}}>
                                {`Рекомендации загружаются...`}
                            </Text>}
                        {recEvent?.length === 0 &&
                            <Text align='center' style={{paddingTop: '3%'}}>
                                {`Подходящих событий больше не осталось :(`}
                            </Text>}
                    </CardGrid>
                </Group>
            </Panel>
        </View>
    );
}

/* Events.propTypes = {
    id: PropTypes.string.isRequired,
    go: PropTypes.func.isRequired,
}; */

export default RecEvents;
