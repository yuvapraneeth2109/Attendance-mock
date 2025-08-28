# Attendance-mock
This is a tiny Attendance Session Mock using Node/Express + React.
The application does not use a database.
All data is stored in memory and will be reset when the server is restarted.
# Prerequisites
Node.js and npm must be installed.
# Step 1: Start the Backend
Open your terminal and go to the `backend` folder.
Run these commands:
```bash
npm install 
npm start
```
# Step 2: Start the Frontend
Open your terminal and go to the `Frontend` folder.
Run these commands:
```bash
npm install
npm start
```
# Method	Endpoint	Description
GET	  /health	Checks          if the server is running.
POST  /session/start	        Starts a new session.
GET	  /session/{id}	          Gets details for a specific session.
POST	/session/{id}/checkin	  Adds an attendee.
POST	/session/{id}/end	      Ends a session.
# Port number: 
3000
# Screenshot 1: After a Session Starts
This image should show the app after you have entered a subject and clicked "Start Session." It should display the Session ID, Subject, Status (`active`), and Attendees (`0`)
# Screenshot 2: After a Check-in
This image should show the app after you have entered a roll number and clicked "Check-in." It should show that the Attendees count has increased and the roll number is listed below.
