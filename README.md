# Quadrant POC using Spring Boot, React.js and D3.js

This is poc project is a simple CRUD application built using Spring Boot. I have used the in-memory database H2, to create and populate a table Student with name and marks of students.On start the table is prepopulated with some data and The REST API end points help with CRUD tasks.

The other part of this project is a React.js frontend app that interacts with Spring Boot application to Add, Modify, Read and Delete student records. There is also a report page that uses D3.js to plot a bar graph with the student percentage scores.


## Starting the Application

To start the application follow the steps below:
  
  #### A. Spring Boot App:
          1. Run the spring boot application from the IDE or commandline. The app will be running in port:8080.
          2. You can access the in memory h2 database and the table student using the below credentials.
             - Open URL: http://localhost:8080/h2-console/login.jsp
             - Use the default credentials.
          3. Test if the application works by opening the url: http://localhost:8080/api/students
          A list of students with their marks should be displayed.
 
  #### B. React App:
          1. Go to app folder.
          2. npm install
          3. npm start
          4. The application will be running on the port: 3000.
          5. Click on Maintain Students to interact with Spring Boot application's CRUD operations.
          6. Click on A Simple Report to view the D3.js report.
