interface SignUpArgs {
	phoneNumber: string;
	fullname: string;
}

export default class SignUpService {
	public static signUp = async ({ phoneNumber, fullname, password }) => {};
}
