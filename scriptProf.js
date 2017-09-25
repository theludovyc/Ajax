var qId = 0;
var open = 0;

function create_callback(xhr){
	alert("La question est créée!");

	qId = xhr.responseText;

	document.getElementById('qId').innerHTML = qId;
}

function createQuestion(){
	if(qId == 0){
		var xhr = getXMLHttpRequest();

		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)){
				create_callback(xhr);
			}
		};

		xhr.open("POST", "http://localhost/Site/createQuestion.php", true);
	    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	    xhr.send("question="+document.getElementById('question').value+"&nbAnswer="+document.getElementById('nbAnswer').value);
	}
}

function open_callback(xhr){
	switch(parseInt(xhr.responseText)){
		case 1:
			alert("La question est ouverte");
			open = 1;
			document.getElementById('ocBut').innerHTML = "fermer";
		break;

		case 0:
			alert("La question est fermée");
			open = 0;
			document.getElementById('ocBut').innerHTML = "ouvrir";
		break;
	}
}

function openQuestion(){
	if(qId!=0){
		var xhr = getXMLHttpRequest();

		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)){
				open_callback(xhr);
			}
		};

		xhr.open("POST", "http://localhost/Site/openQuestion.php", true);
	    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

		switch(open){
			case 0:
				xhr.send("qId="+qId+"&qOpen=1");
			break;

			case 1:
				xhr.send("qId="+qId+"&qOpen=0");
			break;
		}
	}
}

function result_callback(xhr){
	var reponse = xhr.responseText;

	//alert(reponse);

	var docJSON = JSON.parse(reponse);

	document.getElementById('qA').innerHTML = docJSON.a;
	document.getElementById('qB').innerHTML = docJSON.b;
	document.getElementById('qC').innerHTML = docJSON.c;
	document.getElementById('qD').innerHTML = docJSON.d;
}

function resultQuestion(){
	if(qId != 0){
		var xhr = getXMLHttpRequest();

		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)){
				result_callback(xhr);
			}
		};

		xhr.open("POST", "http://localhost/Site/resultQuestion.php", true);
	    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	    xhr.send("qId="+qId);
	}
}

function delete_callback(xhr){
	alert(xhr.responseText);

	qId = 0;

	document.getElementById('qId').innerHTML = null;

	open = 0;
	document.getElementById('ocBut').innerHTML = "ouvrir";

	document.getElementById('qA').innerHTML = null;
	document.getElementById('qB').innerHTML = null;
	document.getElementById('qC').innerHTML = null;
	document.getElementById('qD').innerHTML = null;
}

function deleteQuestion(){
	if(qId != 0){
		var xhr = getXMLHttpRequest();

		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)){
				delete_callback(xhr);
			}
		};

		xhr.open("POST", "http://localhost/Site/deleteQuestion.php", true);
	    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	    xhr.send("qId="+qId);
	}	
}