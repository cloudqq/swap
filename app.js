
/**
 * Module dependencies.
 */

var express = require('express')
  , MemoryStore = express.session.MemoryStore
  , routes = require('./routes')
  , user = require('./routes/user')
  , my   = require('./routes/my')
  , admin   = require('./routes/admin')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser(''));
  app.use(express.session({
      secret: 'xyazz',
      store: new MemoryStore(),
      key: 'bla'
  }));
  app.use(function(req,res,next){
      res.locals.session = req.session;
      next();
  });
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/'	  , routes.index);
app.get('/index/:id', my.page1);
app.get('/index/:id/edit', my.edit);
app.get('/users'  , user.list);
app.get('/admin'  , admin.view);
app.get('/auth'	  , admin.auth);
app.post('/login' , admin.login);
app.get('/logout' , admin.logout);
app.post('/commit/:id' , my.commit);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
