# pizza-chatbot documentation

Project is build using 
- Angular
- Nodejs
- mysql 

## Api documentation 
  ### Allowed HTTP requests:
  - post- Update resource
  - get- Get a resource or list of resources
  
  ### Description Of Usual Server Responses:
  - 200 OK - the request was successful 
  - 404 Not Found - resource was not found.
  
  ### Table sample
  - url/event- It returns api of question and answer for chatbot to answer questions of user.
   for ex- { { question:'hi',answer:'Hi how can i help you?'}}
   - url/userdetails/- It takes userdetails by post method and stores in database.
   - url/orderStatus/- It stores order details into database and  by  get method it returns api having order id and order status.
   
   
   
   ## pizza-chatbot

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

  
