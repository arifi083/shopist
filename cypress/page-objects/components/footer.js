export default class Footer {
    
    static chairs = '.departments >:nth-child(1) >a'
    static sofas = '.departments >:nth-child(2) >a'
    static bedding = '.departments >:nth-child(3) >a'
    static lighting = '.departments >:nth-child(4) >a'
   

    static clickChairs() {
        cy.get(this.chairs).click()   
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

   

    
}