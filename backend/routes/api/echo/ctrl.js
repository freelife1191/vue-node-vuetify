const Echo = require('../../../schemas/echo');

String.prototype.replaceAll = function(search, replacement) {
  var target = this;
  return target.replace(new RegExp(search, 'g'), replacement);
};

exports.setMessage = async (req, res, next) => {
  console.log(req.body.msg);
  if(req.body && !req.body.msg){
    return res.status(400).json({message: 'FAIL'});
  }

  try {
    const msg = new Echo({
      msg: req.body.msg
    });
    await msg.save(); //DB에 저장

    return res.json({message: req.body.msg});
  } catch (e) {
    next(e);
  }

};

exports.getMessage = async (req, res, next) => {
  try {
    let echo = await Echo.findOne().sort('createdAt');
    console.log(echo);
    return res.json({message: echo});
  } catch (e) {
    next(e);
  }

};


exports.deleteMessage = async (req, res, next) => {
  try {
    await Echo.remove();
    return res.json({message: 'All Deleted !'});
  } catch (e) {
    next(e);
  }
};


exports.updateMessage = async (req, res, next) => {
  if(req.body && !req.body.id && !req.body.msg){
    return res.status(400).json({message: 'FAIL'});
  }

  try {
    await Echo.update({ _id: req.body.id}, {msg: req.body.msg});

    return res.json({message: req.body.msg});
  } catch (e) {
   next(e);
  }

};
