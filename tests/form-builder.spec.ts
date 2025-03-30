import { test, expect } from "@playwright/test";

test.describe("Form Builder Application", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5174");

    await Promise.all([
      page.waitForLoadState("domcontentloaded"),
      page.waitForSelector(".form-builder", {
        state: "visible",
        timeout: 30000,
      }),
    ]);
  });

  test("should display all panels", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Configuration" })
    ).toBeVisible({
      timeout: 10000,
    });
    await expect(page.getByRole("heading", { name: "Preview" })).toBeVisible({
      timeout: 10000,
    });
    await expect(
      page.getByRole("heading", { name: "Generated Code" })
    ).toBeVisible({
      timeout: 10000,
    });
  });

  test("should update form configuration and preview", async ({ page }) => {
    await page.getByLabel("Label:").fill("Email Address");
    await expect(page.getByLabel("Email Address")).toBeVisible();

    await page.getByLabel("Placeholder:").fill("Enter your email");
    await expect(
      page.getByRole("textbox", { name: "Email Address" })
    ).toHaveAttribute("placeholder", "Enter your email");
  });

  test("should generate and copy code", async ({ page }) => {
    await page.getByLabel("Label:").fill("Full Name");
    await page.getByLabel("Placeholder:").fill("Enter your full name");

    const codeOutput = page.locator("pre.code-output code");
    await expect(codeOutput).toContainText("Full Name");
    await expect(codeOutput).toContainText("Enter your full name");

    const copyButton = page.getByRole("button", { name: "Copy Code" });

    page.on("dialog", async (dialog) => {
      expect(dialog.message()).toBe("Code copied to clipboard!");
      await dialog.accept();
    });

    await copyButton.click();
  });

  test("should maintain form state after updates", async ({ page }) => {
    await expect(page.getByLabel("Label:")).toHaveValue("Username");
    await expect(page.getByLabel("Placeholder:")).toHaveValue(
      "Enter your username"
    );

    await page.getByLabel("Label:").fill("Password");
    await page.getByLabel("Placeholder:").fill("Enter your password");

    await expect(page.getByLabel("Label:")).toHaveValue("Password");
    await expect(page.getByLabel("Placeholder:")).toHaveValue(
      "Enter your password"
    );
  });
});
