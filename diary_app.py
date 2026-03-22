"""
Local diary application used as the test target for the Robot Framework assignment.

Start: python diary_app.py
URL:   http://localhost:3000

Credentials: test.user@example.com / change-me  (matching .env defaults)
"""

from __future__ import annotations

import uuid
from datetime import datetime

from flask import (
    Flask,
    abort,
    jsonify,
    redirect,
    render_template_string,
    request,
    session,
    url_for,
)

app = Flask(__name__)
app.secret_key = "dev-secret-key-for-testing-only"

# ── In-memory data ───────────────────────────────────────────────────────────

USERS: dict[str, str] = {
    "test.user@example.com": "change-me",
}
ENTRIES: list[dict] = []

# ── Shared CSS ───────────────────────────────────────────────────────────────

_STYLE = """
<style>
*, *::before, *::after { box-sizing: border-box; }
:root {
  --bg: #f2efe8; --panel: rgba(255,252,245,.93);
  --text: #1f2933; --muted: #52606d;
  --accent: #c05621; --acc-d: #7b341e;
  --border: rgba(31,41,51,.12);
}
body {
  margin: 0; min-height: 100vh;
  font-family: Georgia, serif; color: var(--text);
  background:
    radial-gradient(circle at top left, rgba(192,86,33,.18), transparent 30%),
    radial-gradient(circle at bottom right, rgba(123,52,30,.16), transparent 28%),
    linear-gradient(135deg,#ebe5da 0%,#f8f5ef 100%);
}
a { color: var(--accent); }
.card {
  background: var(--panel); border: 1px solid var(--border);
  border-radius: 18px; padding: 24px 28px;
  box-shadow: 0 12px 40px rgba(31,41,51,.09);
}
input, textarea {
  width: 100%; padding: 10px 14px;
  border: 1px solid rgba(31,41,51,.2); border-radius: 10px;
  font-size: 1rem; font-family: inherit; margin-bottom: 16px;
  outline: none; background: #fff;
}
input:focus, textarea:focus { border-color: var(--accent); }
.btn {
  display: inline-block; padding: 10px 20px;
  background: var(--accent); color: #fff;
  border: none; border-radius: 10px;
  font-size: 1rem; font-family: inherit;
  cursor: pointer; text-decoration: none; white-space: nowrap;
}
.btn:hover { background: var(--acc-d); }
.ghost { background: transparent; border: 1px solid var(--border); color: var(--muted); }
.ghost:hover { background: rgba(31,41,51,.06); }
label { font-size: .87rem; color: var(--muted); display: block; margin-bottom: 6px; }
</style>
"""

# ── HTML Templates ───────────────────────────────────────────────────────────

_LOGIN = (
    """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Diary – Sign in</title>"""
    + _STYLE
    + """
</head>
<body style="display:grid;place-items:center">
  <form class="card" method="post" style="width:340px">
    <h1 style="margin:0 0 24px;font-size:2.2rem">Diary</h1>
    {% if error %}
      <p style="color:var(--accent);margin:0 0 16px;font-size:.9rem">{{ error }}</p>
    {% endif %}
    <label>Email</label>
    <input data-testid="username" name="username" type="text" autocomplete="username">
    <label>Password</label>
    <input data-testid="password" name="password" type="password" autocomplete="current-password">
    <button data-testid="login-submit" class="btn" type="submit" style="width:100%;padding:12px">
      Sign in
    </button>
  </form>
</body>
</html>"""
)

_HOME = (
    """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Diary</title>"""
    + _STYLE
    + """
</head>
<body>
  <div style="max-width:720px;margin:0 auto;padding:32px 16px">
    <header style="display:flex;justify-content:space-between;align-items:center;
                   margin-bottom:28px;flex-wrap:wrap;gap:12px">
      <h1 style="margin:0;font-size:2rem" data-testid="dashboard">My Diary</h1>
      <div style="display:flex;gap:10px">
        <a class="btn" href="/entries/new" data-testid="new-entry">+ New entry</a>
        <a class="btn ghost" href="/logout">Log out</a>
      </div>
    </header>

    <div id="entries">
    {% for entry in entries %}
    <div class="card" data-testid="entry-card" style="margin-bottom:16px">
      <div style="font-size:1.2rem;font-weight:bold;margin-bottom:4px">{{ entry.title }}</div>
      <div style="font-size:.82rem;color:var(--muted);margin-bottom:10px">{{ entry.created_at }}</div>
      <p style="margin:0;line-height:1.6">{{ entry.content }}</p>
    </div>
    {% else %}
    <div class="card" style="text-align:center;padding:48px 28px">
      <p style="color:var(--muted);margin:0 0 18px">No entries yet. Write your first one!</p>
      <a class="btn" href="/entries/new" data-testid="new-entry">Write first entry</a>
    </div>
    {% endfor %}
    </div>
  </div>
</body>
</html>"""
)

