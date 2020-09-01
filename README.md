# SecureBank

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.6.

## Goals

The goal in mind with the architecture has been the following:
 * to use Rxjs for every IO,ET centralizing Emission rights.
 * to centralize all Outside API calls in a service to Stub,Spy on it
 * to keep the Test smallest and faster as possible
 
## Progress

The Login part of the practice is done.

Next steps could be implement interceptor for /transactions Api

To Do: the /transactions

To Improve: Refine the ng test output to eliminate some warning/errors

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
