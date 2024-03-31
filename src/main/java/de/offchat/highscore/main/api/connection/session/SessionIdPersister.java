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
     * @param sessionId
     * @return returns a boolean
     */
    public static boolean doesSessionIdExist(String sessionId) {
        String sql = "SELECT COUNT(username) FROM sessionid WHERE sessionid = ?";

        try (Connection connection = DatabaseConnector.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {

            statement.setString(1, sessionId);
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

    public static String getUserFromSessionId(String sessionId) {
        String sql = "SELECT username FROM sessionid WHERE sessionid = ?";
        String username = null;

        try (Connection connection = DatabaseConnector.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {

            statement.setString(1, sessionId);
            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    username = resultSet.getString("username");
                }
            }
        } catch (SQLException e) {
            throw new RuntimeException("Error while retrieving username from sessionid: " + e.getMessage(), e);
        }

        return username;
    }
}
