const express = require('express')
const router = express.Router()
const Post = require('../models/Post')

//Route to Get / Homepage
router.get('', async (req, res) => {
	try {
		const locals = {
			title: 'JF - NodeJs Blog',
			description: 'Simple NodeJs Blog with Express and MongoDB',
		}

		let perPage = 10
		let page = req.query.page || 1

		const data = await Post.aggregate([{ $sort: { createdAt: -1 } }])
			.skip(perPage * page - perPage)
			.limit(perPage)
			.exec()

		const count = await Post.count()
		const nextPage = parseInt(page) + 1
		const hasNextPage = nextPage <= Math.ceil(count / perPage)

		res.render('index', {
			locals,
			data,
			current: page,
			nextPage: hasNextPage ? nextPage : null,
		})
	} catch (error) {
		console.log(error)
	}
})

//Route to Get / Post :id
router.get('/post/:id', async (req, res) => {
	try {
		let slug = req.params.id

		const data = await Post.findById({ _id: slug })

		const locals = {
			title: data.title,
			// description: 'Simple NodeJs Blog with Express and MongoDB',
		}

		res.render('post', { locals, data })
	} catch (error) {
		console.log(error)
	}
})

//Route to POST / Post - searchTerm

router.post('/search', async (req, res) => {
	try {
		const locals = {
			title: 'Search',
			description: 'Simple NodeJs Blog with Express and MongoDB',
		}

		let searchTerm = req.body.searchTerm
		const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, '')

		const data = await Post.find({
			$or: [
				{ title: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
				{ body: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
			],
		})

		res.render('search', { locals, data })
	} catch (error) {
		console.log(error)
	}
})

router.get('/about', (req, res) => {
	res.render('about')
})

router.get('/contact', (req, res) => {
	res.render('contact')
})

module.exports = router

// function insertPostData() {
// 	Post.insertMany([
// 		{
// 			title: 'Building APIs with Node.Js',
// 			body: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
// 		},
// 		{
// 			title: 'Deploying of Node.Js Applications',
// 			body: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
// 		},
// 		{
// 			title: 'Authentication and authentication in Node.Js',
// 			body: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
// 		},
// 		{
// 			title: 'Understanding how to work with MOngoDB and Mongoose',
// 			body: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
// 		},
// 		{
// 			title: 'Building real-time and event-driven applications with Node.Js',
// 			body: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
// 		},
// 	])
// }

// insertPostData()
