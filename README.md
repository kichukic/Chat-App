              API DOCUMENTATION
   ------------------------------------------




    SIGNUP API
__________________
localhost:5001/api/signup

body : {
    "name":"kichu",
    "gender":"male",
    "email":"kichukic@gmail.com",
    "password":"1234",
    "confirmPassword":"1234"
}





    LOGIN API
 ________________
localhost:5001/api/login

body: {
    "email":"kichukic@gmail.com",
    "password":"kichu123"
}






    GEMENI ENGINE
 _______________________
localhost:5001/api/gemeni_chat

body : {"body":"tell me about Data structure in 1000 words"}




adding detailed doc soon !!






        ROOM ROUTES
-----------------------------
Creating a room
________________

API : localhost:4001/api/chat/chatRoom

body: {
    "roomName":"syams room"
}

response : 
on success :
room ${roomName} created sucessfully

error handled : on void token 
{
    "message": "Invalid token",
    "err": {
        "name": "TokenExpiredError",
        "message": "jwt expired",
        "expiredAt": "2024-10-04T16:58:28.000Z"
    }
}
,
on user created the same room : 
{
    "message": "a room already created by this user ${user}`"
}


__________________________________________________________________________

GET ALL ROOMS
______________

API : localhost:4001/api/chat/Rooms

response:
on success:
{
    "Rooms": [
        {
            "RoomId": "el25a602vm",
            "RoomName": "kic room",
            "members": 2
        },
        {
            "RoomId": "8smrplcgy18",
            "RoomName": "syams room",
            "members": 1
        }
    ]
}



    LEAVE A ROOM
_____________________

localhost:4001/api/chat/leaveRoom

response:

on success:
{user ${user} has been removed from chat room`}

if no room:
{
    "message": "no room found with this id"
}

on void token:
{
    "message": "Invalid token",
    "err": {
        "name": "TokenExpiredError",
        "message": "jwt expired",
        "expiredAt": "2024-09-19T16:46:31.000Z"
    }
}



    AUTO SWITCHING AI ENGNINE
_________________________________

localhost:4001/api/chat/switchableAI

body:
{
    "data":"hiiii, what is gpt ?",
    "conversationHistory":["hiiii"]
}

response:
{
    "engine_openAI": "I'm sorry, it seems like your message got jumbled up. Could you please provide more context or clarify your question?"
}

as of now theres two engines , gemeni and open ai ,
if one failes it will auto switch to another to maintain the uptime




    JOING A ROOM
______________________

http://localhost:4001/api/chat/joinRoom

response:

on succesful join:
`user ${user} is joined the room successfully`

if already joined:
{
    "message": "kichukic@gmail.com is already on the chat room"
}

error handled:
=>token void
