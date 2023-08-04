import React, {useEffect, useState} from 'react';
import {Button} from '@vkontakte/vkui';
// import { getTagToIdUser } from '../http/user_to_tagAPI';
import { addUserToTag, 
         getTagsByUserId, 
         deleteUserToTagByBothIds } from '../http/user_to_tagAPI';

const TagButtons = (props) => {

    const allTags = []
    const userTagsIds = []
    
    
    function updateTagLists() {
        props.userTags.map((userTag) => {
            userTagsIds.push(userTag.id)
        })
        props.tags.map((tag) => {
            if (userTagsIds.includes(tag.id)) {
                allTags.push(
                {id: tag.id,  title_ru: tag.title_ru, mode: 'outline'}
                )
            }
            else {
                allTags.push(
                {id: tag.id, title_ru: tag.title_ru, mode: 'tertiary'}
                )
            }
        })
    };
    
    /* useEffect(() => {
		async function fetchData() {
            props.SetUserTags(await getTagsByUserId(props.user_id));
		}
		fetchData();
        
	}, []); */
    
    updateTagLists();

    return allTags.map((tag) => (
        <Button key={tag.id}
                mode={tag.mode}
                onClick={async () => {
                    if (tag.mode == 'outline') {
                        deleteUserToTagByBothIds(props.user_id, tag.id)

                        const updatedTags = await getTagsByUserId(props.user_id)
                        props.SetUserTags(updatedTags)
                    }
                    else {
                        addUserToTag(props.user_id, tag.id)
                        const updatedTags = await getTagsByUserId(props.user_id)
                        props.SetUserTags(updatedTags)
                    }
                }}
        >
            {tag.title_ru}
        </Button>
    ));
};

export default TagButtons;