from playwright.sync_api import sync_playwright
import sys

def verify():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto("http://localhost:3000/demos/buscador/index.html")

        # 1. Type to show button
        page.fill("#q", "licencia")
        page.wait_for_selector("#btn-clear:not([hidden])")

        # Screenshot with button visible
        page.screenshot(path="verification/search_with_clear_btn.png")

        # 2. Click clear
        page.click("#btn-clear")

        # 3. Verify empty
        val = page.input_value("#q")
        if val != "":
            print(f"FAILURE: Input not empty, got '{val}'")
            sys.exit(1)

        # 4. Verify focus
        # In Playwright, evaluating document.activeElement is reliable
        focused = page.evaluate("document.activeElement.id")
        if focused != "q":
            print(f"FAILURE: Focus lost, on '{focused}'")
            sys.exit(1)

        print("SUCCESS: Input cleared and focused")
        browser.close()

if __name__ == "__main__":
    verify()
