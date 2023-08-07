import React from 'react';

import {ContentCard} from '@vkontakte/vkui';
import {ROUTES} from '../routes';

const EventItems = (props) => {

    /* useEffect(async () => {
        async function fetchData() {}
        await fetchData();
    }, []); */


    return props.events.map((event) => (
            <ContentCard
                key={event.id}
                caption={event.text}
                header={event.name}

                maxHeight={250}
                onClick={async () => {
                    await props.setCurrentEvent(event)
                    props.setActiveStory(ROUTES.EVENT_PAGE)
                }}
            />
        )
    )
}

export default EventItems;