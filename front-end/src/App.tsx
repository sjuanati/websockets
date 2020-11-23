import React from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import './App.css';

const ws = new W3CWebSocket('ws://127.0.0.1:8000');

const App = () => {
	const [message, setMessage] = React.useState<string>('');
	
	React.useEffect(() => {
		
		ws.onopen = () => {
			console.log('WebSocket Client Connected');
			ws.onmessage = (msg: any) => {
				const dataFromServer = JSON.parse(msg.data)
				console.log('msg: ', msg);
				console.log('msg parsed: ', dataFromServer);
			};
		};
		return () => ws.close();
	}, []);

	const handleSend = () => {
		ws.send(JSON.stringify({
			publicId: message,
		}));
	};

	return (
		<div className={'App'}>
			<div>
				Practical Intro To WebSockets
			</div>
			<input
				onChange={(elem) => setMessage(elem.target.value)}>
			</input>
			<button
				onClick={handleSend}>
				Send
			</button>
			<div>
				{message}
			</div>
		</div>


	);
}

export default App;