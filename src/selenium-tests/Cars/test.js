const {Builder, By, Key, until} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
require('chromedriver');
const assert = require('assert');

describe('testing-cars-functionality', function () {
    this.timeout(10000);
    let driver;
    let vars;

    beforeEach(async function () {
        try {
            let options = new chrome.Options();
            options.addArguments('--headless');
            options.addArguments('--no-sandbox');
            options.addArguments('--disable-dev-shm-usage');

            driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
            vars = {};
        } catch (error) {
            console.error("Error initializing WebDriver:", error);
            throw error;  // Rethrow the error to ensure Mocha captures it
        }
    });

    afterEach(async function () {
        if (driver) {
            try {
                await driver.quit();
            } catch (error) {
                console.error("Error quitting WebDriver:", error);
                throw error;  // Rethrow the error to ensure Mocha captures it
            }
        }
    });

    it('should show cars table', async function () {
        await driver.get("http://localhost:3000/");

        // Check if the Profile button exists (i.e., if the user is logged in)
        const profileButtonPresent = await driver.findElements(By.xpath("//button[contains(.,'Profile')]")).then(elements => elements.length > 0);

        // If the Profile button is not present, log in first
        if (!profileButtonPresent) {
            console.log('User is not logged in. Logging in now...');
            await driver.findElement(By.xpath("//button[contains(.,'Log In')]")).click();

            // Enter email and password
            await driver.findElement(By.id("email")).click();
            await driver.findElement(By.id("email")).sendKeys("admin@email.com");

            await driver.findElement(By.id("password")).click();
            await driver.findElement(By.id("password")).sendKeys("admin");

            await driver.findElement(By.xpath("//button[contains(.,'Login')]")).click();

            // Wait for the Profile button to appear (indicating a successful login)
            await driver.wait(until.elementLocated(By.xpath("//button[contains(.,'Profile')]")), 5000);
        }

        // Now, click the Profile button and navigate to the "CARS" section
        await driver.findElement(By.xpath("//button[contains(.,'Profile')]")).click();
        await driver.findElement(By.xpath("//a[contains(text(),'CARS')]")).click();

        // Wait for the cars table to appear
        await driver.wait(until.elementLocated(By.xpath("//*[@data-testid='cars-table']")), 5000);

        //Count the rows with cars
        const rows = await driver.findElements(By.xpath("//*[@data-testid='cars-table']/tbody/tr"));

        let validRowCount = 0;

        for (let row of rows) {
            const rowText = await row.getText();
            if (rowText.trim() !== "No data available") {
                validRowCount++;
            }
        }
        console.log("Number of valid rows: " + validRowCount);
    });
})