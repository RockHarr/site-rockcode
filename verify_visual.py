import threading
import time
from http.server import HTTPServer, SimpleHTTPRequestHandler
from playwright.sync_api import sync_playwright

# Server setup
PORT = 8001
class ReusableTCPServer(HTTPServer):
    allow_reuse_address = True

def start_server():
    httpd = ReusableTCPServer(("", PORT), SimpleHTTPRequestHandler)
    print(f"Serving on port {PORT}")
    httpd.serve_forever()

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        try:
            page.goto(f"http://localhost:{PORT}/index.html")
            page.wait_for_timeout(1000)

            # Scroll to Demos section
            demos_section = page.locator("#demos")
            demos_section.scroll_into_view_if_needed()

            # Take screenshot of the demos section
            demos_section.screenshot(path="verification.png")
            print("Screenshot saved to verification.png")

        finally:
            browser.close()

if __name__ == "__main__":
    server_thread = threading.Thread(target=start_server, daemon=True)
    server_thread.start()
    time.sleep(1)
    run()
