var qId = 0;
var connect = 0;

function answer1_callback(xhr){
	var reponse = parseInt(xhr.responseText);
	
	//alert(reponse);

	if(reponse == 1){
		document.getElementById('gui').innerHTML = "Votre réponse a été prise en compte !";
	}
}

function answer_callback(xhr, answer){
	var reponse = xhr.responseText;

	//alert(reponse);

	var docJson = JSON.parse(reponse);

	switch(parseInt(docJson.qOpen)){
		case 0:
			alert("La question est fermée!");
			location.reload();
		break;

		case 1:
			var xhr = getXMLHttpRequest();

			xhr.onreadystatechange = function(){
				if(xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)){
					answer1_callback(xhr);
				}
			};

			xhr.open("POST", "http://localhost/Site/answerQuestion.php", true);
		    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		    xhr.send("qId="+qId+"&answer="+answer);
		break;

		case 2:
			alert("L'Id n'existe pas!");
			location.reload();
		break;
	}
}

function answerQuestion(answer){
	var xhr = getXMLHttpRequest();

	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)){
			answer_callback(xhr, answer);
		}
	};

	xhr.open("POST", "http://localhost/Site/connectQuestion.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("qId="+qId);
}

function get_callback(xhr){
	var reponse = xhr.responseText;

	//alert(reponse);

	var docJson = JSON.parse(reponse);

	var tTques = "<h2>Question :</h2>";
	var tQuest = "<strong id=\"question\">...</strong>";
	var tButA = "<button onclick=\"answerQuestion(\'A\')\" id=\"answerA\">A</button>";
	var tButB = "<button onclick=\"answerQuestion(\'B\')\" id=\"answerB\">B</button>";
	var tButC = "<button onclick=\"answerQuestion(\'C\')\" id=\"answerC\">C</button>";
	var tButD = "<button onclick=\"answerQuestion(\'D\')\" id=\"answerD\">D</button>";
	var wr = tTques+tQuest+"<br><br>"+tButA+tButB;

	switch(parseInt(docJson.nbAnswer)){
		case 3:
			wr += tButC;
		break;

		case 4:
			wr += tButC+tButD;
		break;
	}

	document.getElementById('gui').innerHTML = wr;

	document.getElementById('question').innerHTML = docJson.question;
}

function getQuestion(){
	var xhr = getXMLHttpRequest();

	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)){
			get_callback(xhr);
		}
	};

	xhr.open("POST", "http://localhost/Site/getQuestion.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    qId = document.getElementById('qId').value;

    xhr.send("qId="+qId);
}

function connect_callback(xhr){
	var reponse = xhr.responseText;

	//alert(reponse);

	var docJson = JSON.parse(reponse);

	switch(parseInt(docJson.qOpen)){
		case 0:
			alert("La question est fermée!");
		break;

		case 1:
			getQuestion();
		break;

		case 2:
			alert("L'Id n'existe pas!");
		break;

		default:
			alert(docJson.qOpen);
	}
}

function connectQuestion(){
	var xhr = getXMLHttpRequest();

	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)){
			connect_callback(xhr);
		}
	};

	xhr.open("POST", "http://localhost/Site/connectQuestion.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("qId="+document.getElementById('qId').value);
}