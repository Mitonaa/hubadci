var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var livereload = require('livereload');
var bodyParser = require('body-parser');
const multer = require('multer')
const csv = require('fast-csv');

var flash   = require('express-flash');
var session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var underConstructionRouter = require('./routes/index');
var akunKepsekRouter = require('./routes/index');
var daftarTenagaKependidikanRouter = require('./routes/index');
var daftarGuruRouter = require('./routes/index');
var daftarPesertaDidikRouter = require('./routes/index');
var daftarWaliRouter = require('./routes/index');
var daftarYayasanRouter = require('./routes/index');
var tambahPenggunaRouter = require('./routes/index');
var dashboardTURouter = require('./routes/index');
var simpanPenggunaRouter = require('./routes/index');
var unggahPenggunaRouter = require('./routes/index');
/*var TUdaftarTKRouter = require('./routes/tataUsaha');
var TUdaftarGuruRouter = require('./routes/tataUsaha');
var TUdaftarSiswaRouter = require('./routes/tataUsaha');
var TUdaftarWaliRouter = require('./routes/tataUsaha');*/

var connectLiveReload = require('connect-livereload');

//Livereload code
const liveReloadServer = livereload.createServer();
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});
//End of livereload code



// set body parser
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({extended:false});
//End set body-Parser

var app = express();

//use flash
app.use(flash())

//use session
app.use(session({ 
  cookie: { 
    maxAge: 60000 
  },
  store: new session.MemoryStore,
  saveUninitialized: true,
  resave: 'true',
  secret: 'secret'
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(connectLiveReload());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Pengalamatan
app.use('/', indexRouter);
app.use('/underConstruction', underConstructionRouter);
app.use('/akunKepsek', akunKepsekRouter);
app.use('/daftarTenagaKependidikan', daftarTenagaKependidikanRouter);
app.use('/daftarGuru', daftarGuruRouter);
app.use('/daftarPesertaDidik', daftarPesertaDidikRouter);
app.use('/daftarWali', daftarWaliRouter);
app.use('/daftarYayasan', daftarYayasanRouter);
app.use('/tambahPengguna', tambahPenggunaRouter);
app.use('/simpanPengguna', simpanPenggunaRouter);
app.use('/unggahPengguna', unggahPenggunaRouter);
app.use('/dashboardTU', dashboardTURouter);
/*app.use('/TUdaftarTK', TUdaftarTKRouter);
app.use('/TUdaftarGuru', TUdaftarGuruRouter);
app.use('/TUdaftarSiswa', TUdaftarSiswaRouter);
app.use('/TUdaftarWali', TUdaftarWaliRouter);*/
app.use('/users', usersRouter);
app.use('/login', loginRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;