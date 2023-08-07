import React from 'react';
import TagButton from './TagButton'

const TagButtonsList = (props) => {

    return props.tags.map((tag) => 
    (
        <TagButton key={tag.id}
                   title_ru = {tag.title_ru} tag_id = {tag.id} 
                   setSelectedTagIds = {props.setSelectedTagIds}
                   selectedTagIds = {props.selectedTagIds}
        />
    )) 
};

export default TagButtonsList;