import React, {useEffect, useState} from 'react';
import {Button} from '@vkontakte/vkui';

const TagButton = ({selectedTagIds, tag_id, title_ru}) => {
    const [buttonMode, setButtonMode] = useState(false)

    useEffect(() => {
        if (selectedTagIds.includes(tag_id)) {
            setButtonMode(true)
        }
    }, [selectedTagIds]);

    return (
        <Button key={tag_id}
                mode={buttonMode ? 'outline' : 'tertiary'}

                onClick={() => {
                    if (buttonMode) {
                        const id = selectedTagIds.indexOf(tag_id)
                        selectedTagIds.splice(id, 1)
                        setButtonMode(false)
                    } else {
                        selectedTagIds.push(tag_id)
                        setButtonMode(true)
                    }
                }}
        >
            {title_ru}
        </Button>
    )
}

export default TagButton