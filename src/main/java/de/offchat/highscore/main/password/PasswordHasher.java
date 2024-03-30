package de.offchat.highscore.main.password;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;

public class PasswordHasher {

    private static final SecureRandom random = new SecureRandom();

    public static String generateSalt() {
        byte[] salt = new byte[16];
        random.nextBytes(salt);
        return bytesToHex(salt);
    }

    public static String hashPassword(String password, String salt) {
        return hashPassword((salt + password).getBytes());
    }

    public static String hashPassword(byte[] input) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-512");
            byte[] hashedBytes = md.digest(input);
            StringBuilder sb = new StringBuilder();
            for (byte b : hashedBytes) {
                sb.append(String.format("%02x", b));
            }
                return sb.toString();
            } catch (NoSuchAlgorithmException e) {
                throw new RuntimeException("SHA-512 Hashing-algorithm not found", e);
            }
        }
    private static String bytesToHex(byte[] bytes) {
        StringBuilder sb = new StringBuilder();
        for (byte b : bytes) {
            sb.append(String.format("%02x", b));
        }
        return sb.toString();
    }
}

