# Blog website Project 

*This is a project for CS353C Software Design module*
---
This is a reminder application website built on a remote server and run on **Node.js** for the server side language. **Express** is required to handle the requests from browsers, **Google Firebase** is used for the real-time database and authentication system, Gppgle Cloud is used for the storage for uploaded files and images. **jQuery** library is embedded to process the browser's behaviour, templates and Ajax function. Bootstrap and Propeller are imported as front-end frameworks to provide UI design supprot. 
---
The index html file is a dynamic page with a series of block templates which are loaded from the server and updated based on the **real-time database** and storage of Google Firebase. The CRUD (create, retrieve, update and delete) functionality are implemented for each item and users can set the notification function on specified item to receive email or message in the future. The authentication system listens for the login status for each page and decides to display different content based on user status.
---
The functionality also include email verification and email notification system, which will verify new user's email address during registration and send notification message at specified date as personal setting. The email verification is supported by Firebase authentication system and auto email sender is implemented by **Nodemailer** module. 

>Development environment:
1. JavaScript (jQuery libray)
2. Node.js (Express,Nodemailer)
3. Firebase (Real-time Database, Authentication, Email Templates, Storage)
4. Bootstrap, Propeller(framework) 
5. HTML, CSS 
6. Git
7. Linux ubuntu (VPS supported by Digitalocean.com)
8. Sublime Text, Visual Studio Code (editor)
