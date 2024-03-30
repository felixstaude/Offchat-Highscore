package de.offchat.highscore.main.password;

import de.offchat.highscore.main.database.DatabaseConnector;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Arrays;

public class PasswordVerification {

    public static boolean verifyPassword(String enteredPassword, String enteredUsername) {
        try(Connection connection = DatabaseConnector.getConnection()){
            String sql = "SELECT password_hash, salt FROM users WHERE username = ?";
            try (PreparedStatement statement = connection.prepareStatement(sql)){
                statement.setString(1, enteredUsername);
                try(ResultSet resultSet = statement.executeQuery()){
                    if(resultSet.next()){
                        byte[] salt = resultSet.getBytes("salt");
                        byte[] storedPasswordHash = resultSet.getBytes("password_hash");
                        byte[] inputPasswordHash = PasswordHasher.hashPassword(enteredPassword, salt).getBytes();
                        return Arrays.equals(storedPasswordHash, inputPasswordHash);
                    }
                }
            }
        } catch (SQLException e){
            e.printStackTrace();
        }
        return false;
    }

}
