// const uuid = require('uuid/v4') // подкл библ для генерации ид
const { v4: uuidv4 } = require('uuid');
const fs = require('fs')
const path = require('path')

class Course {
    constructor(title, price, img) {
        this.title = title
        this.price = price
        this.img = img
        this.id = uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
    }

    // преобразовываем данные в JSON
    toJSON() {
        return {
            title: this.title,
            price: this.price,
            img: this.img,
            id: this.id
        }
    }

    // метод который будет сохранять данные в файл
    // так как Course.getAll() возвращает промис то функция должна быть асинхронной asynk (+ await)
    async save() {
        const courses = await Course.getAll() // считывае данные с с файда json

        courses.push(this.toJSON()) // добавляем данные в массив
        console.log("Courses", courses)

        return new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, '..', 'data', 'courses.json'),
                JSON.stringify(courses), // данные которые мы записываем в файл нужно преобразовать с json в строку
                (err) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve()
                    }
                }
            )
        })
    }

    // получаем данные с файла courses.json
    static getAll() {
        // обязательно через промис, ожидаем что считаем файл
        return new Promise((resolve, reject) => {
            fs.readFile(
                path.join(__dirname, '..', 'data', 'courses.json'),
                'utf-8',
                (err, content) => {
                    if (err) {
                        reject(err)
                    } else {
                        // resolve -  это успех
                        // получаем данные в виде строки поэтому нужно ее распарсить
                        resolve(JSON.parse(content))
                    }

                }
            )
        })

    }

    static async getById(id) {
        // получаем массив всех курсов
        const courses = await Course.getAll()
        return courses.find(c => c.id === id)
    }

    // обновление курса
    static async update(course) {
        // получаем массив всех курсов
        const courses = await Course.getAll()

        // находим индех в массиве того курса что нужно изменить
        const idx = courses.findIndex(c => c.id === course.id)

        console.log("course.id", course.id)
        console.log("idx",idx)

        // делаем замену в массиве ввсех курсов за индексом заменяем курс
        courses[idx] = course
        console.log('courses[idx]', courses[idx])

        // далеее нам нужно его сохранить (записываем в файл)
        // обязательно через промис, ожидаем что считаем файл
        return new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, '..', 'data', 'courses.json'),
                JSON.stringify(courses), // данные которые мы записываем в файл нужно преобразовать с json в строку
                (err) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve()
                    }
                }
            )
        })

    }

}

module.exports = Course
