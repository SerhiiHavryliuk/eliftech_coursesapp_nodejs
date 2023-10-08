const {Router} = require('express')
const Course = require('../models/course') // подключаем модель для добавления курса
const router = Router()

router.get('/', (req, res) => {
    res.render("add", {
        title: "Add new course page",
        isAdd: true
    })
})

router.post('/', async (req, res) => {
    console.log(req.body)

    // Создаем объект нового курса
    //переменна в которая будет результатом конструктора new Course
    // и в констрктор передаем тезначения которые пришли из формы
   const course = new Course(req.body.title, req.body.price, req.body.img)

    console.log("Serhii", req.body)

    console.group()
    console.log("title", req.body.title)
    console.log("price", req.body.price)
    console.log("img", req.body.img)
    console.groupEnd()

    // course.save(); // сохраняем курс в файл json
    await course.save()

    res.redirect('courses')
})

module.exports = router