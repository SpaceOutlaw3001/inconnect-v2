import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import {ConfigProvider, AdaptivityProvider, AppRoot, Spacing,
		View, SplitLayout, SplitCol,
		Button,
		Group, Panel, PanelHeaderClose, PanelHeaderSubmit,
		ModalRoot, ModalPage, ModalPageHeader, Alert }
from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import { ROUTES } from './routes'
import { NavigationBar } from './components/NavBar';
import TagButtonsList from './components/TagButtonsList';

import { deleteEventById } from './http/eventAPI';
import { getNotActiveEventsByUserId,
		deleteUserToEventByEventId
		 } from './http/user_to_eventAPI';
import { addUser } from './http/userAPI';
import { getTags } from './http/tagAPI';
import { getTagsByUserId } from './http/user_to_tagAPI';
import { getTagIdByEventId,
		deleteEventToTagByEventId
		 } from './http/event_to_tagAPI';
import { getAllPictures } from './http/pictureAPI';


const App = () => {
	const [activeStory, setActiveStory] = useState(ROUTES.REC_EVENTS);
	const [previousPage, setPreviousPage] = useState(ROUTES.REC_EVENTS);
	const [fetchedUser, setUser] = useState(null);
	const [popout, setPopout] = useState(null);//<ScreenSpinner size='large' />

	// События
	const [events, setEvents] = useState([]); // неактивные события (панель поиска)
	const [currentEvent, setCurrentEvent] = useState(null);
	// Теги
	const [tags, SetTags] = useState([]);
	const [userTags, SetUserTags] = useState([]);
	const [selectedTagIds, setSelectedTagIds] = useState([]);
	//
	const [pictures, setPictures] = useState([])

	const checkTags = (tagsIDs, eventTags) => {
		let res = true
		if (eventTags.length < tagsIDs.length) {
			res = false
		}
		else {
			for (let i = 0; i < tagsIDs.length; i++) {
				if (! eventTags.includes(tagsIDs[i])) {
					res = false
					break
				}
			}
		}
		return res
	}

	//---- Modals ----
	const [activeModal, setActiveModal] = useState(null);
	const [modalHistory, setModalHistory] = useState([]);

	const changeActiveModal = (activeModal) => {
		activeModal = activeModal || null;
		let localModalHistory = modalHistory ? [...modalHistory] : [];

		if (activeModal === null) {
		localModalHistory = [];
		} else if (modalHistory.indexOf(activeModal) !== -1) {
		localModalHistory = localModalHistory.splice(0, localModalHistory.indexOf(activeModal) + 1);
		} else {
		localModalHistory.push(activeModal);
		}

		setActiveModal(activeModal);
		setModalHistory(localModalHistory);
	};

	const modalBack = () => {
		changeActiveModal(modalHistory[modalHistory.length - 2]);
	};

	const modal = (
	<ModalRoot activeModal={activeModal} onClose={modalBack}>
			<ModalPage
					id={ROUTES.MODAL_PAGE_SEARCH}
					onClose={async () => {
						modalBack()
						setSelectedTagIds([])
						setEvents(await getNotActiveEventsByUserId(fetchedUser?.id))
					}
					}
					header={
					<ModalPageHeader
						before={
						/* sizeX.compact && (
							<PanelHeaderClose className={sizeX.compact.className} onClick={modalBack} />
						) */
						<PanelHeaderClose onClick={async () => {
							modalBack()
							setSelectedTagIds([])
							setEvents(await getNotActiveEventsByUserId(fetchedUser?.id))
						}} />

						}
						after={<PanelHeaderSubmit onClick={async () => {
							modalBack()
						}} />}
					>
						Выбор тегов
					</ModalPageHeader>
					}
				>
					<Group className='tagButtons'>
						<TagButtonsList tags = {tags}
										  selectedTagIds = {selectedTagIds}
										  setSelectedTagIds = {setSelectedTagIds}
						/>
						<Spacing size={50}/>
					</Group>
					<Button stretched
							onClick={async () => {
							if (selectedTagIds.length) {
								console.log("tags selected")
								// setEvents(await getEventsSearchedByTags(selectedTagIds, fetchedUser?.id))
								const eventsList = []
								const allEvents = await getNotActiveEventsByUserId(fetchedUser?.id)
								for (const event in allEvents) {
									const eventTags = await getTagIdByEventId(event.id)
									if (checkTags(selectedTagIds, eventTags)) {
										eventsList.push(event)
										console.log(`included ${event.name}`)
									}
								}
								setEvents(eventsList)
							}
							else {
								console.log("no tags selected")
								setEvents(await getNotActiveEventsByUserId(fetchedUser?.id))
							}
						}}>
							Подтвердить выбор
						</Button>
						<Spacing size={10}/>
				</ModalPage>

		</ModalRoot>
	)

	const closePopout = () => {
		setPopout(null);
	  };
	const openDeletion = (event_id) => {
		console.log('hey!')
		setPopout(
		  <Alert
			actions={[
			  {
				title: 'Отмена',
				autoClose: true,
				mode: 'cancel',
			  },
			  {
				title: 'Удалить',
				autoClose: true,
				mode: 'destructive',
				action: async () => {
					await deleteEventToTagByEventId(event_id)
					await deleteUserToEventByEventId(event_id)
					await deleteEventById(event_id)
					setActiveStory(ROUTES.ACTIVE_EVENTS)
				},
			  },
			]}
			actionsLayout="horizontal"
			onClose={closePopout}
			header="Удаление события"
			text="Вы уверены, что хотите удалить это событие?"
		  />,
		);
	  };
	//--------

	useEffect( () => {
		async function fetchData() {
			const user = await bridge.send('VKWebAppGetUserInfo');
			setUser(user);
			setPopout(null);

			await addUser(user.id);
			SetTags(await getTags());
			setEvents(await getNotActiveEventsByUserId(user.id));
			SetUserTags(await getTagsByUserId(user.id));
			setPictures(await getAllPictures());
		}
		fetchData();

	}, []);

	const go = e => {
		setActiveStory(e.currentTarget.dataset.to);
	};

	return (
	<ConfigProvider>
		<AdaptivityProvider>
			<AppRoot>

				<SplitLayout modal={modal} popout={popout}>
					<SplitCol>
						<View activePanel="modals">
						<Panel id="modals">
							<NavigationBar activeStory={activeStory} setActiveStory={setActiveStory}
									fetchedUser={fetchedUser} changeActiveModal={changeActiveModal}
									events={events}
									tags={tags} userTags={userTags}
									SetUserTags={SetUserTags}
									previousPage={previousPage} setPreviousPage={setPreviousPage}
									currentEvent={currentEvent} setCurrentEvent={setCurrentEvent}
									openDeletion={openDeletion}
									pictures={pictures}
							/>
						</Panel>
						</View>
					</SplitCol>
				</SplitLayout>

			</AppRoot>
		</AdaptivityProvider>
	</ConfigProvider>
	);

}

export default App;
