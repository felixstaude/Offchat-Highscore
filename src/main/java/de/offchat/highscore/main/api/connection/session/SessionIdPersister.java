package de.offchat.highscore.main.api.connection.session;

import de.offchat.highscore.main.database.DatabaseConnector;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class SessionIdPersister {
    /**
     *
     * @param username
     * @param sessionID
     */
    public static void addSessionID(String username, String sessionID){
        String sql = "INSERT INTO sessionid (username, sessionid) " +
                "VALUES (?, ?) ON DUPLICATE KEY UPDATE username = VALUES(username), " +
                "sessionid = VALUES(sessionid)";

        try(Connection connection = DatabaseConnector.getConnection(); PreparedStatement statement = connection.prepareStatement(sql)){
            statement.setString(1, username);
            statement.setString(2, sessionID);

            statement.executeUpdate();
        } catch (SQLException e){
            throw new RuntimeException("Error while adding sessionid: " + e.getMessage(), e);
        }
    }

    /**
     * unused for now
     * @param username
     */
    public static void deleteSessionID(String username){

    }

    /**
     *
     * @param username
     * @return returns a boolean
     */
    public static boolean doesSessionIdExistForUser(String username) {
        String sql = "SELECT COUNT(sessionid) FROM sessionid WHERE username = ?";

        try (Connection connection = DatabaseConnector.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {

            statement.setString(1, username);
            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    return resultSet.getInt(1) > 0;
                }
            }
        } catch (SQLException e) {
            throw new RuntimeException("Error while checking for sessionid: " + e.getMessage(), e);
        }

        return false;
    }
}
