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

    var newRow = tables[0].insertRow()


    newRow.insertCell(0).innerHTML = todoName
    newRow.insertCell(1).innerHTML = description
    newRow.insertCell(2).innerHTML = `<button class="btn btn-primary" onClick="handleDone(event)">✓</button> <button onClick="handleDelete()" class="btn btn-danger ">X</button>`

    var todo = {
        todoname:todoName,
        description:description
    }

    axios.post("https://crudcrud.com/api/ce29ece0a2314de991e22b1cce600613/todo",todo)
        .then(()=>{
            console.log('todo submitted successfully')
        })
        .catch((e)=>{
            console.log('todo not submitted',e)
        })
}

function handleDone(){
    console.log(event.target)
}

function handleDelete(){

}