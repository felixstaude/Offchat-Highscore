package de.offchat.highscore.main;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Scanner;

public class CreateTestUser {

    private static final String DB_URL = "jdbc:mysql://88.99.161.170/offchat_highscore";
    private static final String DB_USER = "offchat";
    private static final String DB_PASSWORD = "password";

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Benutzername: ");
        String username = scanner.nextLine();
        System.out.print("Passwort: ");
        String password = scanner.nextLine();

        createUser(username, password);
    }

    private static void createUser(String username, String password) {
        byte[] salt = generateSalt();
        String passwordHash = hashPassword(password, salt);

        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD)) {
            String sql = "INSERT INTO highscore (username, passwordHash, passwordSalt, profilePicture) VALUES (?, ?, ?, ?)";
            try (PreparedStatement statement = conn.prepareStatement(sql)) {
                statement.setString(1, username);
                statement.setString(2, passwordHash);
                statement.setString(3, bytesToHex(salt));
                statement.setString(4, "https://yt3.googleusercontent.com/YNyWdRIXEgVHHNJI2q0tyrxujhmVMMRew65ybn30XO7urB_NavrIq-ubjHcgCR_PhW-7Y2OH4w=s176-c-k-c0x00ffffff-no-rj");

                int rowsAffected = statement.executeUpdate();
                if (rowsAffected > 0) {
                    System.out.println("Benutzer erfolgreich erstellt.");
                }
            }
        } catch (SQLException e) {
            System.out.println("Fehler beim Datenbankzugriff: " + e.getMessage());
        }
    }

    private static String hashPassword(String password, byte[] salt) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-512");
            md.update(salt);
            md.update(password.getBytes());
            byte[] hashedPassword = md.digest();
            return bytesToHex(hashedPassword);
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("Hashing-Algorithmus nicht gefunden", e);
        }
    }


    private static byte[] generateSalt() {
        SecureRandom random = new SecureRandom();
        byte[] salt = new byte[16];
        random.nextBytes(salt);
        return salt;
    }

    private static String bytesToHex(byte[] bytes) {
        StringBuilder hexString = new StringBuilder();
        for (byte b : bytes) {
            String hex = Integer.toHexString(0xff & b);
            if (hex.length() == 1) {
                hexString.append('0');
            }
            hexString.append(hex);
        }
        return hexString.toString();
    }
}
