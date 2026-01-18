from playwright.sync_api import sync_playwright

def verify_search_demo():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto("http://localhost:3000/demos/buscador/index.html")
        page.screenshot(path="search_demo_initial.png")

        # Type something
        page.fill("#q", "licencia")
        page.screenshot(path="search_demo_typed.png")

        browser.close()

if __name__ == "__main__":
    verify_search_demo()
