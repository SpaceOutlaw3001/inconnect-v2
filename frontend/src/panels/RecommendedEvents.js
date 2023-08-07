import React, {useEffect, useState} from 'react';
import {CardGrid, Group, Panel, PanelHeader, View} from '@vkontakte/vkui';
import AlbumItems from '../components/AlbumItems';
import {ROUTES} from '../routes';
import {getRecEventsByUserId} from '../http/user_to_eventAPI';


const RecEvents = (props) => {
    const [recEvent, setRecEvents] = useState([])

    useEffect(async () => {
        async function fetchData() {
            props.setPreviousPage(ROUTES.REC_EVENTS)
            setRecEvents(await getRecEventsByUserId(props.fetchedUser.id))
        }

        await fetchData();
    }, [props.tags]);

    return (
        <View activePanel="horizontalCell">
            <Panel id="horizontalCell">
                <PanelHeader>Рекоммендации</PanelHeader>
                <Group>
                    <CardGrid size='l'>
                        <AlbumItems events={recEvent}
                                    previousPage={props.previousPage} setPreviousPage={props.setPreviousPage}
                                    currentEvent={props.currentEvent} setCurrentEvent={props.setCurrentEvent}
                                    fetchedUser={props.fetchedUser} setActiveStory={props.setActiveStory}
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
