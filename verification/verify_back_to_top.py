from playwright.sync_api import sync_playwright, expect

def verify_back_to_top():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto("http://localhost:8000")

        # Check if button exists (it shouldn't initially)
        button = page.locator("#btn-back-to-top")

        # Scroll down
        page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
        page.wait_for_timeout(500) # Wait for potential animation

        if button.count() > 0:
            print("Button found!")
            if button.is_visible():
                print("Button is visible.")
            else:
                print("Button exists but is not visible.")
        else:
            print("Button not found (as expected for initial state).")

        page.screenshot(path="verification/before_changes.png")
        browser.close()

if __name__ == "__main__":
    verify_back_to_top()
