import { test, expect } from 'playwright/test';

//test('standard user can log in', async ({page}) =>{ // and async arrow function with page as object.

test.describe('Login',()=>{
    test.beforeEach(async ({page})=>{
        await page.goto('https://www.saucedemo.com');
    })



test('standard user can log  in', async ({page})=>{
 
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', {name: 'Login'}).click();
    
    await expect(page).toHaveURL(/inventory/);
    
    await expect(page.getByText('Products')).toBeVisible();

});

test('wrong password shows an error', async ({page})=>{
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('wrong_password');
    await page.getByRole('button', {name: 'Login'}).click(); 
    
    await expect(page.locator('[data-test="error"]')).toContainText("do not match");


});

test('locked out user cannot log in', async({page})=>{
    await page.getByPlaceholder('Username').fill('locked_out_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', {name: 'Login'}).click(); 

    await expect(page.locator('[data-test="error"]')).toContainText("locked out");
});

test('username is required',async({page}) =>{
    await page.getByRole('button',{name: 'Login'}).click();

    await expect(page.locator('[data-test="error"]')).toContainText("Username is required");
});

test('password is required', async({page})=>{
    await page.getByPlaceholder('password').fill('secret_sauce');
    await page.locator('[id="login-button"]').click();

    await expect(page.getByRole('alert')).toContainText("Username is required");
});

});