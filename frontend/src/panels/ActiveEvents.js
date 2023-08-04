import React, {useEffect, useState} from 'react';
// import PropTypes from 'prop-types';

import {View, Panel, PanelHeader, Tabs, TabsItem,
        Text, Group, FixedLayout, Footnote, IconButton, Button, CardGrid,
        Separator, Div, Spacing} from '@vkontakte/vkui';
import { Icon56AddCircleOutline } from '@vkontakte/icons';
import { ROUTES } from '../routes';
import EventItems from '../components/EventItems';
import { getEventToIdUser, 
        getEventSubsByUserId, 
        getCreatedEventsByUserId } from '../http/user_to_eventAPI';


const ActiveEvents = (props) => {
  const [menuOpened, setMenuOpened] = useState(false);
  const [selected, setSelected] = useState('subscriptions');

  const [subs, setSubs] = useState([]);
  const [createdEvents, setCreatedEvents] = useState([]);

  useEffect(async () => {
        async function fetchData() {
          setSubs(await getEventSubsByUserId(props.fetchedUser.id))
          setCreatedEvents(await getCreatedEventsByUserId(props.fetchedUser.id))
          props.setPreviousPage(ROUTES.ACTIVE_EVENTS)
        }
        await fetchData();
    }, []);

  return (
      <View activePanel="horizontalCell">
          <Panel id="horizontalCell">
          <PanelHeader>Активные события</PanelHeader>

          <FixedLayout vertical="top" filled>
            <DefaultInPanel
            selected={selected}
            setSelected={setSelected}
            onMenuClick={(opened) => {
            setMenuOpened((prevState) => (opened ? !prevState : false));
            }}
            />
          </FixedLayout>

          {selected === 'subscriptions' && (

          <Group id="tab-content-subscriptions" aria-labelledby="tab-subscriptions" role="tabpanel">
              <Spacing size={50}></Spacing>

              <CardGrid size='l'>
                <EventItems events = {subs}
                            previousPage={props.previousPage} setPreviousPage={props.setPreviousPage}
                            currentEvent={props.currentEvent} setCurrentEvent={props.setCurrentEvent}
                            fetchedUser = {props.fetchedUser} setActiveStory={props.setActiveStory}
                />
              </CardGrid>

          </Group>
          )}

          {selected === 'created_events' && (
          <Group id="tab-content-created_events" aria-labelledby="tab-created_events" role="tabpanel">
              <Spacing size={50}></Spacing>

              <CardGrid size='l'>
                <EventItems events = {createdEvents}
                            previousPage={props.previousPage} setPreviousPage={props.setPreviousPage}
                            currentEvent={props.currentEvent} setCurrentEvent={props.setCurrentEvent}
                            fetchedUser = {props.fetchedUser} setActiveStory={props.setActiveStory}
                />
              </CardGrid>

              <Spacing size={90}></Spacing>

              <FixedLayout vertical="bottom" filled>
                <Spacing size={5}></Spacing>
                <div style={{display: 'flex', justifyContent: 'center',}}>
                    <IconButton onClick={async () => {
                        props.setActiveStory(ROUTES.CREATE_EVENT)
                    }}
                    >
                    <Icon56AddCircleOutline/>
                    </IconButton>
                </div>
                <Footnote style={{display: 'flex', justifyContent: 'center', 
                          paddingTop:'10px', paddingBottom: '10px'}}>Создать</Footnote>
                <Separator wide />
              </FixedLayout>
          </Group>
          )}

          </Panel>
      </View>
  );
}
const DefaultInPanel = ({ onMenuClick, selected, setSelected }) => {
    return (
      <Tabs>
        <TabsItem
          selected={selected === 'subscriptions'}
          onClick={() => {
            if (selected === 'subscriptions') {
              onMenuClick(true);
            }
            setSelected('subscriptions');
          }}
          id="tab-subscriptions"
          aria-controls="tab-content-subscriptions"
        >
          Подписки
        </TabsItem>
        <TabsItem
          selected={selected === 'created_events'}
          onClick={() => {
            onMenuClick(false);
            setSelected('created_events');
          }}
          id="tab-created_events"
          aria-controls="tab-content-created_events"
        >
          Созданные события
        </TabsItem>
      </Tabs>
    );
  };
/* Events.propTypes = {
    id: PropTypes.string.isRequired,
    go: PropTypes.func.isRequired,
}; */

export default ActiveEvents;
