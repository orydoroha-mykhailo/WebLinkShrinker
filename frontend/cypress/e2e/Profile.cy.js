/* eslint-disable no-undef */
// ProfileView.vue testing
/// <reference types="cypress" />

Cypress.Commands.add('login', () => {
    cy.visit('http://127.0.0.1:8080/')
    cy.request({
        method: 'POST',
        url: 'http://127.0.0.1:8000/api/signin/',
        body: {
            email: 'orydoroha.mykhailo@gmail.com',
            password: 'orydoroha.mykhailo@gmail.com'
        }
    }).then((response) => {
        const token = response.body.tokens.access
        Cypress.env('token', `Bearer ${token}`)     // save the token for use elsewhere
    })
})

beforeEach(() => {
    cy.login()
})

describe('empty spec', () => {
    it('passes', () => {
        cy.intercept('*', (req) => {req.headers['authorization'] = Cypress.env('token')})
        cy.visit('http://127.0.0.1:8080/registration')
        cy.visit('http://127.0.0.1:8080/login')
        cy.visit('http://127.0.0.1:8080/about')
        cy.visit('http://127.0.0.1:8080/profile')
    })
})

describe('Text', () => {
    it('Visits the app root url', () => {
        cy.visit('http://127.0.0.1:8080/')
        cy.intercept('*', (req) => {req.headers['authorization'] = Cypress.env('token')})
        cy.visit('http://127.0.0.1:8080/profile')
        cy.contains('th', 'Ім’я')
    })
})

context('Window', () => {

    it('cy.window() - get the global window object', () => {
        // https://on.cypress.io/window
        cy.intercept('*', (req) => {req.headers['authorization'] = Cypress.env('token')})
        cy.visit('http://127.0.0.1:8080/profile')
        cy.window().should('have.property', 'top')
    })

    it('cy.document() - get the document object', () => {
        // https://on.cypress.io/document
        cy.intercept('*', (req) => {req.headers['authorization'] = Cypress.env('token')})
        cy.visit('http://127.0.0.1:8080/profile')
        cy.document().should('have.property', 'charset').and('eq', 'UTF-8')
    })

    it('cy.title() - get the title', () => {
        // https://on.cypress.io/title
        cy.intercept('*', (req) => {req.headers['authorization'] = Cypress.env('token')})
        cy.visit('http://127.0.0.1:8080/profile')
        cy.title().should('include', 'vue_frontend')
    })
})


context('Viewport', () => {
    /*
    beforeEach(() => {
      cy.visit('http://127.0.0.1:8080/profile')
    })

     */

    it('cy.viewport() - set the viewport size and dimension', () => {
        cy.intercept('*', (req) => {req.headers['authorization'] = Cypress.env('token')})
        cy.visit('http://127.0.0.1:8080/profile/')

        // https://on.cypress.io/viewport
        // lets see what our app looks like on a super large screen
        cy.viewport(2999, 2999)

        // cy.viewport() accepts a set of preset sizes
        // to easily set the screen to a device's width and height

        // We added a cy.wait() between each viewport change so you can see
        // the change otherwise it is a little too fast to see :)

        cy.viewport('macbook-15')
        cy.wait(200)
        cy.viewport('macbook-13')
        cy.wait(200)
        cy.viewport('macbook-11')
        cy.wait(200)
        cy.viewport('ipad-2')
        cy.wait(200)
        cy.viewport('ipad-mini')
        cy.wait(200)
        cy.viewport('iphone-6+')
        cy.wait(200)
        cy.viewport('iphone-6')
        cy.wait(200)
        cy.viewport('iphone-5')
        cy.wait(200)
        cy.viewport('iphone-4')
        cy.wait(200)
        cy.viewport('iphone-3')
        cy.wait(200)

        // cy.viewport() accepts an orientation for all presets
        // the default orientation is 'portrait'
        cy.viewport('ipad-2', 'portrait')
        cy.wait(200)
        cy.viewport('iphone-4', 'landscape')
        cy.wait(200)

        // The viewport will be reset back to the default dimensions
        // in between tests (the  default can be set in cypress.config.{js|ts})
    })
})

context('Utilities', () => {
    beforeEach(() => {
        cy.intercept('*', (req) => {req.headers['authorization'] = Cypress.env('token')})
        cy.visit('http://127.0.0.1:8080/profile')
    })

    it('Cypress._ - call a lodash method', () => {
        // https://on.cypress.io/_
        cy.request('https://jsonplaceholder.cypress.io/users')
            .then((response) => {
                let ids = Cypress._.chain(response.body).map('id').take(3).value()

                expect(ids).to.deep.eq([1, 2, 3])
            })
    })

    it('Cypress.Promise - instantiate a bluebird promise', () => {
        // https://on.cypress.io/promise
        let waited = false

        /**
         * @return Bluebird<string>
         */
        function waitOneSecond() {
            // return a promise that resolves after 1 second
            return new Cypress.Promise((resolve, reject) => {
                setTimeout(() => {
                    // set waited to true
                    waited = true

                    // resolve with 'foo' string
                    resolve('foo')
                }, 1000)
            })
        }

        cy.then(() => {
            // return a promise to cy.then() that
            // is awaited until it resolves
            return waitOneSecond().then((str) => {
                expect(str).to.eq('foo')
                expect(waited).to.be.true
            })
        })
    })
})

