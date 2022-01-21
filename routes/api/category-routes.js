const router = require('express').Router();
const { Category, Product } = require('../../models');

router.get('/', async (req, res) => {
	try {
		const newCategoryData = await Category.findAll({
			include: [{ model: Product, as: 'category_product' }],
		});
		res.status(200).json(newCategoryData);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get('/:id', async (req, res) => {
	try {
		const newCategoryData = await Category.findByPk(req.params.id, {
			include: [{ model: Product, as: 'category_product' }],
		});
		if (!newCategoryData) {
			res.status(404).json({ message: 'Nothing was found with this ID' });
			return;
		}
		res.status(200).json(newCategoryData);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.post('/', async (req, res) => {
	try {
		const newCategoryData = await Category.create(req.body);
		res.status(200).json(newCategoryData);
	} catch (err) {
		res.status(400).json(err);
	}
});

router.put('/:id', async (req, res) => {
	try {
		const updateCategory = await Category.findByPk(req.params.id);
		res.status(200).json(updateCategory);
	} catch (error) {res.status(500).json(error)}
});

router.delete('/:id', async (req, res) => {
	try {
		const deleteCategory = await Category.destroy({
			where: {
				id: req.params.id,
			},
		});

		if (!deleteCategory) {
			res.status(404).json({ message: 'No ID was found' });
			return;
		}

		res.status(200).json(deleteCategory);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
