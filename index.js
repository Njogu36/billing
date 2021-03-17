//  LIBRARIES 
const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');
const cp = require('cookie-parser');
const MongoStore = require('connect-mongo')(session);
const db_url = require('./config/database')
var cors = require('cors');


require('dotenv').config();
require('./config/passport')(passport);

const app = express();
const PORT  = process.env.PORT
app.use(cors({origin: '*'}));

// BODY PARSER
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

// STATIC FILES
app.use(express.static('public'));
app.use(express.static('uploads'));

// MONGODB CONNECTION
mongoose.connect(db_url.uri)
const db = mongoose.connection;
db.on('connected',()=>{
    console.log('DB IS CONNECTED')
})
db.once('error',(err)=>{
    console.log(err)
})

// VIEWS - JADE
app.set('view engine', 'jade');
app.set('/views', './views');

// CONNECT FLASH
app.use(require('connect-flash')());
app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});

// COOKIES
app.use(cp());

// SESSION
app.use(session({
    secret: 'Tier Data Limited Company Billing Management System',
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

// PASSPORT
app.use(passport.initialize());
app.use(passport.session());

// ROUTES
const api = require('./routes/api')
const administrator = require('./routes/administrator')
const company = require('./routes/company')
const custom = require('./routes/custom')
const authentication = require('./routes/authentication')



app.use('/',authentication)
app.use('/v1/api',api)
app.use('/administrator',administrator)
app.use('/company',company)
app.use('/custom',custom)


app.listen(PORT,(err)=>{
    if(err)
    {
        console.log(err)
    }
    else
    {
        console.log('APPLICATION RUNNING ON PORT '+PORT)
    }
})



