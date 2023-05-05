const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  Category.findAll({
      // associated Products
      include: [{model:Product}]
    }).then(categoryData =>{
      res.status(200).json(categoryData);
    }).catch(err =>{
    res.status(500).json(err);
  })
});
// find one category by its `id` value
  //include its associated Products
router.get('/:id', (req, res) => {
  Category.findByPk(req.params.id,{
      include:[{model:Product}]
    }).then(categoryData =>{
      if(!categoryData){
      res.status(404).json({message:'No category found with this id'});
      }
      res.status(200).json(categoryData);
    }).catch(err =>{
    res.status(500).json(err);
  })  
});

// create a new category
router.post('/',  (req, res) => {
  Category.create(req.body)
  .then(categoryData =>{
    res.status(200).json(categoryData);
  }).catch(err =>{
    res.status(500).json(err);
  })
});

// update a category by its `id` value
router.put('/:id', (req, res) => {
  Category.update(req.body,{
      where:{id:req.params.id}
    }).then(categoryData =>{
      if(!categoryData[0]){
        return res.status(404).json({message:"No category with that id has been updated"})
      }
      res.status(200).json(categoryData);
    }).catch(err=>{
    res.status(500).json(err);
  })
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
      where:{
        id:req.params.id, 
      }
    }).then(categoryData =>{
      if(!categoryData){
        return res.status(404).json({message:'No category with that id to delete'})
      }
      res.status(200).json(categoryData)
    }).catch(err=>{
    res.status(500).json(err);
  })
});

module.exports = router;
