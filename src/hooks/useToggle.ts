import { useState } from "react";

export function useToggle(initialValue: boolean = false) {
	const [value, setValue] = useState<boolean>(initialValue);

	const toggle = () => setValue((prev) => !prev);
	const setOn = () => setValue(true);
	const setOff = () => setValue(false);

	return { value, toggle, setOn, setOff };
}
