import {Notification, apiNotifications, email, password} from 'cypress/utils/test-utils';

let notifications: Notification[] = []; //USED TO STORE NOTIFICATIONS RETRIEVED FROM THE API

//COOKIES AND LOCAL STORAGE DELETED, AND HOMEPAGE VISITED BEFORE RUNNING TESTS
before(() => {
  cy.clearCookies();
  cy.clearLocalStorage();
  cy.visit('/');
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

    if (notifications && notifications.length > 0) {
      //VERIFY THE CORRECT NOTIFICATIONS TITLE
      cy.get('div.relative.divide-y nav h3').should('exist').and('include.text', 'Notifications');

      //VERIFY THE CORRECT NOTIFICATIONS MESSAGE
      notifications.forEach((notification, index) => {
        const message = notification.message;
        cy.get(`div.relative.divide-y div:nth-child(${index + 1}) div div p`)
          .should('exist')
          .and('include.text', message);
        cy.log(message);

        //VERIFY THE CORRECT NOTIFICATIONS CREATION DATE
        const createdAtFriendly = notification.created_at_friendly;
        cy.get(
          `div.relative.divide-y div:nth-child(${
            index + 1
          }) div div div.flex-auto div:nth-child(1) p`,
        )
          .should('exist')
          .and('include.text', createdAtFriendly);
        cy.log(createdAtFriendly);
      });
    } else {
      cy.log('No notifications to display.');
    }
  });
});

//COOKIES AND LOCAL STORAGE DELETED AFTER RUNNING TESTS
after(() => {
  cy.clearCookies();
  cy.clearLocalStorage();
});
