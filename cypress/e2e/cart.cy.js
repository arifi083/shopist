
import ProductsPage from "../page-objects/pages/ProductsPage"
import ProductDetailsPage from "../page-objects/pages/ProductDetailsPage"
import CartPage from "../page-objects/pages/CartPage"
import HomePage from "../page-objects/pages/HomePage"
import BasePage from "../page-objects/BasePage.js"
import Navbar from "../page-objects/components/navbar"
import Footer from "../page-objects/components/footer"





describe('Cart actions suite', () => {

    let chairsData
    beforeEach(function () {
        HomePage.load()
        cy.fixture('chair-data').then(function (data) {
            chairsData = data
            return chairsData
        })
    })


    it('Can add chair to cart from Header Menu', () => {
      
       Navbar.clickChairs()
       ProductsPage.isLoaded()
       ProductsPage.clickOnProduct(chairsData.product01)
       ProductDetailsPage.isLoaded()
       ProductDetailsPage.clickAddTocart()
       Navbar.verifyCartCount('(1)')
    })

    it('can add chair to cart from body categories',() =>{
        //cy.visit('https://shopist.io/')
        Navbar.clickLogo()
        HomePage.isLoaded()
        HomePage.clickChairsCard()
        ProductsPage.isLoaded()
        ProductsPage.clickOnProduct(chairsData.product02)
        ProductDetailsPage.isLoaded()
        ProductDetailsPage.clickAddTocart()
        Navbar.verifyCartCount('(1)')
    })

    it('can add chair to cart from footer menu',() =>{
        //cy.visit('https://shopist.io/')
        Footer.clickChairs()
        ProductsPage.isLoaded()
        ProductsPage.clickOnProduct(chairsData.product03)
        ProductDetailsPage.isLoaded()
        ProductDetailsPage.clickAddTocart()
        Navbar.verifyCartCount('(1)')
    })

    
    it('Can see same name & price in cart page as in detailed view', function () {
       // cy.visit('https://shopist.io/')
        Navbar.clickChairs()
        ProductsPage.clickOnProduct(chairsData.product04)
        cy.then(() => {
            ProductDetailsPage.invokeProductNameText()
            ProductDetailsPage.invokeProductPriceText()
            ProductDetailsPage.clickAddTocart()
            Navbar.verifyCartCount('(1)')
            Navbar.clickCart()
        }).then(() => {
            CartPage.verifyProductName(this.expectedName)
            CartPage.verifyProductPrice(this.expectedPrice)
        })
    })


    it('Can see same chair image in cart as in detailed page',() =>{
        //cy.visit('https://shopist.io/')
        Navbar.clickChairs()
        ProductsPage.clickOnProduct(chairsData.product05)
        ProductDetailsPage.clickAddTocart()
        cy.get(ProductDetailsPage.productImage).invoke('attr','src').then( ($expectedImage) =>{
            Navbar.clickCart()
            cy.get(CartPage.productImage).invoke('attr','src').then( ($actualImage) =>{
                expect($actualImage).to.equal($expectedImage)
            })
        })


        
    })


    it('Can see same multiple chair images in cart as in detailed page',() =>{
        //cy.visit('https://shopist.io/')
        Navbar.clickChairs()
        ProductsPage.clickOnProduct(chairsData.product01)
        ProductDetailsPage.clickAddTocart()
        cy.get(ProductDetailsPage.productImage).invoke('attr','src').then( ($expectedImage) =>{
            Navbar.clickCart()
            cy.get(CartPage.productImage).invoke('attr','src').then( ($actualImage) =>{
                expect($actualImage).to.equal($expectedImage)
                CartPage.removeOneQuantity()
            }).then(function(){
                Navbar.clickChairs()
                ProductsPage.isLoaded()
                ProductsPage.clickOnProduct(chairsData.product04)
                ProductDetailsPage.clickAddTocart()
                cy.get(ProductDetailsPage.productImage).invoke('attr','src').then( ($expectedImage01)=>{
                    Navbar.clickCart()
                    cy.get(CartPage.productImage).invoke('attr','src').then( ($actualImage01) =>{
                        expect($actualImage01).to.equal($expectedImage01)
                    })
                })
            })
        })


        
    })


    it('Can see cart count updating correctly in navbar',() =>{
        //cy.visit('https://shopist.io/cart')
        Navbar.clickChairs()
        ProductsPage.clickOnProduct(chairsData.product06)
        ProductDetailsPage.clickAddTocart()
        Navbar.verifyCartCount('(1)')
        Navbar.clickCart()
        CartPage.isLoaded()
        CartPage.addOneQuantity()
        Navbar.verifyCartCount('(2)')
        CartPage.removeOneQuantity()
        Navbar.verifyCartCount('(1)')

    })

    it('Can increase and decrease quantity in cart page',() =>{
       // cy.visit('https://shopist.io/cart')
        Navbar.clickChairs()
        ProductsPage.clickOnProduct(chairsData.product07)
        ProductDetailsPage.clickAddTocart()
        Navbar.clickCart()
        CartPage.verifyProductConter('1')
        CartPage.addOneQuantity()
        CartPage.addOneQuantity()
        CartPage.verifyProductConter('3')
        CartPage.removeOneQuantity()
        CartPage.verifyProductConter('2')

    })


    it('Can add multiple IN STOCK chairs to cart',() =>{
        //cy.visit('https://shopist.io/cart')
        Navbar.clickChairs()
        ProductsPage.clickOnProduct(chairsData.product01)
        ProductDetailsPage.clickAddTocart()
        Navbar.clickChairs()
        ProductsPage.clickOnProduct(chairsData.product03)
        ProductDetailsPage.clickAddTocart()
        Navbar.verifyCartCount('(2)')
        Navbar.clickCart()
        CartPage.isLoaded()
    })

    it('Can see SOLD OUT msg when trying to add sold-out chair to cart',() =>{
        //cy.visit('https://shopist.io/cart')
        Navbar.clickChairs()
        ProductsPage.isLoaded()
        ProductsPage.clickOnProduct(chairsData.product08)
        ProductsPage.verifySoldOutMessage()

    })

    it('Can see SOLD OUT msg when trying to add sold-out chair to cart',() =>{
       // cy.visit('https://shopist.io/cart')
        Navbar.clickChairs()
        ProductsPage.isLoaded()
        ProductsPage.clickOnProduct(chairsData.product09)
        ProductsPage.verifySoldOutMessage()
        cy.isVisible1(ProductsPage.soldOutModalContinueButton)
        ProductsPage.clickSoldOutContinue()
        cy.isVisible1(ProductsPage.productsPageLayout)

    })

    it('Can remove chair from cart and see empty cart message',() =>{
        //cy.visit('https://shopist.io/cart')
        Navbar.clickChairs()
        ProductsPage.isLoaded()
        ProductsPage.clickOnProduct(chairsData.product02)
        ProductDetailsPage.clickAddTocart()
        Navbar.clickCart()
        CartPage.isLoaded()
        CartPage.removeOneQuantity()
        CartPage.verifyEmptyCartMessage()
     
  
    })


  })

