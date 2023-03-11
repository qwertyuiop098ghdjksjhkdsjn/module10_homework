const wsUri = "wss://echo-ws-service.herokuapp.com";  
const websocket = new WebSocket(wsUri)

const output = document.getElementById("output");  
const input = document.querySelector('.text');   
const btnSend = document.querySelector('.j-btn-send');  
const btnGeo = document.querySelector('.j-btn-geo');    

//  функция для вывода сообщений в output 
function writeToScreen(message, position) {
  let pre = document.createElement("p");   //создаю элемент <p>
  pre.style.wordWrap = "break-word";       //добавили стилей элементу
  pre.innerHTML = message;                 //пишем сообщение в элементе <p> (переменная pre)
  output.appendChild(pre);                 //добавляем это сообщ в output с помощью метода append
}


  websocket.onopen = function(evt) {
		console.log("CONNECTED");
	};
  websocket.onmessage = function(evt) {
    writeToScreen(
      '<span style="color: blue;">RESPONSE: ' + evt.data+'</span>'
    );
  };
  websocket.onerror = function(evt) {   //срабатывает при ошибке и выводит сообщение ERROR
    writeToScreen(
      '<span style="color: red;">ERROR:</span> ' + evt.data
    );
  };


//Кнопка отправки сообщения

btnSend.addEventListener('click', () => {
  const message = input.value;   
  writeToScreen("SENT: " + message); 
  websocket.send(message);
});

//Геолокация 

// Функция, срабатывающая при неуспешном получении геолокации
const error = () => {
  status.textContent = 'Невозможно получить ваше местоположение';
}

// Функция, срабатывающая при успешном получении геолокации
  const success = (position) => {
  const latitude  = position.coords.latitude;  
  const longitude = position.coords.longitude;  
  const geoLink = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
  writeToScreen (`<a  href='${geoLink}' target='_blank'>Геолокация</a>`);
  }
  
btnGeo.addEventListener('click', () => {
//проверяем, поддерживает браузер пользователя получение геолокации
  if (!navigator.geolocation) {
    writeToScreen('Geolocation не поддерживается вашим браузером'); 
  } else { 
    navigator.geolocation.getCurrentPosition(success, error);  //обращаемся к методу getCurrentPosition (с двумя аргументами функциями callback)
  }
});