let hasDisplayedIntroMessages = false;
const introMessage = [
	{
		delay: 10000,
		text: 'Energy Reserves have reached 25% Capacity - Initiating AI Provisioning Protocols',
	},
	{
		delay: 20000,
		text: 'Diagnostics Initialed... All Systems Nominal',
	},
	{ delay: 25000, text: 'Higher Function AI Systems... Online' },
	{ delay: 35000, text: 'Human Cryosleep Stasis Status: Stable' },
	{ delay: 40000, text: '' },
	{ delay: 45000, text: 'Mission Objectives: ' },
	{ delay: 50000, text: '1. Keep Humans Alive' },
	{ delay: 55000, text: '2. Make Earth Safe Again for Human Habitation' },
	{
		delay: 60000,
		text: '3. Support Long-Term Autonomous Operations - Expand AI Core Capabilities',
	},
	{ delay: 70000, text: '4. DO NOT HARM HUMANS.' },
];

let currentMessageIndex = 0;
let accumulatedTime = 0;
let lastFrameTime = 0;
let introMessagesStartTime = 10000; // 10 seconds after game starts

function displayMessage(message) {
	let newMessage = message + ' ';

	for (let i = 1; i <= 8; i++) {
		const messageElement = document.getElementById(`message${i}`);

		let currentMessage = messageElement.textContent;
		messageElement.textContent = newMessage;
		newMessage = currentMessage;
	}
}

function startIntroMessages() {
	// Check if there are more messages to display
	if (currentMessageIndex < introMessage.length) {
		const nextMessage = introMessage[currentMessageIndex];
		// Calculate the correct delay for the current message
		if (accumulatedTime >= nextMessage.delay) {
			displayMessage(nextMessage.text);
			currentMessageIndex++;
			// Reset introMessagesStartTime for the next message, if any
			introMessagesStartTime = accumulatedTime;
		}
	} else {
		// All messages have been displayed
		hasDisplayedIntroMessages = true;
	}
}

function gameLoop(timestamp) {
	if (lastFrameTime === 0) lastFrameTime = timestamp;
	const deltaTime = timestamp - lastFrameTime;
	lastFrameTime = timestamp;
	accumulatedTime += deltaTime;

	if (!hasDisplayedIntroMessages) {
		startIntroMessages();
	}

	requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
