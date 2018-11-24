exports.index = function(req, res){
  res.pageInfo = {};
  res.pageInfo.title = 'Welcome to my homepage';
  res.render('home', res.pageInfo);
};
