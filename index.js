
let taskLi=[];
let l=true;
let currenttk;


const bg =document.querySelector('body');
const button1 = document.querySelector('#addOne');
const button2 = document.querySelector('#addTwo');
const closebtn = document.querySelector('.close');
const closebtn2 = document.querySelector('#closed')
const addBtnOne =document.querySelector('#addBtn1');
const addBtnTwo =document.querySelector('#addBtn2');
const flip =document.getElementById('back2');
const createTodoValue =document.querySelector('#list1');
let noListp =document.querySelector('#nolist');
let body =document.getElementsByTagName('body')

 
body.onload=page();
button1.addEventListener("click",Input);
button2.addEventListener("click",input1);
closebtn.addEventListener("click",a);
closebtn2.addEventListener('click',b);
addBtnOne.addEventListener('click',createTask);
flip.addEventListener('click',goBack);


function Input(){
    var show1=document.querySelector("#pop1");
    bg.style.filter="blur(7px)"
    show1.showModal();
}
function input1(){
    var show2=document.querySelector("#pop1");
    bg.style.filter="blur(7px)"
    show2.showModal();
}
function a(){
    var close1=document.querySelector("#pop1");
    bg.style.filter="none"
    close1.close();
}
function b(){
    var close2=document.querySelector('#pop2');
    bg.style.filter="none"
    close2.close();
}
function page(){ 
    let pg =document.getElementById('topper');
    let pg2 =document.getElementById('topper2');
    if (l){
        pg.style.display="block";
        pg2.style.display="none"
    }else{
        pg.style.display="none";
        pg2.style.display="block"
    }
}
function createTask(m){
    m.preventDefault();
    let usrtemp =createTodoValue.value;
    const task ={
        id:Date.now(),
        name:usrtemp,
        subTask:[]
    }
    taskLi.push(task); 
    showList();
}
function showList(){ 
    var listitem=` `
    taskLi.forEach(element => {
        listitem +=
       ` <div class="flexlist1" id="${element.id}">
        <span class="listnewitem" onclick="callMe(${element.id})">${element.name}</span><hr>
        <ul class="listTodo" id="${'id'+element.id}"></ul>
        <div class="footerlist">
        <i class="fas fa-minus-square fa-2x butn-2" id="cmptd-btn" onclick="deleteTask(${element.id})"></i>
        <i class="fa fa-plus-circle fa-2x" id="addThree" onclick="addTask(${element.id})"></i>
        </div></div> `
    });
    document.querySelector('#list-1').innerHTML=listitem;
    if(taskLi.length!=0){   
        if(taskLi.length<2){noListp.style.display="none";};
    }else if(taskLi==0){
        noListp.style.display="block";
    };
    createList();
}
function deleteTask(id){  
    taskLi.forEach((element,index)=>{
    if(element.id==id){
        taskLi.splice(index,1);
    }
    l=true;page(); 
});
showList();
}

function addTask(id){   
    taskLi.forEach(element=>{
        if(element.id===id){
            var show3=document.querySelector("#pop2");
            bg.style.filter="blur(8px)"
            show3.showModal();
            let addListValue =document.querySelector('#list2');
            addBtnTwo.onclick=()=>{    
            let listVal=addListValue.value;
                taskLi.forEach((element,index)=>{
                    if(element.id===id){
                        const taskin={
                            listId:Date.now(),
                            listName:listVal,
                            set:true
                        }
                        taskLi[index].subTask.push(taskin);
                    }
                });createList();listCall(element.subTask);
            }
        }
    });
}
function createList(){  
    taskLi.forEach(element=>{
    let tasklist = document.getElementById('id'+element.id);
    let newTask='';
    element.subTask.forEach(taskin =>{
        if(taskin.set){
        newTask +=`
        <li>
        <span class="taskName" id="${'tin'+taskin.listId}">${taskin.listName}</span>
        <button id="${'markdn'+taskin.listId}" onclick="makeDone(${taskin.listId})">MarkDone</button>
        </li>`} else{
        newTask+=`<li><span class="taskND" id="${'tin'+taskin.listId}">${taskin.listName}</span>
        </li>`
        }
    })                
    tasklist.innerHTML=newTask;
    });
}
function makeDone(id){
    taskLi.forEach(element => {
        element.subTask.forEach(taskin=>{
            let idIn=document.getElementById('tin'+taskin.listId);
            if (taskin.listId==id){
                idIn.style.textDecoration="line-through";
                idIn.style.color="red";
                document.getElementById('markdn'+taskin.listId).remove();
                taskin.set=false
            }
        });createList();listCall(element.subTask);
    }); 
}
function callMe(id){
    l=false;
    page();
    let currentSelect,currentList;
    taskLi.forEach(element=>{
        if (element.id==id) {
            currentSelect =element;
            currentList =element.subTask;
        }
    });
    let tittle=document.getElementById('title2');
    let tittle2=document.getElementById('title2-1');
    let tittle3=document.getElementById('footer1');
    tittle2.innerText=currentSelect.name;
    tittle.innerText=currentSelect.name;
    console.log(currentSelect);
    console.log(currentList);
    tittle3.innerHTML=`<i class="fas fa-minus-square fa-2x butn-2" id="cmptd-btn" onclick="deleteTask(${currentSelect.id})"></i>
    <i class="fa fa-plus-circle fa-2x" id="addThree" onclick="addTask(${currentSelect.id})"></i>`
    listCall(currentList);
}
function listCall(myfun){
    let newTlist=``;
    let selTag = document.getElementById('new-list');
    myfun.forEach(taskin=>{
        if(taskin.set){
            newTlist+=`
            <li>
            <span class="taskName" id="${'tin'+taskin.listId}">${taskin.listName}</span>
            <button id="${'markdn'+taskin.listId}" onclick="makeDone(${taskin.listId})">MarkDone</button>
            </li>`}else
            {
            newTlist+=`<li><span class="taskND" id="${'tin'+taskin.listId}">${taskin.listName}</span>
            </li>`
        }
        selTag.innerHTML=newTlist;
    })
    showList();
}
function goBack(){ 
    l=true;
    page();
}