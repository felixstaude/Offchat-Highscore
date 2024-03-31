package de.offchat.highscore.main.password;

import de.offchat.highscore.main.database.DatabaseConnector;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class PasswordVerification {
    /**
     * checks if the password hash is the same as the password hash in the database by using the private hasPassword method
     * @param enteredPassword
     * @param enteredUsername
     * @return
     */
    public static boolean verifyPassword(String enteredPassword, String enteredUsername) {
        try (Connection connection = DatabaseConnector.getConnection()) {
            String sql = "SELECT password_hash, salt FROM users WHERE username = ?";
            try (PreparedStatement statement = connection.prepareStatement(sql)) {
                statement.setString(1, enteredUsername);
                try (ResultSet resultSet = statement.executeQuery()) {
                    if (resultSet.next()) {
                        String saltHex = resultSet.getString("salt");
                        String storedPasswordHash = resultSet.getString("password_hash");

                        byte[] salt = hexToBytes(saltHex);
                        String inputPasswordHash = hashPassword(enteredPassword, salt);

                        return storedPasswordHash.equals(inputPasswordHash);
                    }
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    private static byte[] hexToBytes(String hexString) {
        int len = hexString.length();
        byte[] data = new byte[len / 2];
        for (int i = 0; i < len; i += 2) {
            data[i / 2] = (byte) ((Character.digit(hexString.charAt(i), 16) << 4) + Character.digit(hexString.charAt(i+1), 16));
        }
        return data;
    }

    private static String hashPassword(String password, byte[] salt) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-512");
            md.update(salt);
            byte[] hashedPassword = md.digest(password.getBytes());
            return bytesToHex(hashedPassword);
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("Hashing-Algorithmus nicht gefunden", e);
        }
    }

    private static String bytesToHex(byte[] bytes) {
        StringBuilder hexString = new StringBuilder();
        for (byte b : bytes) {
            String hex = Integer.toHexString(0xff & b);
            if (hex.length() == 1) hexString.append('0');
            hexString.append(hex);
        }
        return hexString.toString();
    }
}
