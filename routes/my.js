var fs = require('fs');
/*
 * GET users listing.
 */

exports.page1 = function(req, res){

  if (req.params.id >0 && req.params.id <=4)
    {
	filename = 'data/message.' + req.params.id.toString();
	console.log(filename);
	fs.readFile(filename, function(err,data){
	    res.send(data.toString().replace(/\r/g,"<br/>"));
	});
    }
    else
    {
	res.send(404,"not found");
    }
//  res.send("respond with a resource"+ req.params.id);
};

exports.edit = function(req,res){
    if (req.session.user != "admin")
    {
	res.redirect("/");
	return;
    }

    if (req.params.id > 0 && req.params.id <=4)
    {
	filename = "data/message."+req.params.id.toString();
	fs.readFile(filename, function(err,data){
	    console.log(data.toString());
	    message = data.toString();
	    id = req.params.id.toString();
	    res.render("edit", {locales:{message: message, id:id}});
	});
    }
    else
    {
	res.send(404,"not found");
    }
    
}

exports.page2 = function(req,res){
  res.send("respond with b resource");
};

exports.commit = function(req,res){
    if (req.session.user != "admin")
    {
	res.redirect('/');
	return;
    }
    if (req.params.id >0 && req.params.id <=4)
    {
	if (req.body.input_box != undefined)
	{
	    filename = "data/message." + req.params.id.toString();
	    fs.writeFile(filename, req.body.input_box, function (err) {
		if (err) throw err;
		console.log('It\'s saved!');
		
		res.redirect('/admin');
	    });
	}
    }
    else
    {
	res.send(404,'not found');
    }
}
