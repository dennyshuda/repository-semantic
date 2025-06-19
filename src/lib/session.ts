import { SessionOptions } from "iron-session";

export interface SessionData {
	id?: number;
	username?: string;
	name?: string;
	role?: string;
	isLoggedIn: boolean;
}

export const defaultSession: SessionData = {
	isLoggedIn: false,
};

export const sesssionOptions: SessionOptions = {
	password: "complex_password_at_least_32_characters_long",
	cookieName: "repository-session",
	cookieOptions: {
		secure: process.env.NODE_ENV === "production",
	},
};
