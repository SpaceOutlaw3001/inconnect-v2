import React, {useEffect} from 'react';
import AlbumItems from '../components/AlbumItems';

import {
    Button,
    CardGrid,
    FixedLayout,
    Group,
    Panel,
    PanelHeader,
    Separator,
    Spacing,
    Text,
    View
} from '@vkontakte/vkui';
import {Icon28Search} from '@vkontakte/icons';

import {ROUTES} from '../routes';

const SearchEvents = (props) => {
    useEffect(async () => {
        async function fetchData() {
            props.setPreviousPage(ROUTES.SEARCH_EVENTS)
        }

        await fetchData();
    }, []);
    return (
        <View activePanel="horizontalCell">
            <Panel id="horizontalCell">
                <PanelHeader>Поиск событий</PanelHeader>
                <Group>
                    <Spacing size={25}>
                    </Spacing>

                    <FixedLayout vertical="top" filled>

                        <Button before={<Icon28Search/>}
                                stretched
                                onClick={() => props.changeActiveModal(ROUTES.MODAL_PAGE_SEARCH)}>
                            Выбрать теги
                        </Button>

                        <Spacing size={10}/>
                        <Separator wide/>

                    </FixedLayout>

                    <Spacing size={15}/>
                    <CardGrid size='l'>
                        {props.events && props.events.length !== 0 && <AlbumItems events={props.events}
                                          previousPage={props.previousPage} setPreviousPage={props.setPreviousPage}
                                          currentEvent={props.currentEvent} setCurrentEvent={props.setCurrentEvent}
                                          fetchedUser={props.fetchedUser} setActiveStory={props.setActiveStory}
                        />}
                        {!props.events &&
                            <Text align='center' style={{paddingTop: '3%'}}>
                                {`События загружаются...`}
                            </Text>}
                        {props.events?.length === 0 &&
                            <Text align='center' style={{paddingTop: '3%'}}>
                                {`Доступных событий больше не осталось :(`}
                            </Text>}
                    </CardGrid>

                </Group>
            </Panel>
        </View>
    );
}

/* Events.propTypes = {
    id: PropTypes.string.isRequired,
    go: PropTypes.func.isRequired,
}; */

export default SearchEvents;
