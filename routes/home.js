const {Router} = require('express')
const router = Router()

// обработчик события
// обрабатываем GET запрос (обрабатываем корневой роут)
router.get('/', (req, res) => {
    res.render("home", {
        title: "Home page",
        isIndex: true
    })
})

module.exports = router