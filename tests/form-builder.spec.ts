import { test, expect } from "@playwright/test";
import { FormBuilderPage } from "./pages/FormBuilderPage";

test.describe("Form Builder Application", () => {
  let formBuilderPage: FormBuilderPage;

  test.beforeEach(async ({ page }) => {
    formBuilderPage = new FormBuilderPage(page);
    await formBuilderPage.goto();
  });

  test("should display all panels", async () => {
    await expect(formBuilderPage.configurationPanel).toBeVisible();
    await expect(formBuilderPage.previewPanel).toBeVisible();
    await expect(formBuilderPage.generatedCodePanel).toBeVisible();
  });

  test("should update form configuration and preview", async () => {
    await formBuilderPage.setFormConfiguration(
      "Email Address",
      "Enter your email"
    );
    await expect(
      formBuilderPage.page.getByLabel("Email Address")
    ).toBeVisible();
    await expect(
      formBuilderPage.page.getByRole("textbox", { name: "Email Address" })
    ).toHaveAttribute("placeholder", "Enter your email");
  });

  test("should generate and copy code", async () => {
    await formBuilderPage.setFormConfiguration(
      "Full Name",
      "Enter your full name"
    );
    const code = await formBuilderPage.getGeneratedCode();
    expect(code).toContain("Full Name");
    expect(code).toContain("Enter your full name");

    await formBuilderPage.copyCode();
  });

  test("should maintain form state after updates", async () => {
    expect(await formBuilderPage.getFormLabel()).toBe("Username");
    expect(await formBuilderPage.getFormPlaceholder()).toBe(
      "Enter your username"
    );

    await formBuilderPage.setFormConfiguration(
      "Password",
      "Enter your password"
    );

    expect(await formBuilderPage.getFormLabel()).toBe("Password");
    expect(await formBuilderPage.getFormPlaceholder()).toBe(
      "Enter your password"
    );
  });
});
