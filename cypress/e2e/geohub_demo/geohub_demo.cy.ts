const geohubUrl = 'https://geohub.webmapp.it';
const forgotPasswordUrl = 'https://geohub.webmapp.it/password/reset';
const blueColorRgb = 'rgb(64, 153, 222)';
const whiteColorRgb = 'rgb(255, 255, 255)';

before(() => {
  cy.clearCookies();
  cy.clearLocalStorage();
  cy.visit(geohubUrl);
});

describe('geohub demo tests', () => {
  it('should display all fields and style correctly', () => {
    //LOGO
    cy.get('svg').should('exist');
    //TITLE
    cy.get('h2').should('exist').and('include.text', 'Welcome Back!');
    //EMAIL FIELD
    cy.get('div label').should('exist').and('include.text', 'Email Address');
    cy.get('div input[type="email"]').should('exist').and('be.empty');
    //PASSWORD FIELD
    cy.get('div label').should('exist').and('include.text', 'Password');
    cy.get('div input[type="password"]').should('exist').and('be.empty');
    //CHEKBOX REMEMBER ME
    cy.get('div input[type="checkbox"]').should('exist').and('be.empty');
    cy.get('div span').should('exist').and('include.text', 'Remember Me');
    //FORGOT YOUR PASSWORD
    cy.get('div a')
      .should('exist')
      .and('include.text', 'Forgot Your Password?')
      .and('have.css', 'color', blueColorRgb)
      .and('have.attr', 'href')
      .and('include', forgotPasswordUrl);
    //LOGIN BUTTON
    cy.get('div button[type="submit"]')
      .should('exist')
      .and('include.text', 'Login')
      .and('have.css', 'background-color', blueColorRgb)
      .and('have.css', 'color', whiteColorRgb);
  });
});

after(() => {
  cy.clearCookies();
  cy.clearLocalStorage();
});
