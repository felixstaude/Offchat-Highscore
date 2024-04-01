package de.offchat.highscore.main.api.connection.userlist;

import de.offchat.highscore.main.api.connection.user.User;
import de.offchat.highscore.main.database.DatabaseConnector;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class UserListService {

    public List<User> getAllUsers() {
        // Liste zum Speichern der Benutzernamen
        List<String> usernames = new ArrayList<>();

        // SQL-Abfrage, um alle Benutzernamen zu holen
        String sqlUsernames = "SELECT username FROM highscore";
        try (Connection connection = DatabaseConnector.getConnection();
             PreparedStatement statementUsernames = connection.prepareStatement(sqlUsernames);
             ResultSet resultSetUsernames = statementUsernames.executeQuery()) {

            while (resultSetUsernames.next()) {
                usernames.add(resultSetUsernames.getString("username"));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        // Liste zum Speichern der User-Objekte
        List<User> users = new ArrayList<>();

        // Für jeden Benutzernamen die User-Daten und Profilbild holen
        for (String username : usernames) {
            users.add(getUserDetails(username));
        }

        return users;
    }

    private User getUserDetails(String username) {
        User user = new User();
        user.setUsername(username);

        String sqlDetails = "SELECT * FROM highscore WHERE username = ?";
        try (Connection connection = DatabaseConnector.getConnection();
             PreparedStatement statementDetails = connection.prepareStatement(sqlDetails)) {
            statementDetails.setString(1, username);
            try (ResultSet resultSetDetails = statementDetails.executeQuery()) {
                if (resultSetDetails.next()) {

                    user.setName(resultSetDetails.getString("name"));
                    user.setSolo(resultSetDetails.getString("solo"));
                    user.setSoloSession(resultSetDetails.getString("soloSession"));
                    user.setDuo(resultSetDetails.getString("duo"));
                    user.setDuoSession(resultSetDetails.getString("duoSession"));
                    user.setBodycount(resultSetDetails.getString("bodycount"));
                    user.setBcmale(resultSetDetails.getString("bcmale"));
                    user.setBcfemale(resultSetDetails.getString("bcfemale"));
                    user.setBcdivserse(resultSetDetails.getString("bcdiverse"));
                    user.setSexuality(resultSetDetails.getString("sexuality"));
                    user.setWeapon_bra_size(resultSetDetails.getString("weapon_bra_size"));
                    user.setSingle(resultSetDetails.getBoolean("single"));
                    user.setFavePornCategory(resultSetDetails.getString("favPornCategory"));
                    user.setFavePornVid(resultSetDetails.getString("favPornVid"));

                    user.setProfilePicture(getProfilePicture(username));
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return user;
    }

    private String getProfilePicture(String username) {
        String sql = "SELECT profilepicture FROM users WHERE username = ?";
        try (Connection connection = DatabaseConnector.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setString(1, username);
            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    return resultSet.getString("profilepicture");
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }
}
