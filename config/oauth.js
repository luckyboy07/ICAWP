'use strict';

module.exports = {
	facebook: {
	 	clientID: '1474165249513663',
	 	clientSecret: '1c557f61903324ca548e3b1c24806cbe',
	 	callbackURL: 'http://localhost:3000/auth/facebook/callback'
	},
	twitter: {
	 	consumerKey: 'JRvG3PUbwBf1EXQWdVwx633po',
	 	consumerSecret: 'ToQ8zVRmIZ3uWkE9UUXGiRPODMBTC7zW7NO8ukR6j73u6vtRv3',
	 	callbackURL: "http://127.0.0.1:3000/auth/twitter/callback"
	},
	google: {
	 	returnURL: 'http://127.0.0.1:3000/auth/google/callback',
	 	realm: 'http://127.0.0.1:3000'
	},
	googleOAuth2 : {
		clientID 		: '178984893755-7mrqn9bvhbibgo7se7sj1ist0c46fmhg.apps.googleusercontent.com',
		clientSecret 	: 'vkd6t8hDYZkxOAg_GyOfr8ee',
		callbackURL 	: 'http://127.0.0.1:3000/auth/google/callback'
	},
	mandrillapp : {
		Host 		: 'smtp.mandrillapp.com',
		Port 	: '587',
		SMTP_Username 	: 'philipgaray2@gmail.com',
		SMTP_Password	: 'p7J5LlhKVF0IsG_1aZUNVg'
	}
}
