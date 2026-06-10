const questions = [

{
question:"What does HTML stand for?",
options:[
"Hyper Text Markup Language",
"Home Tool Markup Language",
"Hyper Transfer Markup Language",
"High Text Machine Language"
],
answer:0,
explanation:"HTML stands for Hyper Text Markup Language."
},

{
question:"Which HTML tag creates a hyperlink?",
options:[
"<link>",
"<a>",
"<href>",
"<url>"
],
answer:1,
explanation:"The <a> tag is used to create hyperlinks."
},

{
question:"Which tag inserts an image?",
options:[
"<img>",
"<image>",
"<picture>",
"<src>"
],
answer:0,
explanation:"The <img> tag displays images."
},

{
question:"Which property changes text color in CSS?",
options:[
"font-color",
"text-color",
"color",
"background"
],
answer:2,
explanation:"The color property changes text color."
},

{
question:"Which CSS property changes font size?",
options:[
"text-size",
"font-size",
"size",
"font-style"
],
answer:1,
explanation:"font-size controls the size of text."
},

{
question:"Which CSS property makes text bold?",
options:[
"font-style",
"font-weight",
"text-weight",
"bold"
],
answer:1,
explanation:"font-weight:bold makes text bold."
},

{
question:"Which keyword declares a variable in JavaScript?",
options:[
"var",
"int",
"float",
"string"
],
answer:0,
explanation:"var is used to declare variables."
},

{
question:"Which symbol is used for comments in JavaScript?",
options:[
"//",
"#",
"<!-- -->",
"**"
],
answer:0,
explanation:"Single-line comments use //."
},

{
question:"How do you display text in the console?",
options:[
"print()",
"console.log()",
"display()",
"echo()"
],
answer:1,
explanation:"console.log() prints output to the browser console."
},

{
question:"Which company developed JavaScript?",
options:[
"Microsoft",
"Google",
"Netscape",
"Apple"
],
answer:2,
explanation:"JavaScript was created at Netscape."
},

];
let current = 0;
let score = 0;
let timer;
let time = 15;

const startScreen =
document.getElementById("startScreen");

const quizContainer =
document.getElementById("quizContainer");

const resultScreen =
document.getElementById("resultScreen");

document
.getElementById("startBtn")
.addEventListener("click", startQuiz);

function startQuiz(){

startScreen.classList.add("hidden");
quizContainer.classList.remove("hidden");

shuffleQuestions();

loadQuestion();
}

function shuffleQuestions(){
questions.sort(() => Math.random() - 0.5);
}

function loadQuestion(){

clearInterval(timer);

time = 15;

document.getElementById("timer").innerText = time;

timer = setInterval(() => {

time--;

document.getElementById("timer").innerText = time;

if(time === 0){

clearInterval(timer);

nextQuestion();

}

},1000);

let q = questions[current];

document.getElementById("question")
.innerText = q.question;

document.getElementById("currentQuestion")
.innerText = current + 1;

document.getElementById("totalQuestions")
.innerText = questions.length;

document.getElementById("progressBar")
.style.width =
((current)/questions.length)*100+"%";

let options =
document.getElementById("options");

options.innerHTML="";

q.options.forEach((option,index)=>{

let btn =
document.createElement("button");

btn.className="option";

btn.innerText=option;

btn.onclick=()=>checkAnswer(index);

options.appendChild(btn);

});

document.getElementById("explanation")
.style.display="none";
}

function checkAnswer(index){

clearInterval(timer);

let q = questions[current];

let buttons =
document.querySelectorAll(".option");

buttons.forEach(btn=>btn.disabled=true);

if(index===q.answer){

buttons[index].classList.add("correct");

score++;

playCorrect();

}
else{

buttons[index].classList.add("wrong");

buttons[q.answer].classList.add("correct");

playWrong();

}

let explanation =
document.getElementById("explanation");

explanation.style.display="block";

explanation.innerText =
q.explanation;
}

document
.getElementById("nextBtn")
.addEventListener("click",nextQuestion);

function nextQuestion(){

current++;

if(current<questions.length){

loadQuestion();

}
else{

showResult();

}
}

function showResult(){

quizContainer.classList.add("hidden");

resultScreen.classList.remove("hidden");

let percentage =
Math.round(
(score/questions.length)*100
);

document.getElementById("scoreText")
.innerText =
`${score}/${questions.length}`;

document.getElementById("percentage")
.innerText =
percentage+"%";

document.getElementById("correctAns")
.innerText =
score;

let high =
localStorage.getItem("highScore") || 0;

if(score>high){

localStorage.setItem(
"highScore",
score
);

high=score;
}

document.getElementById("highScore")
.innerText=high;

let rating="Average";

if(percentage>=90)
rating="🔥 Excellent";

else if(percentage>=70)
rating="⭐ Good";

document.getElementById("performance")
.innerText=rating;

confetti({
particleCount:150,
spread:100
});
}

function restartQuiz(){
location.reload();
}

function playCorrect(){
// optional sound
}

function playWrong(){
// optional sound
}

document
.getElementById("themeBtn")
.addEventListener("click",()=>{

document.body.classList.toggle("light");

});