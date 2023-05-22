const express = require('express')
const router = express.Router()
const Post = require('../models/Post')

const adminLayout = '../views/layouts/admin'

//Route to Get / Post :id
router.get('/admin', async (req, res) => {
	try {
		const locals = {
			title: 'Admin',
			// description: 'Simple NodeJs Blog with Express and MongoDB',
		}

		res.render('admin/index', { locals, layout: adminLayout })
	} catch (error) {
		console.log(error)
	}
})

module.exports = router
