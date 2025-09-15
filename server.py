#!/usr/bin/env python3
"""
Simple HTTP server for testing the Raj Ladies Tailor website locally.
Run with: python3 server.py
Then open http://localhost:8000 in your browser.
"""

import http.server
import socketserver
import os

PORT = 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)
    
    def end_headers(self):
        # Add headers for better local testing
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

def run_server():
    with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
        print(f"🌟 Raj Ladies Tailor Website Server")
        print(f"📍 Serving at: http://localhost:{PORT}")
        print(f"📁 Directory: {DIRECTORY}")
        print(f"Press Ctrl+C to stop the server\n")
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n✨ Server stopped gracefully")
            return

if __name__ == "__main__":
    run_server()