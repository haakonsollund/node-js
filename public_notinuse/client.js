const container = document.getElementById('container')
var EL_ul = document.querySelector('#task_ul')

function ask(){
    console.log("clicked button")
    const text_field = document.getElementById('text_field')
    const task = text_field.value
    text_field.value = ''
    fetch('/ask', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ task: task })
    })
    
        .then(res => res.json())
        .then(data => {
            if (data.verdier){
                console.log(data.verdier)
                load_task()
                
            } else {
                //console.log(data)
                alert(data.message)
            }
            // må endres til å legge til tasks som blir sendt tilbake fra server
            console.log(data)
        });
    }

function load_task(){
    EL_ul.innerHTML = ''
    fetch('/response')
        .then (res  => res.json()) 
        .then(data => {
            console.log(data.tasks)
            data.tasks.forEach((task,index)  => {
            var li = document.createElement('li')
            li.textContent = task
            console.log(task)
            var btn = document.createElement('button')
            btn.textContent = 'delete'
            btn.onclick = function(){
                deletetask(index)
            }
            li.appendChild(btn)
            EL_ul.appendChild(li)

        });
    }
)}

function deletetask(index){
    fetch(`/delete/${index}`,{
        method: 'DELETE'
    })
    .then(res => res.json())
    .then(data => {
        if(data.sucsess){
            load_task()
        }else {
            alert("not working try again")
        }
    })
}
load_task()