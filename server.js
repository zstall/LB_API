
//////////////////////////////////////////////////////////
// Create FileSync Var and get notes from notes.json
//////////////////////////////////////////////////////////
var fs = require('fs');
var notes_data = fs.readFileSync('notes.json');
var notes = JSON.parse(notes_data);
console.log(notes);
console.log("server started");

//////////////////////////////////////////////////////////
// Load app and start local Server
//////////////////////////////////////////////////////////
var express = require('express');
var app = express();
var server = app.listen(3000, listening);

function listening(){
  console.log("Server Listening");
}


//////////////////////////////////////////////////////////
// Get all notes and display to user
//////////////////////////////////////////////////////////
app.get("/all", sendAll);

function sendAll(request, response){
  response.send(notes);
}

//////////////////////////////////////////////////////////
// Serve notes from static FileSync
//////////////////////////////////////////////////////////
app.use(express.static("notes"));


//////////////////////////////////////////////////////////
// Add new note
//////////////////////////////////////////////////////////
app.get("/add/:id_num/:body_text", addNote);

function addNote(request, response){
  var data = request.params;
  var id = data.id_num;
  var body = data.body_text;
  var temp = {
    id : id,
    body : body
  }
  notes.push(temp);
  var data = JSON.stringify(notes, null, 2);
  fs.writeFile("notes.json", data, finished);
  function finished(err){
    console.log("Added" + data);
  }

  var reply = {
    msg: "New note added." + data

  }
  response.send(reply);
}
