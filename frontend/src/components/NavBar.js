import {Epic, SplitCol, Tabbar, TabbarItem, useAdaptivityConditionalRender} from "@vkontakte/vkui";

import Icon28Search from '@vkontakte/icons/dist/28/search';
import Icon28Fire_alt_outline from '@vkontakte/icons/dist/28/fire_alt_outline';
import Icon28User_circle_outline from '@vkontakte/icons/dist/28/user_circle_outline';
import {ROUTES} from "../routes";
import {Icon28Newsfeed} from "@vkontakte/icons";

import RecEvents from "../panels/RecommendedEvents";
import SearchEvents from "../panels/SearchEvents";
import ActiveEvents from "../panels/ActiveEvents";
import Profile from "../panels/Profile";
import EventPage from "./EventPage";
import CreateEventPage from "./CreateEventPage"
import EditEventPage from "./EditEventPage";


export const NavigationBar = (props) => {
    const {viewWidth} = useAdaptivityConditionalRender();
    const onStoryChange = (e) => props.setActiveStory(e.currentTarget.dataset.story);

    return <SplitCol width="100%" maxWidth="560px" stretchedOnMobile autoSpaced>
        <Epic
            activeStory={props.activeStory}
            tabbar={
                viewWidth.tabletMinus && (
                    <Tabbar className={viewWidth.tabletMinus.className}>
                        <TabbarItem
                            onClick={() => props.setActiveStory(ROUTES.REC_EVENTS)}
                            selected={props.activeStory === ROUTES.REC_EVENTS}
                            data-story={ROUTES.REC_EVENTS}
                            text="Рекоммендации"
                        >
                            <Icon28Newsfeed/>
                        </TabbarItem>
                        <TabbarItem
                            onClick={() => props.setActiveStory(ROUTES.SEARCH_EVENTS)}
                            selected={props.activeStory === ROUTES.SEARCH_EVENTS}
                            data-story={ROUTES.SEARCH_EVENTS}
                            text="Поиск"
                        >
                            <Icon28Search/>
                        </TabbarItem>
                        <TabbarItem
                            onClick={onStoryChange}
                            selected={props.activeStory === ROUTES.ACTIVE_EVENTS}
                            data-story={ROUTES.ACTIVE_EVENTS}
                            text="Мои события"
                        >
                            <Icon28Fire_alt_outline/>
                        </TabbarItem>
                        <TabbarItem
                            onClick={() => props.setActiveStory(ROUTES.PROFILE)}
                            selected={props.activeStory === ROUTES.PROFILE}
                            data-story={ROUTES.PROFILE}
                            text="Профиль"
                        >
                            <Icon28User_circle_outline/>
                        </TabbarItem>
                    </Tabbar>
                )
            }
        >
            <RecEvents id={ROUTES.REC_EVENTS}
                       previousPage={props.previousPage} setPreviousPage={props.setPreviousPage}
                       currentEvent={props.currentEvent} setCurrentEvent={props.setCurrentEvent}
                       fetchedUser={props.fetchedUser} setActiveStory={props.setActiveStory}
                       tags={props.tags}
            />
            <SearchEvents id={ROUTES.SEARCH_EVENTS}
                          changeActiveModal={props.changeActiveModal}
                          events={props.events}
                          previousPage={props.previousPage} setPreviousPage={props.setPreviousPage}
                          currentEvent={props.currentEvent} setCurrentEvent={props.setCurrentEvent}
                          fetchedUser={props.fetchedUser} setActiveStory={props.setActiveStory}
            />
            <ActiveEvents id={ROUTES.ACTIVE_EVENTS}
                          previousPage={props.previousPage} setPreviousPage={props.setPreviousPage}
                          currentEvent={props.currentEvent} setCurrentEvent={props.setCurrentEvent}
                          fetchedUser={props.fetchedUser} setActiveStory={props.setActiveStory}
            />
            <Profile id={ROUTES.PROFILE} fetchedUser={props.fetchedUser}
                     tags={props.tags} userTags={props.userTags} SetUserTags={props.SetUserTags}/>


            <EventPage id={ROUTES.EVENT_PAGE} event={props.currentEvent} previousPage={props.previousPage}
                       setActiveStory={props.setActiveStory}
                       fetchedUser={props.fetchedUser}
                       openDeletion={props.openDeletion}
            />
            <CreateEventPage id={ROUTES.CREATE_EVENT} setActiveStory={props.setActiveStory}
                             tags={props.tags} fetchedUser={props.fetchedUser}
                             pics={props.pictures}/>
            <EditEventPage id={ROUTES.EDIT_EVENT} setActiveStory={props.setActiveStory}
                           event={props.currentEvent} previousPage={props.previousPage}
                           tags={props.tags} fetchedUser={props.fetchedUser}
                           pics={props.pictures}/>

        </Epic>
    </SplitCol>
}