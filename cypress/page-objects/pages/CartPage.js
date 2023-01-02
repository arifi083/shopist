
import BasePage from "../BasePage"

export default class CartPage extends BasePage {

    static productSection = 'div.products'
    static productName = '.product-description > :nth-child(1)'
    static productPrice = '.price'
    static productImage = "[class='product-picture']"
    static minusButton = '.product-counter > :nth-child(1) > :nth-child(1)'
    static plusButton = '.product-counter > :nth-child(1) > :nth-child(3) > div'
    static productCounter = '.product-counter > :nth-child(1) > :nth-child(2)'
    static noProductInCart ='[class="no-products"]'
    static discountTextBox = '[placeholder="Discount code"]'
    static appyButton = '[class="discount"]>div'
    static coupnMessage ='[class="discount-toast"]'
    static checkoutTotalPrice = '.line-total>:nth-child(2)'
    
   
    static verifyProductName(expectedName){
       cy.get(this.productName).should('contain.text',expectedName)
    }

    static verifyProductPrice(expectedPrice){
        cy.get(this.productPrice).should('contain.text',expectedPrice)
    }

    static removeOneQuantity(){
        cy.get(this.minusButton).click()
    }

    static addOneQuantity(){
        cy.get(this.plusButton).click()
    }

    static isLoaded(){
        cy.isVisible1(this.productSection);
    }

    static verifyProductConter(expectedCount){
        cy.get(this.productCounter).should('contain.text',expectedCount)
    }

    static verifyEmptyCartMessage(){
        cy.isVisible1(this.noProductInCart)
    }

    static enterCoupon(code){
        cy.get(this.discountTextBox).type(code)
    }

    static clickApply(){
        cy.get(this.appyButton).click()
    }

    static validateErrorMessage(){
        let message;
        cy.fixture('messages').then( (data)=>{
            message = data.invalidCouponMessage
        }).then( ()=>{
            cy.get(this.coupnMessage).should('contain.text',message)
        })
    }




}