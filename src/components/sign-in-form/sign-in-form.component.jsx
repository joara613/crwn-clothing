import { useState } from "react";

import { SignInContainer, ButtonsContainer } from "./sign-in-form.styles";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.componet";

import {
	signInWithGooglePopup,
	signInAuthWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
	email: "",
	password: "",
};

const SignInForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { email, password } = formFields;

	const resetFormFields = () => {
		setFormFields(defaultFormFields);
	};

	const signInWithGoogle = async () => {
		await signInWithGooglePopup();
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			await signInAuthWithEmailAndPassword(email, password);
			resetFormFields();
		} catch (error) {
			switch (error.code) {
				case "auth/wrong-password":
					alert("incorrect password for email");
					break;
				case "auth/user-not-found":
					alert("no user associated with this email");
					break;
				default:
					console.log("user sign in encountered an error" + error);
			}
		}
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormFields({ ...formFields, [name]: value });
	};

	return (
		<SignInContainer>
			<h2>Already have an account?</h2>
			<span>Sign in with your email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					label="Email"
					type="email"
					required
					onChange={handleChange}
					name="email"
					value={email}
				/>
				<FormInput
					label="Password"
					type="password"
					required
					onChange={handleChange}
					name="password"
					value={password}
				/>
				<ButtonsContainer>
					<Button type="submit">Sign In</Button>
					<Button type="button" buttonType="google" onClick={signInWithGoogle}>
						Google sign in
					</Button>
					{/* button has submit type as default */}
				</ButtonsContainer>
			</form>
		</SignInContainer>
	);
};

export default SignInForm;
