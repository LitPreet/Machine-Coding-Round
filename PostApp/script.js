const input = document.querySelector('#input');
const msg = document.querySelector('#msg');
const btn = document.querySelector('#btn');
const posts = document.querySelector('#posts');
const form = document.querySelector('#form');


//show error function
function showError(msgs) 
{
    msg.classList.remove('hidden')
    msg.classList.add('show')
    msg.innerText = msgs;

}

//create post
const createPost = (data) => {
    posts.innerHTML += `
    <div class="pos-div">
    <p>${data.text}</p>
    <span class="options">
    <i class="fas fa-edit" onClick="editPost(this)"></i>
    <i class="fas fa-trash-alt" onclick="deletePost(this)"></i>
    </span>
  </div>
    ` 
       input.value = '';
}

//accept data
const acceptData = () =>{
    let data = {};
    data['text'] = input.value;
    createPost(data);
   
}

//delete post
const deletePost = (e) => {
e.parentElement.parentElement.remove();
}
const editPost = (e) =>{
    input.value = e.parentElement.parentElement.innerText;
    e.parentElement.parentElement.remove();
}

//form logic
form.addEventListener('submit',(e) =>{
e.preventDefault();
formValidation();
})


const formValidation = () => {
if(input.value === '')
{
showError('post can not be empty');
}
else{
   acceptData();
}
}