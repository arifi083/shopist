export default class Navbar{
    static logo = "div[class='brand-large'] img"
    static chairs = '.chairs'
    static sofas = '.sofas'
    static bedding = '.bedding'
    static lighting = '.lighting'
    static cart = '.cart'

    static clickChairs() {
        cy.get(this.chairs).click({force: true})   
    }

    static clickSofas() {
        cy.get(this.sofas).click()   
    }

    static clickBedding() {
        cy.get(this.bedding).click()   
    }

    static clickLighting() {
        cy.get(this.lighting).click()   
    }

    static clickCart() {
        cy.get(this.cart).click({force: true})   
    }

    static clickLogo() {
        cy.get(this.logo).click({force: true})   
    }

    static verifyCartCount(number){
        cy.get(this.cart).should('contain.text', number)
    }
}