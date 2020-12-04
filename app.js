const express = require ('express');
const app = express();
const expressLayouts =  require ('express-ejs-layouts');
const mongoose = require ('mongoose')
const flash = require('connect-flash')
const session = require ('express-session')
const passport = require ('passport');

//PASSPORT CONFIG

require('./config/passport')(passport);

//DB Config

const db = require('./config/keys').MongoURI

//Connect to Mongo
mongoose.connect(db, { useNewUrlParser:true, useUnifiedTopology:true })
.then(() => console.log('MongoDB is connected...'))
.catch(err => console.log(err));


//MIDDLEWARE EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

//MIDDLEWARE EXPRESS SESSION
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
}))

//PASSPORT MIDDLEWARE
app.use(passport.initialize());
app.use(passport.session());

//CONNECT FLASH
app.use(flash())

//GLOBAL VARS
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')

    next();
})

//BodyParser på dennne måde kan jeg modtage informationen som brugeren skriver i felterne på hjemmesiden
app.use(express.urlencoded({ extended: false}))



//ROUTES
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

const PORT = process.env.PORT || 7000;
app.listen(PORT, console.log(`server is listening on port ${PORT}`));
