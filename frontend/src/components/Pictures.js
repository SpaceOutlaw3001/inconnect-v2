import React, {useEffect, useState} from 'react'

import {ContentCard, HorizontalCell, HorizontalScroll} from '@vkontakte/vkui'
import img_not_found from "../img/img_not_found.jpg"
import EventPage from "./EventPage";
import { ROUTES } from '../routes';

const PictureItems = (props) => {
    // const [selected, setSelected] = useState(null)
    const regBorder = 'var(--vkui_internal--thin_border) solid var(--vkui--color_image_border_alpha)'
    const selBorder = 'var(--vkui_internal--thin_border) solid blue'
    /* useEffect(async () => {
        async function fetchData() {}
        await fetchData();
    }, []); */

    return props.pics.map((pic) => (
        <HorizontalCell key={pic?.id} size="l"
                onClick={() => {
                    if (props.selected != pic?.id) {
                        props.setSelected(pic?.id)
                    }
                    console.log(`url = ${pic?.url}`)
                }}
        >
            <img style={{width: 220,
                        height: 124,
                        borderRadius: 4,
                        boxSizing: 'border-box',
                        border: (props.selected == pic.id) ? selBorder : regBorder,
                        objectFit: 'cover'}}
            src={pic.url}
            />
        </HorizontalCell>
    ));
};

export default PictureItems;