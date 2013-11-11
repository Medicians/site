/*
 * GET home page.
 */

exports.index = function(req, res) {
	res.render('index', {});
};

exports.send_email = function(req, res) {
	var request = require('request');

	var sign_logo = app.get('server_url') + '/images/logo_email.png';

	request.post(app.get('nserver') + '/send_email', {
		form: {
			from: 'info@medicians.org',
			to: 'info@speryans.com',
			subject: 'Contacto Medicians',
			title: 'Contacto',
			name: req.body.name,
			text: '<p>' + req.body.message + '</p><p>Email: ' + req.body.email + '</p>',
			sign_name: 'Medicians.org',
			sign_phone: '',
			sign_logo: sign_logo,
			ics: 0
		}
	});

	res.render('send', {});
};