var fs = require('fs');


data = [
    {
	id: 1,
	source: 'data/message.1',
	content:''
    },
    {
	id: 2,
	source: 'data/message.2',
	content: ''
    }
    ,
    {
	id: 3,
	source: 'data/message.3',
	content: ''
    }
    ,
    {
	id: 4,
	source: 'data/message.4',
	content: ''
    }
];
/*
 * GET home page.
 */

create_file_cb = function(idx,res)
{
    return function(err,d){
	data[idx].content =d.toString().replace(/\r/g,"<br/>");

	console.log(data[idx].content);
	if (idx == 3)
	{
	    res.render('admin', {locals: {data: data}});
	}
    }
}

exports.auth = function(req, res){
  res.render('auth',{locales:{retry: req.query.retry}});
};

exports.login = function(req,res) {
  if (req.param('user') === 'admin' && req.param('pass') === 'aixiao') 
  {
      req.session.user='admin';
      res.redirect('/admin');
  }
  else
  {
      req.session.user=null;
      res.redirect('/auth?retry=1');
  }
};

exports.view = function(req,res) {
    if (req.session.user == 'admin')
    {
      for (var i=0;i<data.length;i++)
      {
	  filename = 'data/message.'+(i+1).toString();
	  fs.readFile(filename ,create_file_cb(i,res));
      }
    }
    else
      res.redirect('/');
};

exports.logout = function(req,res){
    req.session.user = null;
    res.redirect('/');
}
