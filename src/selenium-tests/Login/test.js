const {Builder, By, until} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
require('chromedriver');
const assert = require('assert');

describe('testing-login-functionality', function () {
    this.timeout(30000);
    let driver;

    beforeEach(async function () {
        try {
            let options = new chrome.Options();
            options.addArguments('--headless');
            options.addArguments('--no-sandbox');
            options.addArguments('--disable-dev-shm-usage');

            driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
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

        // Wait for the email field to be visible before interacting with it
        const emailField = await driver.wait(until.elementLocated(By.id("email")), 5000); // Timeout after 5 seconds
        await emailField.click();
        await emailField.sendKeys("wrongemail@email.com");

        const passwordField = await driver.wait(until.elementLocated(By.id("password")), 5000); // Wait for password field
        await passwordField.sendKeys("wrongpassword");

        await driver.findElement(By.xpath("//button[contains(.,'Login')]")).click();

        // Wait for error message to appear
        await driver.wait(until.elementLocated(By.xpath("//*[@data-testid='error-message']")), 5000);

        // Optionally, assert that the error message is correct
        const errorMessage = await driver.findElement(By.xpath("//*[@data-testid='error-message']")).getText();
        assert.strictEqual(errorMessage, "Invalid credentials! Please try again.");
    });

    it('should log in and redirect to the homepage with Profile button', async function () {
        await driver.get("http://localhost:3000/");

        // Click on the "Log In" button
        await driver.findElement(By.xpath("//button[contains(.,'Log In')]")).click();

        // Wait for the email field to be visible before interacting with it
        const emailField = await driver.wait(until.elementLocated(By.id("email")), 5000); // Timeout after 5 seconds
        await emailField.click();
        await emailField.sendKeys("admin@email.com");

        const passwordField = await driver.wait(until.elementLocated(By.id("password")), 5000); // Wait for password field
        await passwordField.click();
        await passwordField.sendKeys("admin");

        await driver.findElement(By.xpath("//button[contains(.,'Login')]")).click();

        // Wait for the page to load and ensure the URL is the homepage
        await driver.wait(async function () {
            return await driver.getCurrentUrl() === "http://localhost:3000/";
        }, 5000); // Wait up to 5 seconds for the URL to match

        // Verify that the "Log In" button is no longer present and "Profile" button is displayed
        const profileButton = await driver.findElement(By.xpath("//button[contains(.,'Profile')]"));
        const loginButton = await driver.findElements(By.xpath("//button[contains(.,'Log In')]"));

        assert(profileButton.isDisplayed(), "Profile button should be visible after login.");
        assert.strictEqual(loginButton.length, 0, "Log In button should not be visible after login.");
    });

    it('should show error when both email and password are not filled', async function () {
        await driver.get("http://localhost:3000/");

        // Click on the "Log In" button
        await driver.findElement(By.xpath("//button[contains(.,'Log In')]")).click();

        // Click the "Login" button without filling in the email and password
        const loginButton = await driver.wait(until.elementLocated(By.xpath("//button[contains(.,'Login')]")), 5000); // Wait up to 5 seconds
        await loginButton.click();

        // Wait for the error messages to appear
        await driver.wait(until.elementLocated(By.xpath("//p[contains(.,'* Email is required')]")), 5000);
        await driver.wait(until.elementLocated(By.xpath("//p[contains(.,'* Password is required')]")), 5000);

        // Assert that error messages are displayed
        const emailError = await driver.findElement(By.xpath("//p[contains(.,'* Email is required')]")).getText();
        const passwordError = await driver.findElement(By.xpath("//p[contains(.,'* Password is required')]")).getText();

        assert.strictEqual(emailError, "* Email is required", "Error message for empty email field should be displayed.");
        assert.strictEqual(passwordError, "* Password is required", "Error message for empty password field should be displayed.");
    });

    it('should disable the login button after form submit', async function () {
        await driver.get("http://localhost:3000/");

        // Click on the "Log In" button
        await driver.findElement(By.xpath("//button[contains(.,'Log In')]")).click();

        // Wait for the email field to be visible before interacting with it
        const emailField = await driver.wait(until.elementLocated(By.id("email")), 5000); // Timeout after 5 seconds
        await emailField.click();
        await emailField.sendKeys("user@email.com");

        const passwordField = await driver.wait(until.elementLocated(By.id("password")), 5000); // Wait for password field
        await passwordField.click();
        await passwordField.sendKeys("password");

        // Find the login button
        const loginButton = await driver.findElement(By.xpath("//button[contains(.,'Login')]"));

        // Click the button and wait
        await loginButton.click();

        // Wait for the login button to be disabled after submission
        await driver.wait(until.elementIsDisabled(loginButton), 5000, "Login button should be disabled after submission.");

        // Check if the button is disabled
        const isEnabled = await loginButton.isEnabled();
        assert.strictEqual(isEnabled, false, 'The login button should be disabled after submitting the form.');
    });
});
