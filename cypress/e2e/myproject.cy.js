/// <reference types="cypress"/>

Cypress.on('uncaught:expection',(err ,runnable)=>{
  return false;
  
  });
  
  Cypress.Commands.add("visiturl",()=>{
  
      let Websites =[
      "https://global.almosafer.com/ar",
      "https://global.almosafer.com/en",
    ];
  
  
      let RandomIndex = Math.floor(Math.random()*Websites.length);
       cy.visit(Websites[RandomIndex]);
       
       cy.get('.cta__saudi').click();
  });

  describe('Aspire Testcases', () => {
  
    const TheDate =new Date();
  
    const today_date=TheDate.getDate();
    const expectedDepartureDate = today_date + 1;
    const expectedreturnDate =today_date + 2;
    console.log(TheDate);
  
    it.skip('randonmly enter the website arabic or english', () => {
  
      let Websites =["https://global.almosafer.com/ar",
      "https://global.almosafer.com/en"]
      let RandomIndex = Math.floor(Math.random()*Websites.length)
       cy.visit(Websites[RandomIndex])
       let ArabicCities =["جدة","دبي"]
       let ArabicRandomTndex = Math.floor(Math.random()*ArabicCities.length)
       let englishCities =["dubai","jeddah","riyadh"]
       let EnglishRandomTndex = Math.floor(Math.random()*englishCities.length)
  
      cy.get('.cta__saudi').click()
      cy.get('#uncontrolled-tab-example-tab-hotels > .sc-dWcDbm').click()
      if(RandomIndex==0){
        cy.get('[data-testid="AutoCompleteInput"]').type(ArabicCities[ArabicRandomTndex]);
      }else{
       cy.get('[data-testid="AutoCompleteInput"]').type(englishCities[EnglishRandomTndex]);
       }
    });
   
    it('test the depature date + the return date ', () => {
      cy.visiturl();
   cy.get('[data-testid="FlightSearchBox__FromDateButton"] > .sc-eSePXt')
        .invoke("text")
        .then((elementText) => {
          expect(expectedDepartureDate).to.eql(parseInt(elementText.trim()));
        });
    });
  });
  