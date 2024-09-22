const socket = io('http://localhost:3000')
const chatContainer = document.querySelector(".chat");
const connectBtn = document.querySelector(".connectBtn");
const sendCbBtn = document.querySelector(".sendCb");
const form = document.querySelector("form");
const input = form.querySelector("input");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  socket.emit("chat_message", input.value);
  input.value = "";
});
socket.on("restored_data",(msgs)=>restoredData(msgs));
socket.on("chat_message",(msg)=>createMsg(msg));
socket.on("connection",(socket)=>console.log(socket));

sendCbBtn.addEventListener('click',sendCb)


connectBtn.addEventListener('click',connectHandler)


function sendCb(){
  socket.emit('akn-test',(response)=>{
    console.log(`you responce is ${response.status}`)
    })
}

function connectHandler(){
  if(socket.connected){
    connectBtn.textContent = ''
    connectBtn.textContent = 'Connect'
    socket.disconnect()
  }
  else{
    connectBtn.textContent = ''
    connectBtn.textContent = 'Disconnect'
    socket.connect()
  }
}
function restoredData(data){
data.map(m=>createMsg(m.content))
}

function createMsg(msg) {
  console.log(`i have message for you : ${msg}`)
  const li = document.createElement("li");
  li.textContent = msg;
  chatContainer.appendChild(li); 
  /* socket.auth.serverOffset = serverOffset; */
}
