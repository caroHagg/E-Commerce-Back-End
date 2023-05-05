const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // include its associated Product data
  Tag.findAll({
    include:[{model:Product}]
  }).then(dataTag=>{
    if(dataTag.length === 0){
      res.status(404).json({message:"No tags in this database"});
    }
    res.status(200).json(dataTag)
  }).catch(err=>{
    res.status(500).json(err);
  })
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findByPk(req.params.id,{
    include:[{model:Product}]
  }).then(tagData=>{
    if(!tagData){
      res.status(404).json({message:"No tags with that id in database"})
    }
    res.status(200).json(tagData)
  }).catch(err=>{
    res.status(500).json(err)
  })
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
  .then(tagData=>{
    res.status(200).json(tagData);
  }).catch(err =>{
    res.status(500).json(err);
  })
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body,{
    where:{id:req.params.id}
  }).then(tagData =>{
    if(!tagData){
      return res.status(404).json({message:"No Tag with that id has been updated"})
    }
    res.status(200).json(tagData);
  }).catch(err=>{
  res.status(500).json(err);
})

});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where:{
      id:req.params.id, 
    }
  }).then(tagData =>{
    if(!tagData){
      return res.status(404).json({message:'No tag with that id to delete'})
    }
    res.status(200).json(tagData)
  }).catch(err=>{
  res.status(500).json(err);
})
});

module.exports = router;
