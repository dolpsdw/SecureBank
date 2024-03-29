# SecureBank

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.6.

## Goals

The goal in mind with the architecture has been the following:
 * to use Rxjs for every IO,ET centralizing Emission rights.
 * to centralize all Outside API calls in a service to Stub,Spy on it
 * to keep the Test smallest and faster (unitary) as possible without need e2e
 * not to test third party stuff, like angular render variables, observable works, backend return proper stuff...
 
## Progress

The Login part of the practice it's done.
The Transactions View part, and the Token interceptor part it's done.

To Improve: 
* Refine the ng test output to eliminate some warning
* Make modules for components, so they can be lazy Loaded
* Persist session managing using cookies, localstorage etc.
* Use a state management framework (ngrx, akita)
* Do TimeOut and blind the httpClient backend flow, with Observable.Retry and logging.
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

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