_NEW_ENTRY = (
    """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Diary – New Entry</title>"""
    + _STYLE
    + """
</head>
<body>
  <div style="max-width:640px;margin:0 auto;padding:32px 16px">
    <a href="/" style="font-size:.9rem;color:var(--muted);text-decoration:none">← Back</a>
    <div class="card" style="margin-top:18px">
      <h2 style="margin:0 0 20px">New Entry</h2>
      <form method="post">
        <label>Title</label>
        <input data-testid="entry-title" name="title" type="text"
               placeholder="What&#x27;s on your mind?">
        <label>Content</label>
        <textarea data-testid="entry-content" name="content" rows="9"
                  placeholder="Write freely..."></textarea>
        <button data-testid="save-entry" class="btn" type="submit">Save entry</button>
      </form>
    </div>
  </div>
</body>
</html>"""
)

# ── Error handlers ───────────────────────────────────────────────────────────


@app.errorhandler(401)
def unauthorized(_e):
    return jsonify({"error": "Unauthorized"}), 401


# ── Web routes ───────────────────────────────────────────────────────────────


@app.route("/")
def home():
    if "username" not in session:
        return redirect(url_for("login"))
    return render_template_string(_HOME, entries=ENTRIES)


@app.route("/login", methods=["GET", "POST"])
def login():
    error = ""
    if request.method == "POST":
        username = request.form.get("username", "").strip()
        password = request.form.get("password", "")
        if USERS.get(username) == password:
            session["username"] = username
            return redirect(url_for("home"))
        error = "Invalid email or password."
    return render_template_string(_LOGIN, error=error)


@app.route("/entries/new", methods=["GET", "POST"])
def new_entry():
    if "username" not in session:
        return redirect(url_for("login"))
    if request.method == "POST":
        title = request.form.get("title", "").strip()
        content = request.form.get("content", "").strip()
        if title:
            ENTRIES.insert(
                0,
                {
                    "id": str(uuid.uuid4()),
                    "title": title,
                    "content": content,
                    "author": session["username"],
                    "created_at": datetime.now().strftime("%Y-%m-%d %H:%M"),
                },
            )
            return redirect(url_for("home"))
    return render_template_string(_NEW_ENTRY)


@app.route("/logout")
def logout():
    session.clear()
    return redirect(url_for("login"))


# ── REST API ─────────────────────────────────────────────────────────────────


@app.route("/api/auth/login", methods=["POST"])
def api_login():
    data = request.get_json(silent=True) or {}
    username = data.get("username", "")
    password = data.get("password", "")
    if USERS.get(username) == password:
        return jsonify({"token": f"token-{uuid.uuid4()}", "username": username}), 200
    return jsonify({"error": "Invalid credentials"}), 401


@app.route("/api/entries", methods=["GET"])
def api_list_entries():
    _require_auth()
    return jsonify({"entries": ENTRIES, "count": len(ENTRIES)}), 200


@app.route("/api/entries", methods=["POST"])
def api_create_entry():
    _require_auth()
    data = request.get_json(silent=True) or {}
    title = data.get("title", "").strip()
    content = data.get("content", "").strip()
    if not title:
        return jsonify({"error": "title is required"}), 422
    entry = {
        "id": str(uuid.uuid4()),
        "title": title,
        "content": content,
        "created_at": datetime.now().strftime("%Y-%m-%d %H:%M"),
    }
    ENTRIES.insert(0, entry)
    return jsonify({"entry": entry}), 201


def _require_auth() -> None:
    auth = request.headers.get("Authorization", "")
    if not (auth.startswith("Token ") or auth.startswith("Bearer ")):
        abort(401)


# ── Entry point ──────────────────────────────────────────────────────────────

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=3000, debug=False, use_reloader=False)
