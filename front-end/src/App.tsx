import React from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import './App.css';

const ws = new W3CWebSocket('ws://127.0.0.1:8000');

const App = () => {
	const [message, setMessage] = React.useState<string>('');
	const [publicId, setPublicId] = React.useState<string>('');
	const [messageReceived, setMessageReceived] = React.useState<string>('');

	React.useEffect(() => {

		ws.onopen = () => {
			console.log('WebSocket Client Connected');
			ws.onmessage = (msg: any) => {
				const dataFromServer = JSON.parse(msg.data);
				console.log('msg received: ', dataFromServer);
				setMessageReceived(dataFromServer.output);
			};

			// Send ID number when loading the page for the 1st time
			// ws.send(JSON.stringify({
			// 	publicId: Math.floor(Math.random() * 1000),
			// 	action: 'ping',
			// 	message: 'Hello',
			// }));
		};
		return () => ws.close();
	}, []);

	const handleSendID = () => {
		(publicId)
			? ws.send(JSON.stringify({
				publicId: publicId,
				action: 'ping',
				message: '',
			}))
			: console.log('Fill in ID first');
	};

	const handleSendData = () => {
		ws.send(JSON.stringify({
			publicId: publicId,
			action: 'send to me',
			message: message,
		}));
	};

	const handleSendDataAll = () => {
		ws.send(JSON.stringify({
			publicId: publicId,
			action: 'send to all',
			message: message,
		}));
	};

	return (
		<div className={'container'}>
			<div className={'header'}>
				WebSockets tests
			</div>
			<div className={'item'}>
				<div className={'description'}>
					<button
						className={'grey'}
						onClick={handleSendID}
					>
						Send ID
                    </button>
				</div>
				<div>
					<input
						onChange={(elem) => setPublicId(elem.target.value)}
					/>
				</div>
			</div>

			<div className={'item'}>
				<div className={'description'}>
					<button
						className={'grey'}
						onClick={handleSendData}>
						Send data to ME
                    </button>
				</div>
				<div>
					<input
						onChange={(elem) => setMessage(elem.target.value)}
					/>
				</div>
			</div>

			<div className={'item'}>
				<div className={'description'}>
					<button
						className={'grey'}
						onClick={handleSendDataAll}>
						Send data to ALL
                    </button>
				</div>
			</div>

			<div className={'item'}>
				<div className={'description'}>
					Msg received:
				</div>
				<div>
					{messageReceived}
				</div>
			</div>


		</div>
	);
}

export default App;