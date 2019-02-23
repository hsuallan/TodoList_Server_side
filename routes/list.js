var express = require('express')
var router = express.Router()
let data = require('./test_data')

/* GET /lists */
router.get('/', function(req, res, next) {
  /*access DB */
  let p=[];
  data.forEach((x)=>{
    p.push({
      Topic : x.Topic,
      id : x.id
    })
  })
  return res.status(200).json(JSON.stringify(p))
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
/*GET /lists/id */
router.get('/:id',function(req,res,next){
  const qid = req.params.id;
  console.log(qid);
  /*access DB */
  const ans = data.find((x)=>{
    return x.id == qid;
  })
  if(ans === undefined){
    return res.status(404).json({
      err:"no find"
    })
  }
  return res.status(200).json(JSON.stringify(ans))
})
/*DELETE /list/id */
router.delete('/:id',function (req,res,next) {
  const qid = req.params.id
  /* access DB */
  const pos = data.findIndex((x)=>{
    return x.id == qid;
  })
  if(pos == -1){
    return res.status(404).json({
      err:'not found'
    })
  }
  data.splice(pos,1)

  console.log(data)
  return res.status(200).json({
    msg:'successful delete'
  })
})
/*put /list/id */
router.put('/:id',function (req,res,next){
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
  const pos = data.findIndex(x=>{
    return x.id ==req.params.id;
  })
  if(pos ==-1 ){
    return res.status(404).json({
      err:'not found'
    })
  }
  data[pos] = {
      Topic:req.body.Topic,
      Date:req.body.Date,
      Content:req.body.Content,
      State:req.body.State,
      id:'0003',
    }
  return res.status(200).json({
    msg:'Success put'
  })
})
router.patch('/:id',function (req,res,next) {
  //access DB
  const pos = data.findIndex(x=>{
    return x.id ==req.params.id;
  })
  if(pos == -1 ){
    return res.status(404).json({
      err:'not found'
    })
  }
  console.log(data[pos])
  Object.keys(req.body).forEach(key=>{
    data[pos][key] = req.body[key]
  })
  console.log(data[pos])
 return res.status(200).json({
    msg:'successed patch'
 })
})

module.exports = router
