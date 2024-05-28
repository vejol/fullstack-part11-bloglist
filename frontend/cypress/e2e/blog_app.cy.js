describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Silja Silvonen',
      username: 'siljasi',
      password: 'password123',
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user)
    cy.visit('')
  })

  it('Login form is shown', function () {
    cy.contains('log in')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('siljasi')
      cy.get('#password').type('password123')
      cy.get('#login-button').click()

      cy.contains('Silja Silvonen')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('siljasi')
      cy.get('#password').type('wrongPassword')
      cy.get('#login-button').click()

      cy.contains('wrong credentials')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'siljasi', password: 'password123' })
    })

    it('A blog can be created', function () {
      const newBlog = {
        title: 'My first food blog',
        author: 'Fiola Foodorer',
        url: 'www.fiolasfood.com',
      }
      cy.contains('new blog').click()
      cy.get('#title-input').type(newBlog.title)
      cy.get('#author-input').type(newBlog.author)
      cy.get('#url-input').type(newBlog.url)
      cy.get('#create-button').click()

      cy.contains(`${newBlog.title} ${newBlog.author}`)
    })

    describe('and when three blogs is added', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'My first food blog',
          author: 'Fiola Foodorer',
          url: 'www.fiolasfood.com',
        })

        cy.createBlog({
          title: 'My second food blog',
          author: 'Fiola Foodorer',
          url: 'www.fiolasfoodtwo.com',
        })

        cy.createBlog({
          title: 'Mountain bikes and adventures',
          author: 'Mauris Marittis',
          url: 'www.maurisbikes.com',
        })
      })

      it('pressing like button once add one like', function () {
        cy.contains('My first food blog').as('Blog')
        cy.get('@Blog').find('.view-button').click()
        cy.get('@Blog').parent().find('.like-button').click()
        cy.get('@Blog').parent().find('.likes-div').contains('1')
      })

      it('blog can be deleted by the preson who added it', function () {
        cy.contains('My first food blog').as('Blog')
        cy.get('@Blog').find('.view-button').click()
        cy.get('@Blog').parent().find('.remove-button').click()
        cy.get('html').should('not.contain', 'My first food blog')
      })

      it('remove button is visible only for user who added the blog', function () {
        const user2 = {
          name: 'Kalle Kalvanen',
          username: 'kalleka',
          password: 'kalle123',
        }
        cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user2)

        cy.get('#logout-button').click()
        cy.login({ username: 'kalleka', password: 'kalle123' })

        cy.contains('My first food blog').as('Blog')
        cy.get('@Blog').find('.view-button').click()
        cy.get('@Blog').parent().should('not.contain', 'remove')
      })

      it('blogs are arranged in descending order by likes', function () {
        cy.contains('My first food blog').as('Blog1')
        cy.contains('My second food blog').as('Blog2')
        cy.contains('Mountain bikes and adventures').as('Blog3')

        cy.get('@Blog1').find('.view-button').click()
        cy.get('@Blog1').parent().find('.like-button').click()
        cy.get('@Blog1').parent().find('.likes-div').contains('1')

        cy.get('@Blog2').find('.view-button').click()
        cy.get('@Blog2').parent().find('.like-button').click()
        cy.get('@Blog2').parent().find('.likes-div').contains('1')
        cy.get('@Blog2').parent().find('.like-button').click()
        cy.get('@Blog2').parent().find('.likes-div').contains('2')
        cy.get('@Blog2').parent().find('.like-button').click()
        cy.get('@Blog2').parent().find('.likes-div').contains('3')

        cy.get('@Blog3').find('.view-button').click()
        cy.get('@Blog3').parent().find('.like-button').click()
        cy.get('@Blog3').parent().find('.likes-div').contains('1')
        cy.get('@Blog3').parent().find('.like-button').click()
        cy.get('@Blog3').parent().find('.likes-div').contains('2')

        cy.get('.blog').eq(0).should('contain', 'My second food blog')
        cy.get('.blog').eq(1).should('contain', 'Mountain bikes and adventures')
        cy.get('.blog').eq(2).should('contain', 'My first food blog')
      })
    })
  })
})
