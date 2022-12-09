var todoApp= (function(){
        var tasks=[];
        const taskList=document.getElementById('list');
        const addTaskInput=document.getElementById('add');
        const taskCount=document.getElementById('tasks-counter');

        async function fecthTodos(){
            //GET Request
            // fetch('https://jsonplaceholder.typicode.com/todos')
            // .then(function(response){
            //     console.log(response);
            //     return response.json()
            // }).then(function(data) {
            //     tasks = data.slice(0 , 10);
            //     renderList();
            // })
            // .catch(function(error){
            //     console.log('error',error);
            // })

            try {
                const response =await fetch('https://jsonplaceholder.typicode.com/todos');
                const data=await response.json();
                tasks = data.slice(0 , 10);
                renderList();
            } catch (error) {
                console.log(error);
            }
            

        }

        function addTask(task){
            if(task){

                // fetch('https://jsonplaceholder.typicode.com/todos', {
                //     method: 'POST', // or 'PUT'
                //     headers: {
                //         'Content-Type': 'application/json',
                //     },
                // body: JSON.stringify(task),
                // })
                // .then(function(response){
                //     return response.json();
                // } )
                // .then(function(data)  {
                //     asks.push(task);
                //     renderList();
                //     showNotification("Task added SuccessFully");
            
                // })
                // .catch(function(error)  {
                //     console.log('error',error);
                // })

                tasks.push(task);
                renderList();
                showNotification("Task added SuccessFully");
                return ;
            }
            
            showNotification("Taskis not added SuccessFully! Please try again");
        }

        function addTaskToDOM(taskIndex){
            const li= document.createElement('li');

            li.innerHTML=`
            <input type="checkbox" id="${taskIndex.id}" ${taskIndex.completed ? 'checked' :''} class="custom-checkbox">
            <label for="${taskIndex.id}">${taskIndex.title}</label>
            <img src="delete.png" class="delete" data-id="${taskIndex.id}" />
        `;


        taskList.append(li);
        }


        function renderList(){
            taskList.innerHTML='';
            for(let i=0;i<tasks.length;i++){
                addTaskToDOM(tasks[i]);
            }

            taskCount.innerHTML=tasks.length;
        }





        function toggleTask(taskId){

            const task = tasks.filter(function(taskValue){
            return taskValue.id===Number(taskId);
                    
            });

            if(task.length>0){
                const currenrTask=task[0];

                currenrTask.completed = !currenrTask.completed;
                renderList();
                showNotification("Task Toggeled Successfully!");
                return;
            }

        
            showNotification("Could not toggle");
        }

        function showNotification(task){
            alert(task);
        }





        function handleClickListener(e){
            const target=e.target;
        
            if(target.className==='delete'){
                let taskId=target.dataset.id;
                deleteTask(taskId);
                return;
            }else if(target.className ==='custom-checkbox'){
                let taskId=target.id;
                toggleTask(taskId);
                return;
            }
        }

        function deleteTask(taskId){

            var newTasks=tasks.filter(function(task){
                return task.id !==Number(taskId);
            });

            tasks=newTasks;
            renderList();
            showNotification("Task Deleted Successfully!");
        }

        function handleKeypressEvent(e){
            if(e.key==="Enter"){
                const text=e.target.value;

                if(!text){
                    showNotification("Plsease add task first!");
                    return;
                }

                const textAdd={
                    title:text,
                    id:Date.now(),
                    completed:false
                }
                e.target.value='';
                addTask(textAdd);

            }
        }

        function initializeApp(){
            fecthTodos();
            addTaskInput.addEventListener('keyup',handleKeypressEvent);
            document.addEventListener('click',handleClickListener);
        }

        initializeApp();
        return {
            initialize:initializeApp,
            a:a
        }
})();


