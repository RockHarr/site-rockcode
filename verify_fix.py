from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto("http://localhost:8000/")

        # Wait for JS to run
        page.wait_for_timeout(1000)

        # Find the link with text "Spec" inside the demos section
        # The selector path might need to be specific to find the one in "Comunidad Transparente" card
        # Using a text selector + visual verification

        # Screenshot the demos section
        demos_section = page.locator("#demos")
        demos_section.screenshot(path="verification_screenshot.png")

        # Also log the HTML of the Spec link to be sure
        spec_links = page.locator("a:has-text('Spec')").all()
        for i, link in enumerate(spec_links):
            print(f"Link {i}: {link.inner_html()}")

        browser.close()

if __name__ == "__main__":
    run()
