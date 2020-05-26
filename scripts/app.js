const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const updateMssg = document.querySelector('.update-mssg');
const rooms = document.querySelector('.chat-rooms')

//Add a new Chat
newChatForm.addEventListener('submit', e=>{
  e.preventDefault();
  const message= newChatForm.message.value.trim();
  chatroom.addChat(message)
  .then(()=>{ newChatForm.reset();})
  .catch(err=>{console.log(err)});
})

//update the Chatroom
rooms.addEventListener('click', e =>{
  if(e.target.tagName === 'BUTTON' ){
  chatUI.clear();
  chatroom.updateRoom(e.target.getAttribute('id'));
  chatroom.getChats(chat=>chatUI.render(chat));
  }
});

//Update Username
newNameForm.addEventListener('submit', e=>{
  e.preventDefault;
  //update name via the chatroom class
  const newName= newNameForm.name.value.trim();
  chatroom.updateName(newName)
  //reset form
  newNameForm.reset();
  //show then hide the update message
  updateMssg.innerText = `Your name was updated to ${newName}`;
  setTimeout(()=>updateMssg.innerText='', 3000);
});

//check local storage for a name
const username= localStorage.username ? localStorage.username : 'anon';

//class instances
//chatlist is passed as an argument;
const chatUI= new ChatUI(chatList);
const chatroom = new Chatroom('general', username);
//get chat and render
chatroom.getChats(data=> chatUI.render(data) );
