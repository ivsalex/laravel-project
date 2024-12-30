const {Builder, By, Key, until} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
require('chromedriver');
const assert = require('assert');

describe('testing-login-functionality', function () {
    this.timeout(30000);
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

    it('should show error when credentials are wrong', async function () {
        await driver.get("http://localhost:3000/");

        // Click login button
        await driver.findElement(By.xpath("//button[contains(.,'Log In')]")).click();

        // Input invalid email and password
        await driver.findElement(By.id("email")).click();
        await driver.findElement(By.id("email")).sendKeys("wrongemail@email.com");
        await driver.findElement(By.id("password")).sendKeys("wrongpassword");
        await driver.findElement(By.xpath("//button[contains(.,'Login')]")).click();

        // Wait for error message to appear
        await driver.wait(until.elementLocated(By.xpath("//*[@data-testid='error-message']")), 5000);

        // Optionally, assert that the error message is correct
        const errorMessage = await driver.findElement(By.xpath("//*[@data-testid='error-message']")).getText();
        assert.strictEqual(errorMessage, "Invalid credentials! Please try again.");
    });

    it('should log in and redirect to the homepage with Profile button', async function () {
        // Navigate to the homepage
        await driver.get("http://localhost:3000/");

        // Click on the "Log In" button
        await driver.findElement(By.xpath("//button[contains(.,'Log In')]")).click();

        // Enter email and password
        await driver.findElement(By.id("email")).click();
        await driver.findElement(By.id("email")).sendKeys("admin@email.com");

        await driver.findElement(By.id("password")).click();
        await driver.findElement(By.id("password")).sendKeys("admin");

        // Click the login button
        await driver.findElement(By.xpath("//button[contains(.,'Login')]")).click();

        // Wait for the page to load and ensure the URL is the homepage
        await driver.wait(async function () {
            return await driver.getCurrentUrl() === "http://localhost:3000/";
        }, 5000); // Wait up to 5 seconds for the URL to match

        // Verify that the "Log In" button is no longer present and "Profile" button is displayed
        const profileButton = await driver.findElement(By.xpath("//button[contains(.,'Profile')]"));
        const loginButton = await driver.findElements(By.xpath("//button[contains(.,'Log In')]"));

        // Assert that the Profile button is visible and the Log In button is no longer visible
        assert(profileButton.isDisplayed(), "Profile button should be visible after login.");
        assert.strictEqual(loginButton.length, 0, "Log In button should not be visible after login.");
    });

    it('should show error when both email and password are not filled', async function () {
        // Navigate to the homepage
        await driver.get("http://localhost:3000/");

        // Click on the "Log In" button
        await driver.findElement(By.xpath("//button[contains(.,'Log In')]")).click();

        // Click the "Login" button without filling in the email and password
        await driver.findElement(By.xpath("//button[contains(.,'Login')]")).click();

        // Wait for a short moment to ensure the error message is rendered
        await driver.sleep(500);

        // Find the error messages for both email and password
        const emailErrorElements = await driver.findElements(By.xpath("//p[contains(.,'* Email is required')]"));
        const passwordErrorElements = await driver.findElements(By.xpath("//p[contains(.,'* Password is required')]"));

        // Assert that both error messages are displayed
        assert(emailErrorElements.length > 0, "Error message for empty email field should be displayed.");
        assert(passwordErrorElements.length > 0, "Error message for empty password field should be displayed.");
    });

    it('should disable the login button after form submit', async function () {
        // Navigate to the homepage
        await driver.get("http://localhost:3000/");

        // Click on the "Log In" button
        await driver.findElement(By.xpath("//button[contains(.,'Log In')]")).click();

        // Enter email and password
        await driver.findElement(By.id("email")).click();
        await driver.findElement(By.id("email")).sendKeys("user@email.com");

        await driver.findElement(By.id("password")).click();
        await driver.findElement(By.id("password")).sendKeys("password");

        // Find the login button
        const loginButton = await driver.findElement(By.xpath("//button[contains(.,'Login')]"));

        // Click the button and wait
        await loginButton.click();
        await driver.sleep(1000);

        // Check if the button is disabled
        const isEnabled = await loginButton.isEnabled();
        assert.strictEqual(isEnabled, false, 'The login button should be disabled after submitting the form.');
    });
});