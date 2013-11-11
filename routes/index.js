var _ = require('underscore');

// notifications.medicians.org

/*
 * GET home page.
 */

exports.index = function(req, res) {
	res.render('index', {});
};

exports.send_email = function(req, res) {
	var email = require('../helpers/email');

	email.send_email(req.body);

	res.json({
		result: true
	});
};
