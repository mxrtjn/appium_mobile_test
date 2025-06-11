describe("Login Demo", () => {
    beforeEach(async () => {

        const button =  await $(
            '//android.widget.Button[@resource-id="android:id/button1"]'
          );
        const isDisplayed = await button.isDisplayed();

        if(isDisplayed){
            button.click();
        }
       

      //Access the hamburguer/toggle button by its accessibility id
      await $("~open menu").click();
      //Access the login left menu option by its text
      await $('//*[@text="Log In"]').click();
    });
  
    it("no deberia loguear con credenciales invalidas", async () => {
      //Access the username input element by its content-desc
      await $('//*[@content-desc="Username input field"]').setValue("wrongUser");
      //Access the username input element by its class + content-desc
      await $(
        '//android.widget.EditText[@content-desc="Password input field"]'
      ).setValue("wrongPassword");
      //Access the login button by the default xpath
      await $(
        '//android.view.ViewGroup[@content-desc="Login button"]/android.widget.TextView'
      ).click();
      await driver.pause(3000);
  
      //Validate the error message
      await expect(
        $(
          '//android.view.ViewGroup[@content-desc="generic-error-message"]/android.widget.TextView'
        )
      ).toHaveText("Provided credentials do not match any user in this service.");
    });
  
    it("debe loguear con credenciales validas", async () => {
      //Access the username input element by its content-desc
      await $('//*[@content-desc="Username input field"]').setValue(
        "bob@example.com"
      );
      //Access the username input element by its class + content-desc
      await $(
        '//android.widget.EditText[@content-desc="Password input field"]'
      ).setValue("10203040");
      //Access the login button by the default xpath
      await $(
        '//android.view.ViewGroup[@content-desc="Login button"]/android.widget.TextView'
      ).click();
      const selector =
        'new UiSelector().text("Products").className("android.widget.TextView")';
      const productsUISelector = await $(`android=${selector}`);
      await expect(productsUISelector).toHaveText("Products");
    });
  });