import React from 'react';
import {Button} from '@vkontakte/vkui';
import {addUserToTag, deleteUserToTagByBothIds, getTagsByUserId} from '../http/user_to_tagAPI';

const TagButtons = ({SetUserTags, tags, userTags, user_id}) => {
    // TODO: state?

    const userTagsIds = userTags.map(userTag => userTag.id)
    const allTags = tags.map(({id, title_ru}) => ({
        id: id,
        title_ru: title_ru,
        mode: userTagsIds.includes(id) ? 'outline' : 'tertiary'
    }))

    return allTags.map(({id, mode, title_ru}) => (
        <Button key={id}
                mode={mode}
                onClick={async () => {
                    if (mode === 'outline') {
                        await deleteUserToTagByBothIds(user_id, id)

                        const updatedTags = await getTagsByUserId(user_id)
                        SetUserTags(updatedTags)
                    } else {
                        await addUserToTag(user_id, id)
                        const updatedTags = await getTagsByUserId(user_id)
                        SetUserTags(updatedTags)
                    }
                }}
        >
            {title_ru}
        </Button>
    ));
};

export default TagButtons;