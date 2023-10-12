import {
  email,
  greenColorRgb,
  orchestratorForgotPasswordUrl,
  password,
} from 'cypress/utils/test-utils';

beforeEach(() => {
  cy.clearCookies();
  cy.clearLocalStorage();
  cy.visit('/');
});

describe('orchestrator: login fields', () => {
  it('should display all log in fields and style correctly', () => {
    //LOGO
    cy.get('span svg').should('exist');
    //TITLE
    cy.get('h2').should('include.text', 'Welcome Back!').and('exist');
    //EMAIL FIELD
    cy.get('div label').should('include.text', 'Email Address').and('exist');
    cy.get('div input[type="email"]').should('be.empty').and('exist');
    //PASSWORD FIELD
    cy.get('div label').should('exist').and('include.text', 'Password');
    cy.get('div input[type="password"]').should('exist').and('be.empty');
    //CHEKBOX REMEMBER ME
    cy.get('div input[type="checkbox"]').should('exist').and('be.empty');
    cy.get('div span').should('include.text', 'Remember me').and('exist');
    //FORGOT YOUR PASSWORD
    cy.get('div a')
      .should('exist')
      .and('include.text', 'Forgot your password?')
      .and('have.attr', 'href')
      .and('include', orchestratorForgotPasswordUrl);
    //LOGIN BUTTON
    cy.get('div button[type="submit"]')
      .should('exist')
      .and('include.text', 'Log In')
      .and('have.css', 'background-color', greenColorRgb);
  });

  it('should not log in without the required fields', () => {
    cy.get('div button[type="submit"]').click();
    cy.url().should('include', '/login');
  });

  it('should not log in with wrong email', () => {
    cy.get('div input[type="email"]').type('wrongemail');
    cy.get('div button[type="submit"]').click();
    cy.url().should('include', '/login');
  });

  it('should not log in with with password', () => {
    cy.get('div input[type="password"]').type('wrongpassword');
    cy.get('div button[type="submit"]').click();
    cy.url().should('include', '/login');
  });

  it('should not log in with only checkbox selected', () => {
    cy.get('div input[type="checkbox"]').click();
    cy.get('div button[type="submit"]').click();
    cy.url().should('include', '/login');
  });

  it('should not log in with all the wrong fields', () => {
    cy.get('div button[type="submit"]').click();
    cy.url().should('include', '/login');

    cy.get('div input[type="email"]').type('wrongemail');
    cy.get('div button[type="submit"]').click();
    cy.url().should('include', '/login');

    cy.get('div input[type="password"]').type('wrongpassword');
    cy.get('div button[type="submit"]').click();
    cy.url().should('include', '/login');

    cy.get('div input[type="checkbox"]').click();
    cy.get('div button[type="submit"]').click();
    cy.url().should('include', '/login');
  });
});

describe('orchestrator: reset password', () => {
  it('should display all reset password fields and style correctly', () => {
    //CLICK ON FORGOT PASSWORD
    cy.get('div a').click();
    cy.url().should('include', orchestratorForgotPasswordUrl);
    //LOGO
    cy.get('span svg').should('exist');
    //TITLE
    cy.get('h2').should('include.text', 'Forgot your password?').and('exist');
    //EMAIL FIELD
    cy.get('div label').should('include.text', 'Email Address').and('exist');
    cy.get('div input[type="email"]').should('be.empty').and('exist');
    //LOGIN BUTTON
    cy.get('div button[type="submit"]')
      .should('exist')
      .and('include.text', 'Send Password Reset Link')
      .and('have.css', 'background-color', greenColorRgb);
  });
});

describe('orchestrator: log in', () => {
  it('should log in succesfly with correct fields', () => {
    //EMAIL FIELD
    cy.get('div input[type="email"]').type(email);
    //PASSWORD FIELD
    cy.get('div input[type="password"]').type(password);
    //LOGIN BUTTON
    cy.get('div button[type="submit"]').click();
    cy.url().should('include', 'dashboards/main');
  });
});

after(() => {
  cy.clearCookies();
  cy.clearLocalStorage();
});
