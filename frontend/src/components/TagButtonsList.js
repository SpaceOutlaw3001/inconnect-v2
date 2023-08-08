import React from 'react';
import TagButton from './TagButton'

const TagButtonsList = ({selectedTagIds, setSelectedTagIds, tags}) => {

    return tags.map((tag) =>
        (
            <TagButton key={tag.id}
                       title_ru={tag.title_ru} tag_id={tag.id}
                       setSelectedTagIds={setSelectedTagIds}
                       selectedTagIds={selectedTagIds}
            />
        ))
};

export default TagButtonsList;