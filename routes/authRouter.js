// Dependencies
var express = require('express');
var router  = express.Router();

module.exports = function (passport) {

	// Local Login
	router.get('/local-login', function (req, res) {
		res.render('local-login', { title: 'Local Login', message: req.flash('message') });
	});

	router.post('/local-login', passport.authenticate('local-login', {
		successRedirect : '/auth/profile',
		failureRedirect : '/auth/local-login',
		failureFlash    : true
	}));

	// Local Signup
	router.get('/local-signup', function (req, res) {
		res.render('local-signup', { title: 'Local Signup', message: req.flash('message') });
	});

	router.post('/local-signup', passport.authenticate('local-signup', {
		successRedirect : '/',
		failureRedirect : '/auth/local-signup',
		failureFlash    : true
	}));

	// Facebook Login
	router.get('/facebook-login', passport.authenticate('facebook', {
		scope: 'emails'
	}));

	// Facebook Callback
	router.get('/facebook/callback', passport.authenticate('facebook', {
		successRedirect: '/auth/profile',
		failureRedirect: '/'
	}));

	// Google Login
	router.get('/google-login', passport.authenticate('google', {
		scope: ['emails', 'profile']
	}));

	// Google Callback
	router.get('/google/callback', passport.authenticate('google', {
		successRedirect: '/auth/profile',
		failureRedirect: '/'
	}));

	// Profile
	router.get('/profile', isLoggedIn, function (req, res) {
		res.render('profile', { title: 'Profile', user: req.user });
	});

	// Logout
	router.get('/logout', function (req, res) {
		req.logout();
		req.flash('message', 'You have been logged out');
		res.redirect('/');
	});

	// Route middleware to make sure user is logged in
	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		}
		res.redirect('/');
	}

	return router;
}