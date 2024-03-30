import os
import hashlib
import mysql.connector

def create_salt():
    """Generiert einen zufälligen Salt."""
    return os.urandom(16)

def create_password_hash(password, salt):
    """Erstellt einen Passwort-Hash unter Verwendung von SHA-512 und dem gegebenen Salt."""
    return hashlib.sha512(password.encode('utf-8') + salt).hexdigest()

def save_user(username, password):
    """Speichert den neuen Benutzer mit Passwort-Hash und Salt in der Datenbank."""
    salt = create_salt()
    password_hash = create_password_hash(password, salt)
    
    conn = mysql.connector.connect(
        host="localhost",
        user="root",
        password="",
        database="offchat_highscore"
    )
    cursor = conn.cursor()
    cursor.execute("INSERT INTO users (username, password_hash, salt) VALUES (%s, %s, %s)",
                   (username, password_hash, salt.hex()))
    conn.commit()
    cursor.close()
    conn.close()

# Beispielverwendung:
save_user('testuser', 'meinPasswort123')
