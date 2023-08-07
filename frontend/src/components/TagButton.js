import React, {useEffect, useState} from 'react';
import {Button} from '@vkontakte/vkui';

const TagButton = (props) => {
    const [buttonMode, setButtonMode] = useState(false)

    useEffect(() => {
        if (props.selectedTagIds.includes(props.tag_id)) {
            setButtonMode(true)
        }
    }, [props.selectedTagIds]);

    return (
        <Button key={props.tag_id}
                mode={buttonMode ? 'outline' : 'tertiary'}

                onClick={() => {
                    if (buttonMode) {
                        const id = props.selectedTagIds.indexOf(props.tag_id)
                        props.selectedTagIds.splice(id, 1)
                        setButtonMode(false)
                    } else {
                        props.selectedTagIds.push(props.tag_id)
                        setButtonMode(true)
                    }
                }}
        >
            {props.title_ru}
        </Button>
    )
}

export default TagButton