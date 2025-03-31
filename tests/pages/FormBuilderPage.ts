import { Page, Locator, expect } from "@playwright/test";

export class FormBuilderPage {
  readonly page: Page;
  readonly configurationPanel: Locator;
  readonly previewPanel: Locator;
  readonly generatedCodePanel: Locator;
  readonly labelInput: Locator;
  readonly placeholderInput: Locator;
  readonly codeOutput: Locator;
  readonly copyButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.configurationPanel = page.getByRole("heading", {
      name: "Configuration",
    });
    this.previewPanel = page.getByRole("heading", { name: "Preview" });
    this.generatedCodePanel = page.getByRole("heading", {
      name: "Generated Code",
    });
    this.labelInput = page.getByLabel("Label:");
    this.placeholderInput = page.getByLabel("Placeholder:");
    this.codeOutput = page.locator("pre.code-output code");
    this.copyButton = page.getByRole("button", { name: "Copy Code" });
  }

  async goto() {
    await this.page.goto("http://localhost:5174");
    await Promise.all([
      this.page.waitForLoadState("domcontentloaded"),
      this.page.waitForSelector(".form-builder", {
        state: "visible",
        timeout: 30000,
      }),
    ]);
  }

  async setFormConfiguration(label: string, placeholder: string) {
    await this.labelInput.fill(label);
    await this.placeholderInput.fill(placeholder);
  }

  async getFormLabel() {
    return this.labelInput.inputValue();
  }

  async getFormPlaceholder() {
    return this.placeholderInput.inputValue();
  }

  async getGeneratedCode() {
    return this.codeOutput.textContent();
  }

  async copyCode() {
    this.page.on("dialog", async (dialog) => {
      expect(dialog.message()).toBe("Code copied to clipboard!");
      await dialog.accept();
    });
    await this.copyButton.click();
  }
}
