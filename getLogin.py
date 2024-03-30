import hashlib
import mysql.connector

def verify_user(username, password):
    """Überprüft das Passwort eines Benutzers."""
    conn = mysql.connector.connect(
        host="localhost",
        user="root",
        password="",
        database="offchat_highscore"
    )
    cursor = conn.cursor()
    cursor.execute("SELECT password_hash, salt FROM users WHERE username = %s", (username,))
    user_data = cursor.fetchone()
    conn.close()
    
    if user_data:
        stored_hash, stored_salt = user_data
        stored_salt = bytes.fromhex(stored_salt)  # Konvertiere den gespeicherten Salt zurück in Bytes
        input_password_hash = hashlib.sha512(password.encode('utf-8') + stored_salt).hexdigest()
        
        if input_password_hash == stored_hash:
            return True  # Passwort übereinstimmt
    return False  # Kein Benutzer gefunden oder Passwort stimmt nicht überein

# Beispielverwendung:
is_verified = verify_user('testuser', 'meinPasswort123')
print(is_verified)
