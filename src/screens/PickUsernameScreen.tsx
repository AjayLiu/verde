import PickUsername from "@components/PickUsername";
import { RouterProps } from "src/types";

const PickUsernameScreen = ({ navigation }: RouterProps) => {
	const successCallback = () => {
		navigation.navigate("Home");
		console.log("Success");
	};
	return <PickUsername successCallback={successCallback}></PickUsername>;
};

export default PickUsernameScreen;
