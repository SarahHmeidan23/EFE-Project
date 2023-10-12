/// <reference types="cypress"/>

Cypress.on("uncaught:expection", (err, runnable) => {
  return false;
});
const ExpectedCurrancy = "SAR";
let websites = ["https://www.almosafer.com/en", "https://www.almosafer.com/ar"];
let RandomIndex = Math.floor(Math.random() * websites.length);
let DataEnglish = ["Dubai", "Jaddah", "Doha"];
let RandomEnglish = Math.floor(Math.random() * DataEnglish.length);
let DataArabic = ["دبي", "رياض", "ابو ظبي"];
let RandomArabic = Math.floor(Math.random() * DataArabic.length);

describe("testcases", () => {
  const TheDate = new Date();
  const today_date = TheDate.getDate();
  const expectedDepartureDate = today_date + 1;
  const expectedreturnDate = today_date + 2;
  console.log(TheDate);

  it.skip("test the currency is SAR", () => {
    cy.visit("https://www.almosafer.com/en");
    cy.get(".cta__saudi").click();
    cy.get('[data-testid="Header__CurrencySelector"]')
      .invoke("text")
      .should("include", ExpectedCurrancy);
  });
  it.skip("check the language of the website", () => {
    cy.visit("https://www.almosafer.com/en");
    cy.get(".cta__saudi").click();
    cy.get("html").should("have.attr", "lang", "en");
  });
  it.skip("randomly enter the website arabic or english", () => {
    cy.visit(websites[RandomIndex]);
    cy.get(".cta__saudi").click();
    cy.get("#uncontrolled-tab-example-tab-hotels").click();
    if (RandomIndex == 0) {
      cy.get('[data-testid="AutoCompleteInput"]').type(
        DataEnglish[RandomEnglish]
      );
    } else {
      cy.get('[data-testid="AutoCompleteInput"]').type(
        DataArabic[RandomArabic]
      );
    }
  });
  it.skip("test to add second option", () => {
    cy.visit(websites[0]);
    cy.get(".cta__saudi").click();
    cy.get("#uncontrolled-tab-example-tab-hotels").click();
    cy.get('[data-testid="AutoCompleteInput"]').type("Dubai");
    cy.get('[data-testid="AutoCompleteResultItem1"] > .sc-12clos8-5').click();
    cy.get('[data-testid="HotelSearchBox__SearchButton"]').click();
  });
  it.skip("test the depature date + the return date", () => {
    cy.visit(websites[RandomIndex]);
    cy.get(".cta__saudi").click();
    cy.get('[data-testid="FlightSearchBox__FromDateButton"] > .sc-eSePXt')
      .invoke("text")
      .then((elementText) => {
        expect(expectedDepartureDate).to.eql(parseInt(elementText.trim()));
      });
    // cy.get('[data-testid="FlightSearchBox__FromDateButton"] > .sc-eSePXt').invoke("text").should("include",expectedDepartureDate)
  });
  it('test the price(low-high) ', () => { 
    cy.visit(websites[RandomIndex]);
    cy.get(".cta__saudi").click();
    cy.get("#uncontrolled-tab-example-tab-hotels").click();
    if (RandomIndex == 0) {
      cy.get('[data-testid="AutoCompleteInput"]').type(
        DataEnglish[RandomEnglish]
      );
    } else {
      cy.get('[data-testid="AutoCompleteInput"]').type(
        DataArabic[RandomArabic]
      );
    }
    cy.get('[data-testid="HotelSearchBox__SearchButton"]').click()
    cy.get('[data-testid="HotelSearchResult__sort__LOWEST_PRICE"]').click()

    cy.get('.Price__Value').first().invoke('text').then(parseInt).then((firstElement)=>{
      cy.get('.Price__Value').last().invoke('text').then(parseInt).then((lastElement)=>{
        expect(firstElement).to.be.lessThan(lastElement)
      })
    })
 

    
  });
});