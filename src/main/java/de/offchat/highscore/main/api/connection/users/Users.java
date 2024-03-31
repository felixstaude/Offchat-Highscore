package de.offchat.highscore.main.api.connection.users;

import de.offchat.highscore.main.database.DatabaseConnector;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class Users {
    private String username;
    private String sessionID;

    public Users(String username) {
        this.username = username;
    }

    public String getSessionID(){
        return sessionID;
    }

    public void setSessionID(){
        this.sessionID = sessionID;
    }

    public String getUsername() throws SQLException{
        return getString("username");

    }
    public String getName() throws SQLException {
        return getString("name");
    }

    public String getSolo() throws SQLException {
        return getString("solo");
    }

    public String getSoloSessions() throws SQLException {
        return getString("soloSession");
    }

    public String getDuo() throws SQLException {
        return getString("duo");
    }

    public String getDuoSessions() throws SQLException {
        return getString("duoSession");
    }

    public String getBodycount() throws SQLException {
        return getString("bodycount");
    }

    public String getBcmale() throws SQLException {
        return getString("bcmale");
    }

    public String getBcfemale() throws SQLException {
        return getString("bcfemale");
    }

    public String getBcdiverse() throws SQLException {
        return getString("bcdiverse");
    }

    public String getSexuality() throws SQLException {
        return getString("sexuality");
    }

    public String getWeaponBraSize() throws SQLException {
        return getString("weapon_bra_size");
    }

    public boolean isSingle() throws SQLException {
        String sql = "SELECT single FROM highscore WHERE username = ?";
        try (Connection conn = DatabaseConnector.getConnection();
             PreparedStatement statement = conn.prepareStatement(sql)) {

            statement.setString(1, this.username);
            try (ResultSet rs = statement.executeQuery()) {
                if (rs.next()) {
                    return rs.getBoolean("single");
                }
            }
        }
        return false;
    }

    public String getFavePornCategory() throws SQLException {
        return getString("favPornCategory");
    }

    public String getFavePornVid() throws SQLException {
        return getString("favPornVid");
    }

    public String getProfilePicture() throws SQLException {
        String value = null;
        String sql = "SELECT profilepicture FROM users WHERE username = ?";
        try (Connection conn = DatabaseConnector.getConnection();
             PreparedStatement statement = conn.prepareStatement(sql)) {

            statement.setString(1, this.username);
            try (ResultSet rs = statement.executeQuery()) {
                if (rs.next()) {
                    value = rs.getString("profilepicture");
                }
            }
        }
        return value;
    }

    private String getString(String columnName) throws SQLException {
        String value = null;
        String sql = "SELECT " + columnName + " FROM highscore WHERE username = ?";
        try (Connection conn = DatabaseConnector.getConnection();
             PreparedStatement statement = conn.prepareStatement(sql)) {

            statement.setString(1, this.username);
            try (ResultSet rs = statement.executeQuery()) {
                if (rs.next()) {
                    value = rs.getString(columnName);
                }
            }
        }
        return value;
    }
}

