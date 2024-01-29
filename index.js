let table1 = document.createElement('table')
table1.className = 'table'

let table1Row = table1.insertRow()
table1Row.style.fontWeight = 'bold'
table1Row.insertCell(0).innerHTML = "Todo Name"
table1Row.insertCell(1).innerHTML = "Description"
table1Row.insertCell(2).innerHTML = "Action"

var todoRemaining = document.getElementsByClassName('todoRemaining')[0]
todoRemaining.appendChild(table1)


let table2 = document.createElement('table')
table2.className = 'table'

let table2Row = table2.insertRow()
table2Row.style.fontWeight = 'bold'
table2Row.insertCell(0).innerHTML = "Todo Name"
table2Row.insertCell(1).innerHTML = "Description"

var todoDone = document.getElementsByClassName('todoDone')[0]
todoDone.appendChild(table2)


function handleAddItem() {
    let todoName = document.getElementById('todoname').value
    let description = document.getElementById('description').value

    const tables = document.querySelectorAll('table')


    var todo = {
        todoname: todoName,
        description: description
    }

    axios.post("https://crudcrud.com/api/74ebbc2ad2744a2bb5d40ef1296cdeb8/todo", todo)
        .then(() => {
            console.log('todo submitted successfully')
            axios.get("https://crudcrud.com/api/74ebbc2ad2744a2bb5d40ef1296cdeb8/todo")
                .then((res) => {

                    while (tables[0].rows.length > 0) {
                        tables[0].deleteRow(0);
                    }

                    res.data.map((item) => {
                        var newRow = tables[0].insertRow()
                        newRow.insertCell(0).innerHTML = item.todoname
                        newRow.insertCell(1).innerHTML = item.description
                        newRow.insertCell(2).innerHTML = `<button id=${item._id} class="btn btn-primary" onClick="handleDone(event)">✓</button> <button id=${item._id} onClick="handleDelete()" class="btn btn-danger ">X</button>`
                    })
                })
                .catch((e) => {
                    console.log('something went wrong', e)
                })
        })
        .catch((e) => {
            console.log('todo not submitted', e)
        })

    document.getElementById('todoname').value = ''
    document.getElementById('description').value = ''
}

function handleDone() {
    var elementToRemove = event.target.parentElement.parentElement
    let tableDone = document.querySelectorAll('table')[1]

    axios.get(`https://crudcrud.com/api/74ebbc2ad2744a2bb5d40ef1296cdeb8/todo/${event.target.id}`)
        .then((res) => {
            var todo = {
                todoname: res.data.todoname,
                description: res.data.description
            }
            axios.post("https://crudcrud.com/api/74ebbc2ad2744a2bb5d40ef1296cdeb8/doneTodo", todo)
                .then(() => {
                    console.log('todo Done list successfully')
                    axios.get("https://crudcrud.com/api/74ebbc2ad2744a2bb5d40ef1296cdeb8/donetodo")
                        .then((res) => {

                            while (tableDone.rows.length > 0) {
                                tableDone.deleteRow(0);
                            }

                            res.data.map((item) => {
                                var newRow = tableDone.insertRow()
                                newRow.insertCell(0).innerHTML = item.todoname
                                newRow.insertCell(1).innerHTML = item.description
                            })
                        })
                        .catch((e) => {
                            console.log('something went wrong', e)
                        })
                })
                .catch((e) => {
                    console.log('todo not submitted', e)
                })

        })
        .catch((e) => {
            console.log('e', e);
        })

    axios.delete(`https://crudcrud.com/api/74ebbc2ad2744a2bb5d40ef1296cdeb8/todo/${event.target.id}`)
        .then(() => console.log('deleted'))
        .catch((e) => console.log(e))

    elementToRemove.remove()
}

function handleDelete() {
    var id = event.target.id
    var elementToRemove = event.target.parentElement.parentElement
    elementToRemove.remove()


    axios.delete(`https://crudcrud.com/api/74ebbc2ad2744a2bb5d40ef1296cdeb8/todo/${id}`)
        .then(() => {
            console.log('todo successfully delete')
        })
        .catch((e) => {
            console.log('todo not deleted failed!', e);
        })
}


document.addEventListener("DOMContentLoaded", function () {
    var tables = document.querySelectorAll('table')
    axios.get("https://crudcrud.com/api/74ebbc2ad2744a2bb5d40ef1296cdeb8/todo")
        .then((res) => {
            res.data.map((item) => {
                var newRow = tables[0].insertRow()
                newRow.insertCell(0).innerHTML = item.todoname
                newRow.insertCell(1).innerHTML = item.description
                newRow.insertCell(2).innerHTML = `<button id=${item._id} class="btn btn-primary" onClick="handleDone(event)">✓</button> <button id=${item._id} onClick="handleDelete()" class="btn btn-danger ">X</button>`
            })
        })
        .catch((e) => {
            console.log('something went wrong', e)
        })

    axios.get("https://crudcrud.com/api/74ebbc2ad2744a2bb5d40ef1296cdeb8/doneTodo")
        .then((res) => {
            res.data.map((item) => {
                var newRow = tables[1].insertRow()
                newRow.insertCell(0).innerHTML = item.todoname
                newRow.insertCell(1).innerHTML = item.description
            })
        })
        .catch((e) => {
            console.log('something went wrong', e)
        })
})