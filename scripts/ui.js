//renders chat template to the DOM
//clear the list of chats(when the room changes)
//chatUI class takes in one parameter 'list'
//list is where we output the template to
//'chatList' from app.js is received as a parameter as 'list' here
//render will then create html snippet for each chat document;
class ChatUI {
  constructor(list){
    this.list=list;
  }
  clear(){
    this.list.innerHTML ='';
  }
  render(data){
    const when = dateFns.distanceInWordsToNow(
      data.created_at.toDate(),
      { addSuffix: true }
    );
    const html= `
      <li class="list-group-item">
        <span class="username">${data.username}</span>
        <span class="message">${data.message}</span>
        <div class="time">${when}</div>
      </li>
    ` ; 
    this.list.innerHTML +=html
  }
}