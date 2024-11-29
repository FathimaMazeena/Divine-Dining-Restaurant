import { Builder, By, until } from 'selenium-webdriver';
import { expect } from 'chai';

describe('Delete Product', function () {
  this.timeout(60000);
  let driver;

  before(async function () {
    driver = await new Builder().forBrowser('chrome').build();
  });

  after(async function () {
    await driver.quit(); 
  });


it('should delete a product successfully', async function () {
    await driver.get('http://localhost:5173/products');
  
    // Wait for the first row and the delete button to be visible
    await driver.wait(until.elementLocated(By.xpath('//table/tbody/tr[1]')), 60000);
    const deleteButton = await driver.findElement(By.xpath('//table/tbody/tr[1]//button[contains(@class, "delete-button")]'));
    await driver.wait(until.elementIsVisible(deleteButton), 60000);
    await deleteButton.click();
  
    // Handle the alert confirmation
    const alert = await driver.switchTo().alert();
    const alertText = await alert.getText();
    await alert.accept();
  
    expect(alertText).to.include('Product Deleted Successfully');
  });

}); 

