const Mock = require('mockjs')
    // var data = Mock.mock({ 'username|5': '*' })
var data = Mock.mock(['username', '@cname()'])
console.log(data)