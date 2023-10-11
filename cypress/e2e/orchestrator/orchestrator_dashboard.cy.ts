import {apiNotifications, email, orchestratorUrl, password} from 'cypress/utils/test-utils';

let notifications: any[] = [];

before(() => {
  cy.clearCookies();
  cy.clearLocalStorage();
  cy.visit(orchestratorUrl);
});

describe('orchestrator: test the correct behaviour of dashboard', () => {
  it('should log in succesfly with correct fields', () => {
    //EMAIL FIELD
    cy.get('div input[type="email"]').type(email);
    //PASSWORD FIELD
    cy.get('div input[type="password"]').type(password);
    //LOGIN BUTTON
    cy.get('div button[type="submit"]').click();
    //INTERCEPTION OF API NOTIFICATIONS
    cy.intercept('GET', apiNotifications).as('notificationsCall');
    cy.wait('@notificationsCall').then(resp => {
      notifications = resp.response?.body.notifications;
    });
    cy.url().should('include', 'dashboards/main');
  });

  it('should display header elements correctly', () => {
    //HEADER
    cy.get('header').should('exist');
    //LOGO
    cy.get('header span svg').should('exist');
    //SEARCH BAR
    cy.get('header div input').should('exist');
    //STYLE BUTTON
    cy.get('header div:nth-child(1) button').should('exist');
    //NOTIFICATIONS BUTTON
    cy.get('header div.relative button').should('exist');
    //AVATAR IMG
    cy.get('header button div img').should('exist');
    //USER NAME
    cy.get('header button div span').should('exist').and('not.be.empty');
  });

  it('should display notifications correctly ', () => {
    //NOTIFICATIONS CLICK BUTTON
    cy.get('header div.relative button').click();
    cy.get('div.relative.divide-y nav h3').should('exist').and('include.text', 'Notifications');
    //VERIFY THE CORRECT NOTIFICATIONS MESSAGE
    for (let i = 0; i < notifications.length; i++) {
      const message = notifications[i].message;
      cy.get(`div.relative.divide-y div:nth-child(${i + 1}) div div p`)
        .should('exist')
        .and('include.text', message);
    }
  });
});

after(() => {
  cy.clearCookies();
  cy.clearLocalStorage();
});
