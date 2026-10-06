from flask import Flask, render_template, request, jsonify
import sqlite3

app = Flask(__name__)
# =========================
# LANGUAGE SYSTEM
# =========================

TRANSLATIONS = {

    "en": {
        "home": "Home",
        "about": "About Us",
        "services": "Services",
        "approach": "Our Approach",
        "why_mansora": "Why MANSORA",
        "who_we_serve": "Who We Serve",
        "contact": "Contact Us",
        "settings": "Settings",
        "language": "Language",
        "preferences": "Preferences",
        "privacy": "Privacy & Cookies",
        "accessibility": "Accessibility",
    },

    "fr": {
        "home": "Accueil",
        "about": "À propos",
        "services": "Services",
        "approach": "Notre approche",
        "why_mansora": "Pourquoi MANSORA",
        "who_we_serve": "Qui nous servons",
        "contact": "Nous contacter",
        "settings": "Paramètres",
        "language": "Langue",
        "preferences": "Préférences",
        "privacy": "Confidentialité et cookies",
        "accessibility": "Accessibilité",
    }

}


@app.context_processor
def inject_language():

    def translate(key):

        language = request.cookies.get("mansora_language", "en")

        return TRANSLATIONS.get(language, TRANSLATIONS["en"]).get(
            key,
            key
        )

    return dict(t=translate)
# =========================
# NEWSLETTER DATABASE
# =========================
def init_db():
    conn = sqlite3.connect("subscribers.db")
    cursor = conn.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS subscribers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL
        )
    """)

    conn.commit()
    conn.close()
# =========================
# HOME
# =========================

@app.route("/")
def home():
    return render_template("home.html")


# =========================
# CONTACT US
# =========================

@app.route("/contact-us")
def contact_us():
    return render_template("contact-us.html")

@app.route('/who-we-serve')
def who_we_serve():
    return render_template('who-we-serve.html')
# SERVICES
# =========================

@app.route("/services")
def services():
    return render_template("services.html")


# =========================

@app.route('/why-mansora')
def why_mansora():
    return render_template('why-mansora.html')
# OUR APPROACH
# =========================

@app.route("/approach")
@app.route("/our-approach")
def approach():
    return render_template("our-approach.html")

# =========================
# ABOUT
# =========================

@app.route("/about")
def about():
    return render_template("about.html")


# =========================
# SETTINGS
# =========================

@app.route("/settings")
def settings():
    return render_template("settings.html")
# =========================
# NEWSLETTER
# =========================
@app.route("/subscribe", methods=["POST"])
def subscribe():

    email = request.form.get("email", "").strip()

    if not email:
        return jsonify({
            "success": False,
            "message": "Please enter your email address."
        }), 400

    try:
        conn = sqlite3.connect("subscribers.db")
        cursor = conn.cursor()

        cursor.execute(
            "INSERT INTO subscribers (email) VALUES (?)",
            (email,)
        )

        conn.commit()
        conn.close()

        return jsonify({
            "success": True,
            "message": "You're subscribed!"
        })

    except sqlite3.IntegrityError:
        return jsonify({
            "success": False,
            "message": "This email is already subscribed."
        }), 409

    except Exception as error:
        print("Newsletter error:", error)

        return jsonify({
            "success": False,
            "message": "Something went wrong. Please try again."
        }), 500
# =========================
# RUN APPLICATION
# =========================
init_db()
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=False)