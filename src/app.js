const path = require('path')
const express = require('express')
const hbs = require('hbs')
const backend = require('./backend')
const request = require('request')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app = express()
const port = process.env.PORT || 3000

//Define Path
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
//Setup hbs
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory
app.use(express.static(publicDir))

app.get('', (req,res) => {
    res.render('index', {
        title: 'Leave & Attendance',
        name: 'Aman Jain'
    })
})
app.get('/absentDays/', (req,res) => {
    var countDays = backend.absentDays
    res.render('absentDays', {
        title: 'Absent Days',
        name: 'Aman Jain',
        absentDays: countDays
    })
})
app.get('/absentDetails/', (req,res) => {
    res.render('absentDetails', {
        title: 'Absent Details',
        name: 'Aman Jain',
        absentDetails: backend.absentDetails
    })
})

app.get('/leaveBalance/', (req,res) => {
    var CL = backend.leaveBalance[0]
    var OL = backend.leaveBalance[1]
    var PL = backend.leaveBalance[2]
    var endDate = '31/12/2021'
    res.render('leaveBalance', {
        title: 'Leave Balance',
        name: 'Aman Jain',
        totalCL: CL,
        optional: OL,
        specialPL: PL,
        endDate: endDate
    })
})

app.get('/holidayCalender/', (req,res) => {
    res.render('holidayCalender', {
        title: 'Holiday Calender',
        name: 'Aman Jain',
        holidayCal: backend.holidayCalender
    })
})

app.get('*', (req,res) => {
    res.render('404page', {
        title: '404 Page',
        name: 'Aman Jain',
        errormsg:  'Page Not Found.'
    })
})
app.listen(port, () => {
    console.log('Our server is live on ' + port + '.')
})