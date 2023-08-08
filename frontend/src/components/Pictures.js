import React from 'react'

import {HorizontalCell} from '@vkontakte/vkui'

const PictureItems = ({pics, selected, setSelected}) => {
    const regBorder = 'var(--vkui_internal--thin_border) solid var(--vkui--color_image_border_alpha)'
    const selBorder = 'var(--vkui_internal--thin_border) solid blue'

    return pics.map(({id, url}) => (
        <HorizontalCell key={id} size="l"
                        onClick={() => {
                            if (selected !== id) {
                                setSelected(id)
                            }
                            console.log(`url = ${url}`)
                        }}
        >
            <img style={{
                width: 220,
                height: 124,
                borderRadius: 4,
                boxSizing: 'border-box',
                border: (selected === id) ? selBorder : regBorder,
                objectFit: 'cover'
            }}
                 src={url}
            />
        </HorizontalCell>
    ));
};

export default PictureItems;