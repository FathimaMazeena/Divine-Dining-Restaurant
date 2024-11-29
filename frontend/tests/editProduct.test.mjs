import { Builder, By, until } from 'selenium-webdriver';
import { expect } from 'chai';

describe('Edit Product', function () {
  this.timeout(60000);
  let driver;

  before(async function () {
    driver = await new Builder().forBrowser('chrome').build();
  });

  after(async function () {
    await driver.quit(); 
  });


  it('should edit a product successfully', async function () {
    await driver.get('http://localhost:5173/products'); 
  
    // Wait for the first row and the edit button to be visible
    await driver.wait(until.elementLocated(By.xpath('//table/tbody/tr[1]')), 60000);
    const editButton = await driver.findElement(By.xpath('//table/tbody/tr[1]//button[contains(@class, "edit-button")]'));
    await driver.wait(until.elementIsVisible(editButton), 60000);
    await editButton.click();
  
    // Continue with editing the product
    const productNameInput = await driver.findElement(By.name('productName'));
    await productNameInput.clear();
    await productNameInput.sendKeys('Updated Test Product');
    
    const descriptionInput = await driver.findElement(By.name('description'));
    await descriptionInput.clear();
    await descriptionInput.sendKeys('This is an updated test product.');
  
    const priceInput = await driver.findElement(By.name('price'));
    await priceInput.clear();
    await priceInput.sendKeys('15.99');
  
    const stockLevelInput = await driver.findElement(By.name('stockLevel'));
    await stockLevelInput.clear();
    await stockLevelInput.sendKeys('100');
  
    const imageInput = await driver.findElement(By.id('file-input'));
    await imageInput.sendKeys('C:/Users/Mazeena/OneDrive/Desktop/updatedtest.png');
  
    const updateButton = await driver.findElement(By.className('update-product-button'));
    await updateButton.click();
  
    const alert = await driver.switchTo().alert();
    const alertText = await alert.getText();
    await alert.accept();
  
    expect(alertText).to.include('Product Updated Successfully');
  });
  
}); 
