import asyncio
import http.server
import socketserver
import threading
from playwright.sync_api import sync_playwright
import time
import os

PORT = 8082
SCREENSHOT_PATH = "/home/jules/verification/back_to_top.png"

def run_server():
    import http.server
    class QuietHandler(http.server.SimpleHTTPRequestHandler):
        def log_message(self, format, *args):
            pass

    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), QuietHandler) as httpd:
        httpd.serve_forever()

def verify():
    # Ensure directory exists
    os.makedirs(os.path.dirname(SCREENSHOT_PATH), exist_ok=True)

    server_thread = threading.Thread(target=run_server, daemon=True)
    server_thread.start()
    time.sleep(2)

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        try:
            page.goto(f"http://localhost:{PORT}/index.html")
            page.wait_for_load_state("networkidle")

            # Initial state: button should be hidden
            # Actually, check if it's there but hidden or not has 'show' class
            # The CSS likely uses opacity/visibility transition

            # Scroll down
            print("Scrolling down...")
            page.evaluate("window.scrollTo(0, 1000)")

            # Wait for transition/raf
            time.sleep(1)

            # Check if button has 'show' class
            btn = page.locator("#btn-back-to-top")
            if "show" in btn.get_attribute("class"):
                print("Button has 'show' class.")
            else:
                print("Button MISSING 'show' class!")

            # Take screenshot
            page.screenshot(path=SCREENSHOT_PATH)
            print(f"Screenshot saved to {SCREENSHOT_PATH}")

        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    verify()
