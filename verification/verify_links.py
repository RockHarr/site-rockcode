
from playwright.sync_api import sync_playwright

def verify_external_links():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        # Load local index.html directly
        import os
        cwd = os.getcwd()
        page.goto(f"file://{cwd}/index.html")

        # Take a screenshot of the "Demos públicas" section where the links are
        # The section id is "demos"
        element = page.locator("#demos")
        if element.is_visible():
            element.screenshot(path="verification/external_links.png")
            print("Screenshot saved to verification/external_links.png")
        else:
            print("Element #demos not found")

        browser.close()

if __name__ == "__main__":
    verify_external_links()
