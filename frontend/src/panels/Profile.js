import React from 'react';

import {Avatar, Group, Panel, PanelHeader, Separator, Spacing, Text, View,} from '@vkontakte/vkui';
import '../styles/ModalPage.css'

import TagButtons from '../components/TagButtonsProfile';


const Profile = ({SetUserTags, fetchedUser, tags, userTags}) => {
    return (
        <View activePanel="horizontalCell">
            <Panel id="horizontalCell">
                <PanelHeader>Профиль</PanelHeader>
                {fetchedUser &&
                    <Group className='tagButtons'>
                        <Text align='center' style={{paddingTop: '3%'}}>
                            {`Привет, ${fetchedUser.first_name} ${fetchedUser.last_name}!`}
                        </Text>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignContent: 'center',
                            paddingTop: '15px'
                        }}>
                            <Avatar size={70} src={fetchedUser.photo_200}/>
                        </div>
                        <Spacing size={50}>
                            <Separator/>
                        </Spacing>


                        <Text style={{marginLeft: '5%'}}>
                            Выберите свои теги:
                        </Text>
                        <TagButtons tags={tags} userTags={userTags} setUserTags={SetUserTags}
                                    user_id={fetchedUser.id}/>

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
