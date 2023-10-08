const {Router} = require('express')
const Course = require('../models/course')
const router = Router()

// Запрос для просмотра всех курсов
router.get('/', async (req, res) => {

    const courses = await Course.getAll()
    //handlebars - рендерим страницу
    res.render("courses",{
        title: 'courses page',
        isCourses: true,
        courses
    })
})

// Запрос для открытия курся для редактирования (по id)
router.get('/:id/edit', async (req, res) => {
    // если квери параметр allow не true возвращаемся на главную стр курсов
    if (!req.query.allow){
        console.log('EDIT COURSE')
    }

    // Получаем курс через модель
    // Тоесть нам в запросе приходит ид курса который мы проганяем через модель курса
    // и на выходе получаем объект курса со всеми значениями
    const course = await Course.getById(req.params.id)

    // переходим на стр (рендерим)
    res.render("course-edit",{
        title: `Редактировать ${course.title}`,
        course
    })
})

// Запрос для сохранения отредактированного курса (по id)
router.post('/edit', async (req, res) => {
    console.log("Serhii ----------------------")
    console.log(req.body)
    // обращаемся к модели курса к его методу update и передаем все данные нового курса
   await Course.update(req.body)
    // когда будет все сделано, делаем редирек на страницу курсов
    res.redirect("/courses")
})

router.po


// Запрос для просмотра одного курса (по id)
// обрабатываем get запрос с id
// layout: "empty" - задаем свой лейаут для страницы
router.get('/:id', async (req, res) => {

    // Получаем курс через модель
    // Тоесть нам в запросе приходит ид курса который мы проганяем через модель курса
    // и на выходе получаем объект курса со всеми значениями
    const course = await Course.getById(req.params.id)

    res.render("course",{
        layout: "empty",
        title: `Курс ${course.title}`,
        course
    })
})

module.exports = router