const router = require('express').Router();
const { Category, Product } = require('../../models');


router.get('/', (req, res) => {

  try{
    const newCategoryData = await Category.findAll({
      
          include: [{model: Product, as: 'category_product'}]
        });
    res.status(200).json(newCategoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
  
  try {
    const newCategoryData = await Category.findByPk(req.params.id, {
  
      include: [{model: Product, as: 'category_product'}]
    });
    if (!newCategoryData){
      res.status(404).json({ message: 'No ID was found'});
      return;
    }
    res.status(200).json(newCategoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  
  try {
    const newCategoryData = await Category.create(req.body);
    res.status(200).json(newCategoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id',async (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id',async (req, res) => {
  // delete a category by its `id` value
  try {
    const newCategoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!newCategoryData){
      res.status(404).json({ message: 'No ID was found' });
      return;
    }

    res.status(200).json(newCategoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;