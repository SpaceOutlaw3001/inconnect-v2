import React from 'react'

import {ContentCard} from '@vkontakte/vkui'
import img_not_found from "../img/img_not_found.jpg"
import {ROUTES} from '../routes';

const AlbumItems = ({events, setActiveStory, setCurrentEvent}) => {

    /* useEffect(async () => {
        async function fetchData() {}
        await fetchData();
    }, []); */

    return events.map((event) => (
        <ContentCard
            key={event.id}

            caption={event.text}
            header={event.name}

            src={event.url ? event.url : img_not_found}
            maxHeight={250}
            onClick={async () => {
                await setCurrentEvent(event)
                setActiveStory(ROUTES.EVENT_PAGE)
            }}
        />
    ));
};

export default AlbumItems;