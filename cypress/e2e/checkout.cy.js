
import ProductsPage from "../page-objects/pages/ProductsPage"
import ProductDetailsPage from "../page-objects/pages/ProductDetailsPage"
import CartPage from "../page-objects/pages/CartPage"
import HomePage from "../page-objects/pages/HomePage"
import BasePage from "../page-objects/BasePage.js"
import Navbar from "../page-objects/components/navbar"
import Footer from "../page-objects/components/footer"






describe('Cart actions suite', () => {

    let products
    beforeEach(function () {
        HomePage.load()
        cy.fixture('chair-data').then(function (data) {
            products = data
            return products
        })
    })


    it('Can see error message on invalid coupon', () => {
       //cy.visit('https://shopist.io/')
       Navbar.clickChairs()
       ProductsPage.clickOnProduct(products.product02)
       ProductDetailsPage.clickAddTocart()
       Navbar.clickCart()
       CartPage.isLoaded()
       CartPage.enterCoupon('12345')
       CartPage.clickApply()
       BasePage.pause(1000)
       CartPage.validateErrorMessage()
    })

    it('Can see Total price remain same upon invalid coupon', () => {
       // cy.visit('https://shopist.io/')
        Navbar.clickChairs()
        ProductsPage.clickOnProduct(products.product02)
        ProductDetailsPage.clickAddTocart()
        Navbar.clickCart()
        CartPage.isLoaded()
        cy.get(CartPage.checkoutTotalPrice).invoke('text').as('$priceBeforeInvalidCoupon')
        CartPage.enterCoupon('12345')
        cy.get(CartPage.checkoutTotalPrice).invoke('text').as('$priceAfterInvalidCoupon')
        cy.then(function(){
            expect(this.$priceBeforeInvalidCoupon).to.equal(this.$priceAfterInvalidCoupon)
        })

     })

     it('Can enter only a max. of 15 characters in discounts box', () => {
       // cy.visit('https://shopist.io/')
        Navbar.clickChairs()
        ProductsPage.clickOnProduct(products.product02)
        ProductDetailsPage.clickAddTocart()
        Navbar.clickCart()
        CartPage.isLoaded()
        CartPage.enterCoupon('1212345123451234512345345')
        CartPage.clickApply()
        cy.get(CartPage.discountTextBox).invoke('attr','maxlength').should('match',new RegExp(15))
       
     })

   

   

    
   


   


   


   

   


   

   

    






    


  })

