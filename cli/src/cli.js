import React, { useEffect } from 'react';
import { Text, useInput, Box } from 'ink';
import { Header } from './components/header.js';
import { Menu } from './components/menu.js';

const renderMenu = (screenId, {getScreen}, state) => {
	const screen = getScreen(screenId);
	const [inputValue, setInput] = React.useState('');
	const [output, setOutput] = React.useState('');
	const [currentQuestionIdx, setCurrentQuestionIdx] = React.useState(0);

	const selectQuestion = (idx) => {
		setCurrentQuestionIdx(idx);
			
		setOutput(screen.questions[idx].title)
	}

	useEffect(() => {
		setOutput(screen.output);

		if(screen.type === 'dialog') {
			selectQuestion(0)
		}

		screen.onInit && screen.onInit()
	}, [screenId]);

	useInput((input, key) => {
		if(screen.type !== 'dialog') {
			return;
		}

		setInput(inputValue + input)
		if(key.delete) {
			setInput(inputValue.slice(0, inputValue.length - 1))
		}

		if(key.return) {
			const callback = screen.questions[currentQuestionIdx].cb;
			if(callback) {
				callback(inputValue);
			}
			setInput('')
			if(currentQuestionIdx < screen.questions.length - 1) {
				selectQuestion(currentQuestionIdx + 1)
			}
		}
	})

	
	let content;

	if(screen.type === 'dialog') {
		content = (
			React.createElement(
				Box,
				{},
				React.createElement(
					Box,
					{height: 8},
					React.createElement(Text, {}, `${output}: `)
				),
				React.createElement(
					Text,
					{color: 'green'},
					inputValue
				)
			)
		);
	} else if(screen.items) {
		content = React.createElement(Menu, {items: screen.items, menu: state.menu, focusedItem: state.focusedItem});
	} else {
		content = (
			React.createElement(
				Box,
				{},
				React.createElement(
					Box,
					{height: 8},
					typeof output === 'string' ? React.createElement(Text, {}, output) : output,
				),
			)
		);
	}


	return React.createElement(
		Box,
		{flexDirection: 'column'},
		React.createElement(Header, {title: screen.title}),
	  	content
	)
	
}



export const CLI = (menu, currentScreen, defaultScreen) => {
	const getScreen = (id) => menu.find(it => it.id === id);
	const [menuItem, setMenuItem] = React.useState(getScreen(defaultScreen).items[0].id);
	const [screen, setScreen] = React.useState(defaultScreen);


	useEffect(() => {
		setScreen(currentScreen);
	}, [currentScreen]);

	const selectNextItem = () => {
		const screenItems = getScreen(screen).items;
		const selectedItemIdx = screenItems.findIndex(it => it.id === menuItem);
		setMenuItem((screenItems[selectedItemIdx + 1] || screenItems[0]).id)
	}

	const selectPrevItem = () => {
		const screenItems = getScreen(screen).items;
		const selectedItemIdx = screenItems.findIndex(it => it.id === menuItem);
		setMenuItem((screenItems[selectedItemIdx - 1] || screenItems[screenItems.length - 1]).id)
	}

	useInput((input, key) => {
		if(getScreen(screen).items) {
			if(key.downArrow) {
				selectNextItem()
				return;
			}
			if(key.upArrow) {
				selectPrevItem()
				return;
			}
			if(key.rightArrow || key.return) {
				if(menu.find(it => it.id === menuItem)) {
					setScreen(menuItem)
					const nextScreen = getScreen(menuItem);
					if(nextScreen.items) {
						setMenuItem(nextScreen.items[0].id)
					}
				}
				return
			}

			if(!Number.isNaN(parseInt(input))) {
				const item = getScreen(screen).items[parseInt(input) - 1];
				if(item) {
					setScreen(item.id)
					const nextScreen = getScreen(menuItem);
					if(nextScreen.items) {
						setMenuItem(nextScreen.items[0].id)
					}
				}
			}
		}
			
		if(key.escape || key.leftArrow) {
			setScreen(defaultScreen)
			setMenuItem(getScreen(defaultScreen).items[0].id)
		}
	});

	return renderMenu(screen, {getScreen}, {focusedItem: menuItem, menu})
};

