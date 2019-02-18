var express = require('express')
var router = express.Router()
let data = require('./test_data')

/* GET /lists */
router.get('/', function(req, res, next) {
  /*access DB */
  let p=[];
  data.forEach((x)=>{
    p.push(x.Topic)
  })
  return res.status(200).json({
    Todoitem:p
  })
})

/*Post /lists  req : Date,Content,Topic,State */
router.post('/',function(req,res,next){
  if(req.body.Date === undefined){
    return res.status(400).json({
      err:'Date lose'
    })
  }
  if(req.body.Content === undefined){
    return res.status(400).json({
      err:'Content lose'
    })
  }
  if(req.body.Topic === undefined){
    return res.status(400).json({
      err:'Topic lose'
    })
  }
  if(req.body.State === undefined){
    return res.status(400).json({
      err:'State lose'
    })
  }
  /*access DB */
  data.push(
    {
      Topic:req.body.Topic,
      Date:req.body.Date,
      Content:req.body.Content,
      State:req.body.State,
      id:'0003',
    }
  )
  data.forEach(x=>console.log(x))
  return res.status(201).json({
    msg:'created'
  })
  
})

module.exports = router;
