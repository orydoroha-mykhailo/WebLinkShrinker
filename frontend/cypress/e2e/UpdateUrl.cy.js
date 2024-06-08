/* eslint-disable no-undef */
// updatecontactView.vue testing
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
        cy.intercept('*', (req) => {
            req.headers['authorization'] = Cypress.env('token')
        })
        cy.visit('http://127.0.0.1:8080/')
        cy.visit('http://127.0.0.1:8080/update-url/4')
        cy.visit('http://127.0.0.1:8080/signup')
        cy.visit('http://127.0.0.1:8080/signin')
    })
})

describe('Text', () => {
    it('Visits the app root url', () => {
        cy.intercept('*', (req) => {
            req.headers['authorization'] = Cypress.env('token')
        })
        cy.visit('http://127.0.0.1:8080/update-url/4')
        cy.contains('h3', 'Оновлення даних')
    })
})

context('Window', () => {
    beforeEach(() => {
        cy.intercept('*', (req) => {
            req.headers['authorization'] = Cypress.env('token')
        })
        cy.visit('http://127.0.0.1:8080/update-url/4')
    })

    it('cy.window() - get the global window object', () => {
        // https://on.cypress.io/window
        cy.window().should('have.property', 'top')
    })

    it('cy.document() - get the document object', () => {
        // https://on.cypress.io/document
        cy.document().should('have.property', 'charset').and('eq', 'UTF-8')
    })

    it('cy.title() - get the title', () => {
        // https://on.cypress.io/title
        cy.title().should('include', 'vue_frontend')
    })
})

context('Posts actions', () => {
    beforeEach(() => {
        cy.intercept('*', (req) => {
            req.headers['authorization'] = Cypress.env('token')
        })
        cy.visit('http://127.0.0.1:8080/update-url/4')
    })


    it('.type() - type into a DOM element', () => {
        // https://on.cypress.io/type
        cy.get('input#url_long').clear()
            .type('llllllllllllllllllllong.com').should('have.value', 'llllllllllllllllllllong.com')

            // .type() with special character sequences
            .type('{leftarrow}{rightarrow}{uparrow}{downarrow}')
            .type('{del}{selectall}{backspace}')

            // .type() with key modifiers
            .type('{alt}{option}') //these are equivalent
            .type('{ctrl}{control}') //these are equivalent
            .type('{meta}{command}{cmd}') //these are equivalent
            .type('{shift}')

            // Delay each keypress by 0.1 sec
            .type('slowllllllllllllllllllllong.com', {delay: 100})
            .should('have.value', 'slowllllllllllllllllllllong.com')

        cy.get('input#url_short').clear()
            .type('short.com').should('have.value', 'short.com')

            // .type() with special character sequences
            .type('{leftarrow}{rightarrow}{uparrow}{downarrow}')
            .type('{del}{selectall}{backspace}')

            // .type() with key modifiers
            .type('{alt}{option}') //these are equivalent
            .type('{ctrl}{control}') //these are equivalent
            .type('{meta}{command}{cmd}') //these are equivalent
            .type('{shift}')

            // Delay each keypress by 0.1 sec
            .type('slowshort.com', {delay: 100})
            .should('have.value', 'slowshort.com')

        cy.get('input#dob').clear()
            .type('1992-12-12').should('have.value', '1992-12-12')

            // Delay each keypress by 0.1 sec
            .type('1992-12-12', {delay: 100})
            .should('have.value', '1992-12-12')

    })

    it('.submit() - submit a form', () => {
        // https://on.cypress.io/submit

        cy.get('form#form').submit()

        // cy.contains('A user with this email and password was not found.')
    })
})

context('Viewport', () => {
    beforeEach(() => {
        cy.intercept('*', (req) => {
            req.headers['authorization'] = Cypress.env('token')
        })
        cy.visit('http://127.0.0.1:8080/update-url/4')
    })

    it('cy.viewport() - set the viewport size and dimension', () => {
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
        cy.intercept('*', (req) => {
            req.headers['authorization'] = Cypress.env('token')
        })
        cy.visit('http://127.0.0.1:8080/update-url/4')
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
        cy.intercept('*', (req) => {
            req.headers['authorization'] = Cypress.env('token')
        })
        cy.visit('http://127.0.0.1:8080/update-url/4')
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
        cy.visit('http://127.0.0.1:8080/update-url/4', {
            timeout: 50000, // increase total time for the visit to resolve
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
        cy.intercept('*', (req) => {
            req.headers['authorization'] = Cypress.env('token')
        })
        cy.visit('http://127.0.0.1:8080/update-url/4')

        const obj = {
            foo() {
            },
        }

        const spy = cy.spy(obj, 'foo').as('anyArgs')

        obj.foo()

        expect(spy).to.be.called
    })

    it('cy.spy() retries until assertions pass', () => {
        cy.intercept('*', (req) => {
            req.headers['authorization'] = Cypress.env('token')
        })
        cy.visit('http://127.0.0.1:8080/update-url/4')

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

    it('cy.stub() - update a stub and/or replace a function with stub', () => {
        // https://on.cypress.io/stub
        cy.intercept('*', (req) => {
            req.headers['authorization'] = Cypress.env('token')
        })
        cy.visit('http://127.0.0.1:8080/update-url/4')

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
        cy.intercept('*', (req) => {
            req.headers['authorization'] = Cypress.env('token')
        })
        cy.visit('http://127.0.0.1:8080/update-url/4')
    })

    it('cy.hash() - get the current URL hash', () => {
        // https://on.cypress.io/hash
        cy.hash().should('be.empty')
    })

    it('cy.location() - get window.location', () => {
        // https://on.cypress.io/location
        cy.location().should((location) => {
            expect(location.hash).to.be.empty
            expect(location.href).to.eq('http://127.0.0.1:8080/update-url/4')
            expect(location.host).to.eq('127.0.0.1:8080')
            expect(location.hostname).to.eq('127.0.0.1')
            expect(location.origin).to.eq('http://127.0.0.1:8080')
            expect(location.pathname).to.eq('/update-url/4')
            expect(location.port).to.eq('8080')
            expect(location.protocol).to.eq('http:')
            expect(location.search).to.be.empty
        })
    })

    it('cy.url() - get the current URL', () => {
        // https://on.cypress.io/url
        cy.url().should('eq', 'http://127.0.0.1:8080/update-url/4')
    })
})
  