const { expect } = require("chai");
const { Given} = require("@cucumber/cucumber");
const { Builder, By, Key, until, sleep } = require("selenium-webdriver");
const { delay } = require("../utils/delay");

Given("Test Register functionality", { timeout: 30000 }, async function () {
    let driver = await new Builder().forBrowser("chrome").build();
    await driver.get("http://localhost:3000/register");
    await driver.findElement(By.id("floatingInputFirst")).sendKeys("test");
    await driver.findElement(By.id("floatingInputLast")).sendKeys("test");
    await driver.findElement(By.id("floatingInput")).sendKeys("test@gmail.com");
    await driver.findElement(By.id("floatingPassword")).sendKeys("test1234");
    //await driver.findElement(By.id("floatingInputFirst")).sendKeys("test");
    await driver.sleep(delay);
    await driver.findElement(By.id("register1")).click();

    await driver.wait(until.elementLocated(By.id("register1")),3000);
    expect(await driver.wait(until.elementLocated(By.id("register1"))));
    // await driver.quit();

});

Given("Test Login functionality", { timeout: 30000 }, async function () {
    let driver = await new Builder().forBrowser("chrome").build();
    await driver.get("http://localhost:3000/login");
    await driver.findElement(By.id("floatingInput")).sendKeys("test@gmail.com");
    await driver.findElement(By.id("floatingPassword")).sendKeys("test1234");
    //await driver.findElement(By.id("floatingInputFirst")).sendKeys("test");
    await driver.sleep(delay);
    await driver.findElement(By.id("login1")).click();

    await driver.wait(until.elementLocated(By.id("login1")),3000);
    expect(await driver.wait(until.elementLocated(By.id("login1"))));
    // await driver.quit();

});