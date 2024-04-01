package de.offchat.highscore.main.api.connection.user;

import de.offchat.highscore.main.database.DatabaseConnector;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class UserService {



    public UserService() {

    }

    public User getUserByUsername(String username){
        User users = new User();
        users.setUsername(username);
        users.setProfilePicture(getProfilePicture(username));
        users.setName(getName(username));
        users.setSolo(getSolo(username));
        users.setSoloSession(getSoloSession(username));
        users.setDuo(getDuo(username));
        users.setDuoSession(getDuoSession(username));
        users.setBodycount(getBodycount(username));
        users.setBcmale(getBodycountMale(username));
        users.setBcfemale(getBodycountFemale(username));
        users.setBcdivserse(getBodycountDiverse(username));
        users.setSexuality(getSexuality(username));
        users.setWeapon_bra_size(getWeapon_Bra_Size(username));
        users.setSingle(getSingle(username));
        users.setFavePornCategory(getFavePornCategory(username));
        users.setFavePornVid(getFavePornVid(username));

        return users;
    }

    private String getProfilePicture(String username){
        String sql = "SELECT profilepicture FROM users WHERE username = ?";
        String string = null;
        try (Connection connection = DatabaseConnector.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {

            statement.setString(1, username);
            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    string = resultSet.getString("profilepicture");
                }
            }
        } catch (SQLException e) {
            throw new RuntimeException("Error while retrieving profilepicture from sessionid: " + e.getMessage(), e);
        }

        return string;
    }

    private String getName(String username){
        String sql = "SELECT name FROM highscore WHERE username = ?";
        String string = null;
        try (Connection connection = DatabaseConnector.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {

            statement.setString(1, username);
            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    string = resultSet.getString("name");
                }
            }
        } catch (SQLException e) {
            throw new RuntimeException("Error while retrieving name from users: " + e.getMessage(), e);
        }

        return string;
    }

    private String getSolo(String username){
        String sql = "SELECT solo FROM highscore WHERE username = ?";
        String string = null;
        try (Connection connection = DatabaseConnector.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {

            statement.setString(1, username);
            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    string = resultSet.getString("solo");
                }
            }
        } catch (SQLException e) {
            throw new RuntimeException("Error while retrieving solo from highscore: " + e.getMessage(), e);
        }

        return string;
    }

    private String getSoloSession(String username){
        String sql = "SELECT soloSession FROM highscore WHERE username = ?";
        String string = null;
        try (Connection connection = DatabaseConnector.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {

            statement.setString(1, username);
            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    string = resultSet.getString("soloSession");
                }
            }
        } catch (SQLException e) {
            throw new RuntimeException("Error while retrieving soloSession from highscore: " + e.getMessage(), e);
        }

        return string;
    }

    private String getDuo(String username){
        String sql = "SELECT duo FROM highscore WHERE username = ?";
        String string = null;
        try (Connection connection = DatabaseConnector.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {

            statement.setString(1, username);
            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    string = resultSet.getString("duo");
                }
            }
        } catch (SQLException e) {
            throw new RuntimeException("Error while retrieving duo from highscore: " + e.getMessage(), e);
        }

        return string;
    }

    private String getDuoSession(String username){
        String sql = "SELECT duosession FROM highscore WHERE username = ?";
        String string = null;
        try (Connection connection = DatabaseConnector.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {

            statement.setString(1, username);
            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    string = resultSet.getString("duosession");
                }
            }
        } catch (SQLException e) {
            throw new RuntimeException("Error while retrieving duosession from highscore: " + e.getMessage(), e);
        }

        return string;
    }

    private String getBodycount(String username){
        String sql = "SELECT bodycount FROM highscore WHERE username = ?";
        String string = null;
        try (Connection connection = DatabaseConnector.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {

            statement.setString(1, username);
            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    string = resultSet.getString("bodycount");
                }
            }
        } catch (SQLException e) {
            throw new RuntimeException("Error while retrieving bodycount from highscore: " + e.getMessage(), e);
        }

        return string;
    }

    private String getBodycountMale(String username){
        String sql = "SELECT bcmale FROM highscore WHERE username = ?";
        String string = null;
        try (Connection connection = DatabaseConnector.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {

            statement.setString(1, username);
            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    string = resultSet.getString("bcmale");
                }
            }
        } catch (SQLException e) {
            throw new RuntimeException("Error while retrieving bcmale from highscore: " + e.getMessage(), e);
        }

        return string;
    }

    private String getBodycountFemale(String username){
        String sql = "SELECT bcfemale FROM highscore WHERE username = ?";
        String string = null;
        try (Connection connection = DatabaseConnector.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {

            statement.setString(1, username);
            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    string = resultSet.getString("bcfemale");
                }
            }
        } catch (SQLException e) {
            throw new RuntimeException("Error while retrieving bcfemale from highscore: " + e.getMessage(), e);
        }

        return string;
    }

    private String getBodycountDiverse(String username){
        String sql = "SELECT bcdiverse FROM highscore WHERE username = ?";
        String string = null;
        try (Connection connection = DatabaseConnector.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {

            statement.setString(1, username);
            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    string = resultSet.getString("bcdiverse");
                }
            }
        } catch (SQLException e) {
            throw new RuntimeException("Error while retrieving bcdiverse from highscore: " + e.getMessage(), e);
        }

        return string;
    }

    private String getSexuality(String username){
        String sql = "SELECT sexuality FROM highscore WHERE username = ?";
        String string = null;
        try (Connection connection = DatabaseConnector.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {

            statement.setString(1, username);
            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    string = resultSet.getString("sexuality");
                }
            }
        } catch (SQLException e) {
            throw new RuntimeException("Error while retrieving sexuality from highscore: " + e.getMessage(), e);
        }

        return string;
    }

    private String getWeapon_Bra_Size(String username){
        String sql = "SELECT weapon_bra_size FROM highscore WHERE username = ?";
        String string = null;
        try (Connection connection = DatabaseConnector.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {

            statement.setString(1, username);
            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    string = resultSet.getString("weapon_bra_size");
                }
            }
        } catch (SQLException e) {
            throw new RuntimeException("Error while retrieving weapon_bra_size from highscore: " + e.getMessage(), e);
        }

        return string;
    }

    private Boolean getSingle(String username){
        String sql = "SELECT single FROM highscore WHERE username = ?";
        Boolean string = null;
        try (Connection connection = DatabaseConnector.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {

            statement.setString(1, username);
            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    string = resultSet.getBoolean("single");
                }
            }
        } catch (SQLException e) {
            throw new RuntimeException("Error while retrieving single from highscore: " + e.getMessage(), e);
        }

        return string;
    }

    private String getFavePornCategory(String username){
        String sql = "SELECT favPornCategory FROM highscore WHERE username = ?";
        String string = null;
        try (Connection connection = DatabaseConnector.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {

            statement.setString(1, username);
            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    string = resultSet.getString("favPornCategory");
                }
            }
        } catch (SQLException e) {
            throw new RuntimeException("Error while retrieving favPornCategory from highscore: " + e.getMessage(), e);
        }

        return string;
    }

    private String getFavePornVid(String username){
        String sql = "SELECT favPornVid FROM highscore WHERE username = ?";
        String string = null;
        try (Connection connection = DatabaseConnector.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {

            statement.setString(1, username);
            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    string = resultSet.getString("favPornVid");
                }
            }
        } catch (SQLException e) {
            throw new RuntimeException("Error while retrieving favPornVid from highscore: " + e.getMessage(), e);
        }

        return string;
    }
}
