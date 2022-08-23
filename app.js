

  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-analytics.js";
    import { 
    getDatabase,
     ref, 
     set,
     push,
     onValue,
  } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-database.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBJJthmN-Hd4G4op55PcwmJz8XhqwPKMf0",
    authDomain: "to-do-app-e0a23.firebaseapp.com",
    projectId: "to-do-app-e0a23",
    storageBucket: "to-do-app-e0a23.appspot.com",
    messagingSenderId: "449142401633",
    appId: "1:449142401633:web:66290f5f9780d1edec1820",
    measurementId: "G-1MZZBBR68T"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const databs = getDatabase();
  
  
  
  
  
  
  
  







var obj = {};
var inp=document.getElementById("inp")
var parent=document.getElementById("parent")


window.add = function () {
    obj = {
    text: inp.value,
    time: new Date().getHours() + " : " + new Date().getMinutes(),
  };
  console.log(obj); 



var reference = ref(databs, "inps/");
var newRef = push(reference);
obj.id = newRef.key;
set(newRef,{
  text: inp.value,
  time: new Date().getHours() + " : " + new Date().getMinutes(),
});
};




var objectsData;
function getData(){
var reference = ref(databs, "inps/")
onValue(reference, function(data){
 console.log(data.val());
 objectsData = Object.values( data.val());
 console.log(objectsData);
 renderQuestions();
    } )

}
getData()





function renderQuestions() {
  var parent = document.getElementById("parent");
  parent.innerHTML = "";
  for (var i = 0; i < objectsData.length; i++) {
    parent.innerHTML += `
    <div class="taskbox rounded my-4">
<p> ${objectsData[i].text}</p>
<span class="fs-5">${objectsData[i].time}</span>
<button class="btn btn-light rounded my-1" onclick="edit(${i})">Edit</button>
<button class="btn btn-light rounded my-1" onclick="del(${i})">Delete</button>
</div>  `;
 
    inp.value = "";
  }
}




window.del = function (index){
objectsData.splice(index,1);
 renderQuestions();
 }

 window.deleteall = function(){
  set(ref(databs, "inps/"),{value:null});
  var parent = document.getElementById("parent");
  parent.innerHTML ="";
  }
  




 window.edit= function(i) {
  var a = prompt('Edit new text', objectsData[i].text);
  objectsData[i].text = a;
  renderQuestions();
  }
  








