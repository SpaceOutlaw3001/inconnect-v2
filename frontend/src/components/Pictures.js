import React from 'react'

import {HorizontalCell} from '@vkontakte/vkui'

const PictureItems = (props) => {
    const regBorder = 'var(--vkui_internal--thin_border) solid var(--vkui--color_image_border_alpha)'
    const selBorder = 'var(--vkui_internal--thin_border) solid blue'

    return props.pics.map(({id, url}) => (
        <HorizontalCell key={id} size="l"
                        onClick={() => {
                            if (props.selected !== id) {
                                props.setSelected(id)
                            }
                            console.log(`url = ${url}`)
                        }}
        >
            <img style={{
                width: 220,
                height: 124,
                borderRadius: 4,
                boxSizing: 'border-box',
                border: (props.selected === id) ? selBorder : regBorder,
                objectFit: 'cover'
            }}
                 src={url}
            />
        </HorizontalCell>
    ));
};

export default PictureItems;