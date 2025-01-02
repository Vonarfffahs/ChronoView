//https://docs.cypress.io/api/commands/visit

describe('Frontend test', () => {
  //home page
  it('should load the home page', () => {
    cy.visit('http://localhost:5173');

    //check navbar
    cy.get('.bg-dark')
      .find('.navbar-brand')
      .should('exist')
      .and('contain', 'ChronoView');
    cy.get('.navbar-nav').should('exist');
    cy.get('.nav-link').contains('Home');
    cy.get('.nav-link').contains('Map');
    cy.get('.nav-link').contains('Sign Up');
    cy.get('.nav-link').contains('Sign In');

    //check home page
    cy.get('h1').contains('Welcome to Home page');
  });

  //map page
  it('should load the map page', () => {
    // check the transition to the map page
    cy.visit('http://localhost:5173');
    cy.contains('Map').click();
    cy.url().should('include', '/map');

    //check navbar
    cy.get('.bg-dark')
      .find('.navbar-brand')
      .should('exist')
      .and('contain', 'ChronoView');
    cy.get('.navbar-nav').should('exist');
    cy.get('.nav-link').contains('Home');
    cy.get('.nav-link').contains('Map');
    cy.get('.nav-link').contains('Sign Up');
    cy.get('.nav-link').contains('Sign In');

    //check map page
    cy.get('.map-container').find('h1').contains('Map');
    cy.get('.map').should('exist').should('be.visible');
    cy.get('.map').find('svg').should('exist');
    cy.get('.map').find('.marker').should('exist');
  });

  // authorisation (login + logout)
  it('should log in, return a valid token and load profile page, then log out and load main page', () => {
    // check the transition to the login page
    cy.visit('http://localhost:5173');
    cy.contains('Sign In').click();
    cy.url().should('include', '/login');

    //check navbar
    cy.get('.bg-dark')
      .find('.navbar-brand')
      .should('exist')
      .and('contain', 'ChronoView');
    cy.get('.navbar-nav').should('exist');
    cy.get('.nav-link').contains('Home');
    cy.get('.nav-link').contains('Map');
    cy.get('.nav-link').contains('Sign Up');
    cy.get('.nav-link').contains('Sign In');

    // login
    cy.request('POST', 'http://localhost:3000/api/auth/login', {
      username: 'admin',
      password: 'Admin@123',
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body.access_token).to.exist;
      cy.wrap(response.body.access_token).as('authToken');
    });

    cy.get('input#username').type('admin');
    cy.get('input#password').type('Admin@123');

    cy.get('.w-100').contains('Sign In').click();

    // get profile
    cy.get('@authToken').then((token) => {
      cy.request({
        method: 'GET',
        url: 'http://localhost:3000/api/auth/profile',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body.username).to.exist;
        expect(response.body.email).to.equal('admin@gmail.com');
        const { username, email, role, banStatus } = response.body;

        cy.url().should('include', '/profile');
        cy.get('h1.text-center').should(
          'contain',
          `Welcome to your profile page, ${username}!`,
        );
        cy.get('p.text-center').contains(`Email: ${email}`);
        cy.get('p.text-center').contains(`Role: ${role}`);
        cy.get('p.text-center').contains(
          `Ban Status: ${banStatus ? 'Banned' : 'Active'}`,
        );

        cy.contains('Logout').click();
        cy.url().should('eq', 'http://localhost:5173/');
      });
    });
  });

  // authorisation (Sign Up)
  it('should log in new user, return a valid token and load profile page', () => {
    // check the transition to the login page
    cy.visit('http://localhost:5173');
    cy.contains('Sign Up').click();
    cy.url().should('include', '/register');

    //check navbar
    cy.get('.bg-dark')
      .find('.navbar-brand')
      .should('exist')
      .and('contain', 'ChronoView');
    cy.get('.navbar-nav').should('exist');
    cy.get('.nav-link').contains('Home');
    cy.get('.nav-link').contains('Map');
    cy.get('.nav-link').contains('Sign Up');
    cy.get('.nav-link').contains('Sign In');

    const username = 'e2etestuser5';
    const password = 'E2Etestuser5@123';
    const email = 'e2etestuser5@gmail.com';

    cy.get('input#username').type(username);
    cy.get('input#email').type(email);
    cy.get('input#password').type(password);

    cy.get('.w-100').contains('Sign Up').click();

    cy.wait(3000);

    // login
    cy.request('POST', 'http://localhost:3000/api/auth/login', {
      username: username,
      password: password,
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body.access_token).to.exist;
      cy.wrap(response.body.access_token).as('authToken');
    });

    cy.get('input#username').type(username);
    cy.get('input#password').type(password);

    cy.get('.w-100').contains('Sign In').click();

    // get profile
    cy.get('@authToken').then((token) => {
      cy.request({
        method: 'GET',
        url: 'http://localhost:3000/api/auth/profile',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body.username).to.exist;
        const { username, email, role, banStatus } = response.body;

        cy.url().should('include', '/profile');
        cy.get('h1.text-center').should(
          'contain',
          `Welcome to your profile page, ${username}!`,
        );
        cy.get('p.text-center').contains(`Email: ${email}`);
        cy.get('p.text-center').contains(`Role: ${role}`);
        cy.get('p.text-center').contains(
          `Ban Status: ${banStatus ? 'Banned' : 'Active'}`,
        );

        cy.contains('Logout').click();
        cy.url().should('eq', 'http://localhost:5173/');
      });
    });
  });

  //Backend
  it('should make API call to backend', () => {
    cy.request('http://localhost:3000/api/').then((response) => {
      expect(response.status).to.equal(200);
    });
  });

  // get events
  it('should make API(event) call to backend', () => {
    cy.request({
      method: 'GET',
      url: 'http://localhost:3000/api/events',
    }).then((res) => {
      expect(res.status).to.equal(200);
      expect(res.body).to.exist;
    });
  });

  // get figures
  it('should make API(figures) call to backend', () => {
    cy.request({
      method: 'GET',
      url: 'http://localhost:3000/api/figure',
    }).then((res) => {
      expect(res.status).to.equal(200);
      expect(res.body).to.exist;
    });
  });

  // get landmarks
  it('should make API(landmarks) call to backend', () => {
    cy.request({
      method: 'GET',
      url: 'http://localhost:3000/api/landmark',
    }).then((res) => {
      expect(res.status).to.equal(200);
      expect(res.body).to.exist;
    });
  });

  // get users
  it('should make API(users) call to backend', () => {
    cy.request('POST', 'http://localhost:3000/api/auth/login', {
      username: 'admin',
      password: 'Admin@123',
    }).then((response) => {
      console.log(response);
      expect(response.status).to.equal(200);
      expect(response.body.access_token).to.exist;
      cy.wrap(response.body.access_token).as('authToken');

      //all users
      cy.request({
        method: 'GET',
        url: 'http://localhost:3000/api/users',
        headers: {
          Authorization: `Bearer ${response.body.access_token}`,
        },
      }).then((res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.exist;
      });
    });

    // user by username
    cy.get('@authToken').then((token) => {
      cy.request({
        method: 'GET',
        url: 'http://localhost:3000/api/auth/profile',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        expect(response.status).to.equal(200);
        const { username, email, role, banStatus } = response.body;

        cy.request({
          method: 'GET',
          url: `http://localhost:3000/api/users/${username}`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.exist;
        });
      });
    });
  });

  // get comments
  it('should make API(comments) call to backend', () => {
    cy.request('POST', 'http://localhost:3000/api/auth/login', {
      username: 'admin',
      password: 'Admin@123',
    }).then((response) => {
      console.log(response);
      expect(response.status).to.equal(200);
      expect(response.body.access_token).to.exist;
      cy.wrap(response.body.access_token).as('authToken');

      //all comments
      cy.request({
        method: 'GET',
        url: 'http://localhost:3000/api/comments',
        headers: {
          Authorization: `Bearer ${response.body.access_token}`,
        },
      }).then((res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.exist;
      });
    });
  });
});
