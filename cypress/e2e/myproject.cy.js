/// <reference types= "cypress" />
Cypress.on("uncaught:exception", (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});

Cypress.Commands.add("visiturl", () => {
  let Websites = [
    "https://global.almosafer.com/ar",
    "https://global.almosafer.com/en",
  ];

  let RandomIndex = Math.floor(Math.random() * Websites.length);
  cy.visit(Websites[RandomIndex]);

  cy.get(".cta__saudi").click();
});

describe("TestCases ", () => {
  const TheDate = new Date();
  const today_date = TheDate.getDate();
  const expectedDepatureDate = today_date + 1;
  const expectedreturnDate = today_date + 2;
  console.log(TheDate);
  it("Randomly enter the website arabic or english ", () => {
    let Websites = [
      "https://global.almosafer.com/ar",  
      "https://global.almosafer.com/en",
    ];

    let RandomIndex = Math.floor(Math.random() * Websites.length);
    cy.visit(Websites[RandomIndex]);

    let ArabicCities = ["جدة", "دبي"];
    let ArabicRandomIndex = Math.floor(Math.random() * ArabicCities.length);
    let englishCities = ["riyadh", "dubai", "jeddah"];
    let EnglishRandomIndex = Math.floor(Math.random() * englishCities.length);

    cy.get(".cta__saudi").click();
    cy.get("#uncontrolled-tab-example-tab-hotels").click();
    if (RandomIndex == 0) {
      cy.get('[data-testid="AutoCompleteInput"]').type(
        ArabicCities[ArabicRandomIndex]
      );
    } else {
      cy.get('[data-testid="AutoCompleteInput"]').type(
        englishCities[EnglishRandomIndex]);}
     });
  it.skip("test the depature date + the return date ", () => {
    cy.visiturl();

    cy.get('[data-testid="FlightSearchBox__FromDateButton"] > .sc-eSePXt')
      .invoke("text")
      .then((elementText) => {
        expect(expectedDepatureDate).to.eql(parseInt(elementText.trim()));
      });0
    });
    it.skip("check the currency", () => {
      cy.visiturl();
  
      cy.get('[data-testid="Header__CurrencySelector"]')
        .invoke("text")
        .should("include", "SAR");
    });
    
 
    });
  