context('Navigation', () => {
    beforeEach(() => {
        cy.intercept('*', (req) => {req.headers['authorization'] = Cypress.env('token')})
        cy.visit('http://127.0.0.1:8080/profile')
    })

    it('cy.reload() - reload the page', () => {
        // https://on.cypress.io/reload
        cy.reload()

        // reload the page without using the cache
        cy.reload(true)
    })

    it('cy.visit() - visit a remote url', () => {
        // https://on.cypress.io/visit

        // Visit any sub-domain of your current domain

        // Pass options to the visit
        cy.visit('http://127.0.0.1:8080/profile', {
            timeout: 100000, // increase total time for the visit to resolve
            onBeforeLoad(contentWindow) {
                // contentWindow is the remote page's window object
                expect(typeof contentWindow === 'object').to.be.true
            },
            onLoad(contentWindow) {
                // contentWindow is the remote page's window object
                expect(typeof contentWindow === 'object').to.be.true
            },
        })
    })
})

context('Spies, Stubs, and Clock', () => {
    it('cy.spy() - wrap a method in a spy', () => {
        // https://on.cypress.io/spy
        cy.intercept('*', (req) => {req.headers['authorization'] = Cypress.env('token')})
        cy.visit('http://127.0.0.1:8080/profile')

        const obj = {
            foo() {
            },
        }

        const spy = cy.spy(obj, 'foo').as('anyArgs')

        obj.foo()

        expect(spy).to.be.called
    })

    it('cy.spy() retries until assertions pass', () => {
        cy.intercept('*', (req) => {req.headers['authorization'] = Cypress.env('token')})
        cy.visit('http://127.0.0.1:8080/profile')

        const obj = {
            /**
             * Prints the argument passed
             * @param x {any}
             */
            foo(x) {
                console.log('obj.foo called with', x)
            },
        }

        cy.spy(obj, 'foo').as('foo')

        setTimeout(() => {
            obj.foo('first')
        }, 500)

        setTimeout(() => {
            obj.foo('second')
        }, 2500)

        cy.get('@foo').should('have.been.calledTwice')
    })

    it('cy.stub() - create a stub and/or replace a function with stub', () => {
        // https://on.cypress.io/stub
        cy.intercept('*', (req) => {req.headers['authorization'] = Cypress.env('token')})
        cy.visit('http://127.0.0.1:8080/profile')

        const obj = {
            /**
             * prints both arguments to the console
             * @param a {string}
             * @param b {string}
             */
            foo(a, b) {
                console.log('a', a, 'b', b)
            },
        }

        const stub = cy.stub(obj, 'foo').as('foo')

        obj.foo('foo', 'bar')

        expect(stub).to.be.called
    })

})

context('Location', () => {
    beforeEach(() => {
        cy.intercept('*', (req) => {req.headers['authorization'] = Cypress.env('token')})
        cy.visit('http://127.0.0.1:8080/profile')
    })

    it('cy.hash() - get the current URL hash', () => {
        // https://on.cypress.io/hash
        cy.hash().should('be.empty')
    })

    it('cy.location() - get window.location', () => {
        // https://on.cypress.io/location
        cy.location().should((location) => {
            expect(location.hash).to.be.empty
            expect(location.href).to.eq('http://127.0.0.1:8080/profile')
            expect(location.host).to.eq('127.0.0.1:8080')
            expect(location.hostname).to.eq('127.0.0.1')
            expect(location.origin).to.eq('http://127.0.0.1:8080')
            expect(location.pathname).to.eq('/profile')
            expect(location.port).to.eq('8080')
            expect(location.protocol).to.eq('http:')
            expect(location.search).to.be.empty
        })
    })

    it('cy.url() - get the current URL', () => {
        // https://on.cypress.io/url
        cy.url().should('eq', 'http://127.0.0.1:8080/profile')
    })
})

context('Assertions', () => {
    beforeEach(() => {
        cy.intercept('*', (req) => {req.headers['authorization'] = Cypress.env('token')})
        cy.visit('http://127.0.0.1:8080/profile', {delay: 1000})
    })

    describe('Implicit Assertions', () => {
        it('.should() - make an assertion about the current subject', () => {
            // https://on.cypress.io/should
            cy.get('table').find('tr').should('have.text', 'Ім’яПоштаСтатьДата народженняorydoroha.mykhailo@gmail.comorydoroha.mykhailo@gmail.comЧоловіча22.03.2024ДатаПовне посиланняСкорочене19.02.2024, 20:41:49https://docs.google.com/spreadsheets/d/1fSdDs3n-u3sPUptQHSZV_938UHprxxi5DnI9J4TU210/edit#gid=339942321https://cutt.ly/HwBxEjVd')

            // a better way to check element's text content against a regular expression
            // is to use "cy.contains"
            // https://on.cypress.io/contains
            cy.get('table').find('tr')
                // finds first <td> element with text content matching regular expression
                .should('be.visible')

            // for more information about asserting element's text
            // see https://on.cypress.io/using-cypress-faq#How-do-I-get-an-element’s-text-contents
        })
    })

    describe('Explicit Assertions', () => {
        // https://on.cypress.io/assertions
        it('expect - make an assertion about a specified subject', () => {
            // We can use Chai's BDD style assertions
            expect(true).to.be.true
            const o = {foo: 'bar'}

            expect(o).to.equal(o)
            expect(o).to.deep.equal({foo: 'bar'})
            // matching text using regular expression
            expect('FooBar').to.match(/bar$/i)
        })

    })
})

