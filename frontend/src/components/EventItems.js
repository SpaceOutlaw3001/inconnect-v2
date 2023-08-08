import React from 'react';

import {ContentCard} from '@vkontakte/vkui';
import {ROUTES} from '../routes';

const EventItems = ({events, setActiveStory, setCurrentEvent}) => {

    return events.map((event) => (
            <ContentCard
                key={event.id}
                caption={event.text}
                header={event.name}

                maxHeight={250}
                onClick={async () => {
                    await setCurrentEvent(event)
                    setActiveStory(ROUTES.EVENT_PAGE)
                }}
            />
        )
    )
}

export default EventItems;