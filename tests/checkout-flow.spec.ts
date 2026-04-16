// tests/checkout-flow.spec.ts
//
// Example end-to-end checkout flow test. This is the kind of suite the
// "DIY path" requires you to write and maintain yourself for every
// preview deployment.
//
// Run against any preview URL:
//   BASE_URL=https://your-preview.vercel.app npx playwright test
//
// If your Vercel preview has Deployment Protection enabled, also export:
//   VERCEL_AUTOMATION_BYPASS_SECRET=...
import { test, expect } from "@playwright/test";

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";
const BYPASS_SECRET = process.env.VERCEL_AUTOMATION_BYPASS_SECRET ?? "";

test.describe("Checkout flow", () => {
  test.beforeEach(async ({ context }) => {
    // Forward the Vercel deployment-protection bypass header on every
    // request so protected previews don't redirect us to a login page.
    if (BYPASS_SECRET) {
      await context.setExtraHTTPHeaders({
        "x-vercel-protection-bypass": BYPASS_SECRET,
      });
    }
  });

  test("user can complete a basic checkout", async ({ page }) => {
    // 1. Land on a product page.
    await page.goto(`${BASE_URL}/products/sample-widget`);
    await expect(
      page.getByRole("heading", { name: /sample widget/i }),
    ).toBeVisible();

    // 2. Add the product to the cart.
    await page.getByRole("button", { name: /add to cart/i }).click();
    await expect(page.getByText(/added to cart/i)).toBeVisible();

    // 3. Open the cart and proceed to checkout.
    await page.getByRole("link", { name: /cart/i }).click();
    await expect(page).toHaveURL(/\/cart$/);
    await page.getByRole("button", { name: /checkout/i }).click();

    // 4. Fill in shipping details with safe, obviously-fake test data.
    await page.getByLabel(/full name/i).fill("Ada Lovelace");
    await page.getByLabel(/email/i).fill("ada@example.com");
    await page.getByLabel(/address/i).fill("1 Infinite Loop");
    await page.getByLabel(/city/i).fill("Cupertino");
    await page.getByLabel(/postal code/i).fill("95014");

    // 5. Fill in payment details. Use Stripe's universally-known test card
    //    so this works against any non-production environment.
    await page.getByLabel(/card number/i).fill("4242 4242 4242 4242");
    await page.getByLabel(/expiry/i).fill("12/34");
    await page.getByLabel(/cvc/i).fill("123");

    // 6. Submit the order.
    await page.getByRole("button", { name: /place order/i }).click();

    // 7. Verify we land on a confirmation page with an order number.
    await expect(page).toHaveURL(/\/order\/confirmation/);
    await expect(
      page.getByRole("heading", { name: /thank you/i }),
    ).toBeVisible();
    await expect(page.getByText(/order #/i)).toBeVisible();
  });
});
