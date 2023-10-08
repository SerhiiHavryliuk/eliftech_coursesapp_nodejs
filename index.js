const express = require('express')
const path = require('path')
// https://www.npmjs.com/package/express-handlebars
const exphbs = require("express-handlebars"); // для динамического генерирования html страниц

// добавление роутов
const homeRoutes = require('./routes/home')
const coursesRoutes = require('./routes/courses')
const addRoutes = require('./routes/add')

const app = express()

//handlebars - создаем объект для конфигурирования
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

//handlebars - регистрируем данный модуль как движок для рендеринга html страниц
app.engine('hbs', hbs.engine)// регистрация в экспресе что вообще есть такой движок с названием hbs и в hbs.engine передаем его значения
app.set('view engine', 'hbs') // начинаем использовать модуль
app.set('views', 'views') // указываем папку где будут хранится все наши шаблоны (второй views)


const PORT = process.env.PORT || 3000 // устанавливаем порт

// регистрируем что папка public статичная  публичная
// app.use - позволяет добавлять дополнительную функциональность
// когда мы сделали папку статической то по умолчанию нода будет идти в эту папку и искать файлы для загрузки
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))// чтобы данные появлялись в консоле

// добавление роутов, обработка роутов из папки routs. Туда вынесена вся логика
app.use('/',homeRoutes)
app.use('/courses',coursesRoutes)
app.use('/add', addRoutes)








// запускаем сервер и слушаем соединения на порте 3000.
app.listen(PORT, () => {
    console.log(`Example app listening on PORT ${PORT}`)
})


//------------------------------------------------------------------------------------
// старая версия обработки роутов
//------------------------------------------------------------------------------------
//
// // обработчик события
// // обрабатываем GET запрос (обрабатываем корневой роут)
// app.get('/', (req, res) => {
//     // устанавливаем статус код
//     res.status(200)
//
//     // в ответ отправляем страницу home.hbs
//     // res.sendfile(path.join(__dirname,'views','home.hbs'))
//
//     // res.send('Hello World! Hello Serhii! bls')
//
//     // handlebars - рендерим страницу
//     // isIndex: true - для подсветки активной вкладки в навбар
//     res.render("home", {
//         title: "Home page",
//         isIndex: true
//     })
// })
//
// app.get('/courses', (req, res) => {
//     res.status(200)
//     // res.sendfile(path.join(__dirname,'views','about.hbs'))
//
//     //handlebars - рендерим страницу
//     res.render("courses",{
//         title: 'courses page',
//         isCourses: true
//     })
// })
//
// app.get('/add', (req, res) => {
//     res.render("add", {
//         title: "Add new course page",
//         isAdd: true
//     })
// })