import { createContext } from "react";

const UsernameContext = createContext({
	hasPickedUsername: false,
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	setHasPickedUsername: (newVal: boolean) => {},
});

export default UsernameContext;
