/* eslint-disable no-undef */
describe('Submits form', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })
  it('Fills out forms correctly', () => {
    cy.get('[data-cy="name"]').type("Sara Evergreen").should("have.value", "Sara Evergreen")
    cy.get('[data-cy="email"]').type("s_evergreen@email.com").should("have.value", "s_evergreen@email.com")
    cy.get('[data-cy="password"]').type("abcdef").should("have.value", "abcdef")
    cy.get('[data-cy="jobs"]').select("photographer").should("have.value", "photographer")
    cy.get('[data-cy="tos"]').check().should("be.checked")
    cy.get('[data-cy="submit"]').click()
  })
})