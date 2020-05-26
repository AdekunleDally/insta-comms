// Adding new chat documents
//setting up real-time listeners to get new chats
//updating the username
//updating the room

class Chatroom{
  constructor(room, username){
    this.room= room;
    this.username= username;
    this.chats= db.collection('chats');
    this.unsub;
  }
    
  //Add a method to add chat documents. The method is an asynchronous method
  //It takes in a parameter called 'message' which is a string that we want to add
  async addChat(message){
  //format a chat object which is also a chat document
  //construct an object which makes up a chat
    const now= new Date(); // to know when user submitted the chat
    const chat={           // chat document represents the chat document in the database
      message,
      username: this.username, // the username we pass in
      room: this.room,
      created_at: firebase.firestore.Timestamp.fromDate(now) // a firebase timestamp based on the date
    };

  //save the chat document to a database
  const response = await this.chats.add(chat);
  return response;
  }

  getChats(callback){
    this.unsub=this.chats
    .where('room','==', this.room)
    .orderBy('created_at')
    .onSnapshot((snapshot)=>{
      snapshot.docChanges().forEach(change=>{
        if(change.type==='added'){
          //U.I display
          callback(change.doc.data());
        }
      })
    })
  }
    
  //update username
  updateName(username){
    this.username= username;
    localStorage.setItem('username', username)
  }

  //update chatroom
  updateRoom(room){
    this.room = room;
    console.log('room Updated');
    if(this.unsub){
      this.unsub();
    } 
  }
}

