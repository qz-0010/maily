const Mailer = require("./Mailer");
const surveyTemplate = require("../templates/email/surveyTemplate");
const Survey = require("../models/Survey");
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");


module.exports = (app) => {
    app.post('/api/surveys', requireLogin, requireCredits, async (req,res) => {
        const {title,subject,body,recipients} = req.body;

        const survey = new Survey({
            title,
            subject,
            body,
            recipients: recipients.split(',').map((email,i) => {
                var re = /\S+@\S+\.\S+/;
                if(!re.test(email)){
                    res.status(403).send({error: 'not valid email', index: i});
                    // break;
                }
                return { email: email.trim() };
            }),
            _user: req.user.id,
            dateSent: Date.now()
        });

        const mailer = new Mailer(survey,surveyTemplate(survey));

        try{
            await mailer.send();
            await survey.save();
            req.user.credits-=1;
            const user = await req.user.save();
            res.send(user);
        } catch(err){
            res.send(422).send(err);
        }
        
    });
}
