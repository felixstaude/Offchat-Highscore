package de.offchat.highscore.main.password;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class PasswordVerification {

    @Autowired
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public PasswordVerification(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    /**
     * checks if the password hash is the same as the password hash in the database by using the private hasPassword method
     * @param enteredPassword
     * @param enteredUsername
     * @return
     */
    public boolean verifyPassword(String enteredPassword, String enteredUsername) {
        String sql = "SELECT passwordHash, passwordSalt FROM highscore WHERE username = ?";
        return jdbcTemplate.query(sql, new Object[]{enteredUsername}, rs -> {
            if (rs.next()) {
                String saltHex = rs.getString("passwordSalt");
                String storedPasswordHash = rs.getString("passwordHash");

                byte[] salt = hexToBytes(saltHex);
                String inputPasswordHash = hashPassword(enteredPassword, salt);

                return storedPasswordHash.equals(inputPasswordHash);
            }
            return false;
        });
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
