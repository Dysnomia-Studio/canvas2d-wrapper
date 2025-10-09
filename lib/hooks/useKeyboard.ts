import { useEffect, useState } from 'react';

type KeyboardEntries = { [id: string]: boolean };

export default function useKeyboard(): KeyboardEntries {
	const [keyboard, setKeyboard] = useState<KeyboardEntries>({});

	useEffect(() => {
		const keydown = (e: KeyboardEvent) => {
			keyboard[e.key] = true;
			setKeyboard(JSON.parse(JSON.stringify(keyboard)));
		};
		document.addEventListener('keydown', keydown);

		const keyup = (e: KeyboardEvent) => {
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