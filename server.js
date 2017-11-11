const express = require("express");
const passport = require("passport");
const cookieSession = require("cookie-session");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const app = express();
const keys = require("./config/keys");
const mongoose = require("mongoose");
const stripe = require("stripe")(keys.stripeSecretKey);
const bodyParser = require("body-parser");
// const Client = require("./client/src/index.js");
// const {renderToString} = require("react-dom/server");

function authMiddleware(req,res, next) {
    if(!req.user){
        return res.status(401).send({error: 'not authorized'})
    }
    next();
}

function requireCredits(req,res, next) {
    if(req.user.credits < 1){
        return res.status(403).send({error: 'not enought credits'})
    }
    next();
}


app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
}));

app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

const User = require("./models/User");
const Survey = require("./models/Survey");

// const User = mongoose.model('users');

mongoose.connect(keys.mongoURI);

passport.serializeUser((user,done)=>{
    done(null,user.id);
});

passport.deserializeUser((id,done)=>{
    User.findById(id)
    .then(user => {
        done(null,user);
    })
});

passport.use(new GoogleStrategy({
    clientID: keys.googleClientId,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/api/auth/google/callback',
    proxy: true
}, async (accessToken,refreshToken,profile,done) => {
    const existingUser = await User.findOne({googleId: profile.id});
    
    if(!existingUser){
        const user = await new User({googleId: profile.id}).save();
        return done(null, user);
    }
    done(null,existingUser);
}));




app.get(
    "/api/auth/:service", 
    passport.authenticate("google", {
        scope: ['profile','email']
    }),
    function(req,res) {
        
    }
);

app.get(
    "/api/auth/:service/callback", 
    passport.authenticate("google"),
    function(req,res) {
        res.redirect(req.get('referer'))
    }
);

app.get('/api/logout', authMiddleware, (req,res) => {
    req.logout();
    res.end();
});

app.get('/api/current_user', (req,res) => {
    res.json(req.user);
});
 
app.post('/api/stripe', authMiddleware, async (req,res) => {
    const charge = await stripe.charges.create({
        amount: 500,
        currency: 'usd',
        description: '$5 for 5 email credits',
        source: req.body.id
    });
    req.user.credits += 5;
    const user = await req.user.save(); 
    res.send(user);
});

app.post('/api/surveys', authMiddleware, requireCredits, (req,res) => {
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
            return email;
        }),
        _user: req.user.id,
        dateSent: Date.now()
    })
});



if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));

    const path = require('path');

    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    });
}


// process.env.PORT

const PORT = process.env.PORT || 5000;
app.listen(PORT);