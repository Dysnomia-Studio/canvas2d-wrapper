import { useEffect, useState } from 'react';

export default function useKeyboard() {
	const [keyboard, setKeyboard] = useState({});

	useEffect(() => {
		const keydown = (e) => {
			keyboard[e.key] = true;
			setKeyboard(JSON.parse(JSON.stringify(keyboard)));
		};
		document.addEventListener('keydown', keydown);

		const keyup = (e) => {
			keyboard[e.key] = false;
			setKeyboard(JSON.parse(JSON.stringify(keyboard)));
		};
		document.addEventListener('keyup', keyup);


		return () => {
			document.removeEventListener('keydown', keydown);
			document.removeEventListener('keyup', keyup);
		};
	}, []);

	return keyboard;
}