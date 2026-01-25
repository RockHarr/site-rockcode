
from playwright.sync_api import sync_playwright

def verify(page):
    # Block external resources to speed up loading and avoid timeouts
    page.route("**/*", lambda route: route.abort() if "cdn.jsdelivr.net" in route.request.url else route.continue_())

    page.goto("http://localhost:8000/demos/datacleaner/index.html")

    # Set data
    data = """ID,Name,RUT
1,Alice,12.345.678-5
2,Bob,12.345.678-5
3,Charlie,99.999.999-9"""

    page.fill("#raw", data)
    page.click("#btnLoad")

    # Click "Etiquetar duplicados RUT"
    # The button text is "Etiquetar duplicados RUT"
    page.get_by_text("Etiquetar duplicados RUT").click()

    # Wait for table to update (it is synchronous but let's wait a bit or check for element)
    # The table headers should now include "RUT_Duplicado"
    page.wait_for_selector("th:has-text('RUT_Duplicado')")

    # Check rows
    # Row 1 (Alice): Duplicate -> Sí
    # Row 2 (Bob): Duplicate -> Sí
    # Row 3 (Charlie): Unique -> No

    # We can check the text in the table cells
    # The table structure is <table><thead>...</thead><tbody><tr>...</tr>...</tbody></table>

    # Take screenshot
    page.screenshot(path="/home/jules/verification/rut_duplicates.png")

    # Assertions
    content = page.content()
    if "RUT_Duplicado" not in content:
        raise Exception("Column RUT_Duplicado not found")

    print("Verification script finished successfully.")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify(page)
        finally:
            browser.close()
