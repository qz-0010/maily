const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');

class Mailer extends helper.Mail {
	constructor({subject,recipients},content){
		super();

		this.sgApi = sendgrid(keys.sendGridKey);
		this.from_email = new helper.Email('no-reply@emaily.com');
		this.subject = subject;
		this.body = new helper.Content('text/html',content);
		this.recipients = this.formatAddresses(recipients);

		this.addContent(this.body);
		this.addClickTracking();
		// this.addRecipients();
	}

	formatAddresses(recipients){
		const personalize = new helper.Personalization();

		recipients.map(({email}) => {
			var eemail = new helper.Email(email);
			personalize.addTo(eemail);
			return eemail;
		});
		this.addPersonalization(personalize);
	}

	addClickTracking(){
		const trackingSettings = new helper.TrackingSettings();
		const clickTracking = new helper.ClickTracking(true,true);

		trackingSettings.setClickTracking(clickTracking);
		this.addTrackingSettings(trackingSettings);
	}

	addRecipients(){
		const personalize = new helper.Personalization();

		this.recipients.forEach(rec => {
			personalize.addTo(rec);
		});

		this.addPersonalization(personalize);
	}

	async send(){
		const req = this.sgApi.emptyRequest({
			method: 'POST',
			path: '/v3/mail/send',
			body: this.toJSON()
		});
		
		const res = await this.sgApi.API(req);
		return res;
	}
}

module.exports = Mailer;