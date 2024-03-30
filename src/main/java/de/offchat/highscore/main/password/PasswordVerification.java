package de.offchat.highscore.main.password;

public class PasswordVerification {

    // Methode, um zu überprüfen, ob das eingegebene Passwort korrekt ist
    public static boolean verifyPassword(String enteredPassword, String storedHash, String storedSalt) {
        // Hash das eingegebene Passwort mit dem gespeicherten Salt
        String hashedEnteredPassword = PasswordHasher.hashPassword((storedSalt + enteredPassword).getBytes());

        // Vergleiche das gehashte Passwort mit dem gespeicherten Hash
        return hashedEnteredPassword.equals(storedHash);
    }

}
