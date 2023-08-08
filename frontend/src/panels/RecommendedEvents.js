import React, {useEffect, useState} from 'react';
import {CardGrid, Group, Panel, PanelHeader, View} from '@vkontakte/vkui';
import AlbumItems from '../components/AlbumItems';
import {ROUTES} from '../routes';
import {getRecEventsByUserId} from '../http/user_to_eventAPI';


const RecEvents = ({currentEvent, fetchedUser, previousPage, setActiveStory, setCurrentEvent, setPreviousPage, tags}) => {
    const [recEvent, setRecEvents] = useState([])

    useEffect(async () => {
        async function fetchData() {
            setPreviousPage(ROUTES.REC_EVENTS)
            setRecEvents(await getRecEventsByUserId(fetchedUser.id))
        }

        await fetchData();
    }, [tags]);

    return (
        <View activePanel="horizontalCell">
            <Panel id="horizontalCell">
                <PanelHeader>Рекомендации</PanelHeader>
                <Group>
                    <CardGrid size='l'>
                        <AlbumItems events={recEvent}
                                    previousPage={previousPage} setPreviousPage={setPreviousPage}
                                    currentEvent={currentEvent} setCurrentEvent={setCurrentEvent}
                                    fetchedUser={fetchedUser} setActiveStory={setActiveStory}
                        />
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
