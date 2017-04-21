// spec.js
describe('angularjs homepage', function() {

 it('should have a title', function() {
    browser.get('http://localhost:3000/');
    expect(browser.getTitle()).toEqual('Mafia Maska');
    element(by.id('idLogin')).click();
    element(by.id('dialogUsername')).sendKeys('username');
    element(by.id('dialogPassword')).sendKeys('username');
    element(by.id('dialogLogin')).click();
  });
});
