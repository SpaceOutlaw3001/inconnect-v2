import React, {useEffect, useState} from 'react';
// import PropTypes from 'prop-types';

import {View, Panel, PanelHeader, Text, Group,
        Avatar, Spacing, Separator,} from '@vkontakte/vkui';
import '../styles/ModalPage.css'

import TagButtons from '../components/TagButtonsProfile';


const Profile = (props) => {
    const [border, setBorder] = useState('var(--vkui_internal--thin_border) solid var(--vkui--color_image_border_alpha)')
    const largeImageStyles = {
        width: 220,
        height: 124,
        borderRadius: 4,
        boxSizing: 'border-box',
        border: 'var(--vkui_internal--thin_border) solid var(--vkui--color_image_border_alpha)',
        objectFit: 'cover',
      }
    return (
        <View activePanel="horizontalCell">
            <Panel id="horizontalCell">
            <PanelHeader>Профиль</PanelHeader>
            {props.fetchedUser &&
                <Group className='tagButtons'>
                    <Text align='center' style={{paddingTop: '3%'}}>
                        {`Привет, ${props.fetchedUser.first_name} ${props.fetchedUser.last_name}!`}
                    </Text>
                    <div style={{display: 'flex', 
                                justifyContent: 'center', 
                                alignContent: 'center',
                                paddingTop: '15px'}} >
                        <Avatar size={70} src={props.fetchedUser.photo_200}/>
                    </div>
                    <Spacing size={50}>
                        <Separator />
                    </Spacing>


                    <Text style={{marginLeft: '5%'}}>
                        Выберите свои теги:
                    </Text>
                    <TagButtons tags = {props.tags} userTags = {props.userTags} SetUserTags={props.SetUserTags}
                                user_id = {props.fetchedUser.id}/>

                </Group>}
            </Panel>
        </View>
    );
}

/* Events.propTypes = {
    id: PropTypes.string.isRequired,
    go: PropTypes.func.isRequired,
}; */

export default Profile;
