const {MONGO_URI,GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET,COOKIE_KEY,STRIPE_PUB_KEY,STRIPE_SECRET_KEY, SEND_GRID_KEY, REDIRECT_DOMAIN} = process.env;

module.exports = {
    mongoURI: MONGO_URI,
    googleClientId: GOOGLE_CLIENT_ID,
    googleClientSecret: GOOGLE_CLIENT_SECRET,
    cookieKey: COOKIE_KEY,
    stripePubKey: STRIPE_PUB_KEY,
    stripeSecretKey: STRIPE_SECRET_KEY,
    sendGridKey: SEND_GRID_KEY,
    redirectDomain: REDIRECT_DOMAIN
};