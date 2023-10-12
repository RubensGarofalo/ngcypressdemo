# Ngcypressdemo

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.0.1.

## Introduction

`Ngcypressdemo` is an Angular project with integrated end-to-end testing using Cypress. This setup ensures that not only the application's components are functional but also that the user flows work as expected, thanks to the Cypress tests.

### Installing Dependencies

After cloning, you need to install the required dependencies. Run the following command:
`npm install`.
This will install all the necessary packages required for the application to run and for the tests to execute.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Running end-to-end tests with Cypress

### Setup

Before running the Cypress tests, ensure that your environment variables are set in the `cypress.env.json` file, which must be created manually at the root level. This file has been added to the `.gitignore` to keep sensitive information, like passwords, out of version control.

```json
{
  "email": "testemail@email.com",
  "password": "testemail"
}
```

the URL or localhost to be tested must be entered in the baseUrl in `cypress.config.ts`

```js
import {defineConfig} from 'cypress';

export default defineConfig({
  e2e: {
    defaultCommandTimeout: 5000,
    testIsolation: false,
    baseUrl: 'https://orchestrator.maphub.it',
  }
});

```

### Running Tests

Run `npm run cypress:open` to execute the end-to-end tests via Cypress browser. This command will launch the Cypress UI, from which you can select specific test, run `npm run cypress:run` to launch all tests together.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

To get more help on Cypress check out the [Cypress documentation](https://docs.cypress.io/guides/overview/why-cypress) page.
