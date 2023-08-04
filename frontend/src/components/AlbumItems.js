import React, {useEffect, useState} from 'react'

import {ContentCard} from '@vkontakte/vkui'
import img_not_found from "../img/img_not_found.jpg"
import EventPage from "./EventPage";
import { ROUTES } from '../routes';

const AlbumItems = (props) => {

    /* useEffect(async () => {
        async function fetchData() {}
        await fetchData();
    }, []); */

    return props.events.map((event) => (
        <ContentCard
            key={event.id}

            caption={event.text}
            header={event.name}

            src={event.url ? event.url : img_not_found}
            maxHeight={250}
            onClick={async () => {
                await props.setCurrentEvent(event)
                props.setActiveStory(ROUTES.EVENT_PAGE)
            }}
        />
    ));
};

export default AlbumItems;