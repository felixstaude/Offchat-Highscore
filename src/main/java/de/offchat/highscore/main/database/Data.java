package de.offchat.highscore.main.database;

import de.offchat.highscore.main.api.connection.stats.Stats;
import de.offchat.highscore.main.api.connection.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Component
public class Data {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    public Data() {
        this.jdbcTemplate = new DatabaseConfig().jdbcTemplate(new DatabaseConfig().dataSource());
    }

    // getter & setter for username
    public String getUsernameFromSessionID(String sessionID) {
        String sql = "SELECT username FROM highscore WHERE sessionID = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{sessionID}, String.class);
    }
    public void setUsername(String username, String newUsername) {
        String sql = "UPDATE highscore SET username = ? WHERE username = ?";
        jdbcTemplate.update(sql, newUsername, username);
    }

    // getter & setter for passwordHash
    public String getPasswordHash(String username) {
        String sql = "SELECT passwordHash FROM highscore WHERE username = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{username}, String.class);
    }

    public void setPasswordHash(String username, String passwordHash) {
        String sql = "UPDATE highscore SET passwordHash = ? WHERE username = ?";
        jdbcTemplate.update(sql, passwordHash, username);
    }

    // getter & setter for passwordSalt
    public String getPasswordSalt(String username) {
        String sql = "SELECT passwordHash FROM highscore WHERE username = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{username}, String.class);
    }

    public void setPasswordSalt(String username, String passwordSalt) {
        String sql = "UPDATE highscore SET passwordSalt = ? WHERE username = ?";
        jdbcTemplate.update(sql, passwordSalt, username);
    }

    // getter & setter for profilePicture
    public String getProfilePicture(String username) {
        String sql = "SELECT profilePicture FROM highscore WHERE username = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{username}, String.class);
    }

    public void setProfilePicture(String username, String profilePicture) {
        String sql = "UPDATE highscore SET profilePicture = ? WHERE username = ?";
        jdbcTemplate.update(sql, profilePicture, username);
    }

    // getter & setter for customName
    public String getCustomName(String username) {
        String sql = "SELECT customName FROM highscore WHERE username = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{username}, String.class);
    }

    public void setCustomName(String username, String customName) {
        String sql = "UPDATE highscore SET customName = ? WHERE username = ?";
        jdbcTemplate.update(sql, customName, username);
    }

    // getter & setter for sessionID
    public String getSessionID(String username) {
        String sql = "SELECT sessionID FROM highscore WHERE username = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{username}, String.class);
    }

    public void setSessionID(String username, String sessionID) {
        String sql = "UPDATE highscore SET sessionID = ? WHERE username = ?";
        jdbcTemplate.update(sql, sessionID, username);
    }

    // getter & setter for solo
    public String getSolo(String username) {
        String sql = "SELECT solo FROM highscore WHERE username = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{username}, String.class);
    }

    public void setSolo(String username, String solo) {
        String sql = "UPDATE highscore SET solo = ? WHERE username = ?";
        jdbcTemplate.update(sql, solo, username);
    }

    // getter & setter for soloSession
    public String getSoloSession(String username) {
        String sql = "SELECT soloSession FROM highscore WHERE username = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{username}, String.class);
    }

    public void setSoloSession(String username, String soloSession) {
        String sql = "UPDATE highscore SET soloSession = ? WHERE username = ?";
        jdbcTemplate.update(sql, soloSession, username);
    }

    // getter & setter for duo
    public String getDuo(String username) {
        String sql = "SELECT duo FROM highscore WHERE username = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{username}, String.class);
    }

    public void setDuo(String username, String duo) {
        String sql = "UPDATE highscore SET duo = ? WHERE username = ?";
        jdbcTemplate.update(sql, duo, username);
    }

    // getter & setter for duoSession
    public String getDuoSession(String username) {
        String sql = "SELECT duoSession FROM highscore WHERE username = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{username}, String.class);
    }

    public void setDuoSession(String username, String duoSession) {
        String sql = "UPDATE highscore SET duoSession = ? WHERE username = ?";
        jdbcTemplate.update(sql, duoSession, username);
    }

    // getter & setter for bcMale
    public String getBcMale(String username) {
        String sql = "SELECT bcMale FROM highscore WHERE username = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{username}, String.class);
    }

    public void setBcMale(String username, String bcMale) {
        String sql = "UPDATE highscore SET bcMale = ? WHERE username = ?";
        jdbcTemplate.update(sql, bcMale, username);
    }

    // getter & setter for bcFemale
    public String getBcFemale(String username) {
        String sql = "SELECT bcFemale FROM highscore WHERE username = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{username}, String.class);
    }

    public void setBcFemale(String username, String bcFemale) {
        String sql = "UPDATE highscore SET bcFemale = ? WHERE username = ?";
        jdbcTemplate.update(sql, bcFemale, username);
    }

    // getter & setter for bcDiverse
    public String getBcDiverse(String username) {
        String sql = "SELECT bcDiverse FROM highscore WHERE username = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{username}, String.class);
    }

    public void setBcDiverse(String username, String bcDiverse) {
        String sql = "UPDATE highscore SET bcDiverse = ? WHERE username = ?";
        jdbcTemplate.update(sql, bcDiverse, username);
    }

    // getter & setter for weaponBraSize
    public String getWeaponBraSize(String username) {
        String sql = "SELECT weaponBraSize FROM highscore WHERE username = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{username}, String.class);
    }

    public void setWeaponBraSize(String username, String weaponBraSize) {
        String sql = "UPDATE highscore SET weaponBraSize = ? WHERE username = ?";
        jdbcTemplate.update(sql, weaponBraSize, username);
    }

    // Getter & Setter for single
    public Boolean getSingle(String username) {
        String sql = "SELECT single FROM highscore WHERE username = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{username}, Boolean.class);
    }

    public void setSingle(String username, boolean single) {
        String sql = "UPDATE highscore SET single = ? WHERE username = ?";
        jdbcTemplate.update(sql, single, username);
    }

    // getter & setter for favoritePornCategory
    public String getFavoritePornCategory(String username) {
        String sql = "SELECT favoritePornCategory FROM highscore WHERE username = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{username}, String.class);
    }

    public void setFavoritePornCategory(String username, String favoritePornCategory) {
        String sql = "UPDATE highscore SET favoritePornCategory = ? WHERE username = ?";
        jdbcTemplate.update(sql, favoritePornCategory, username);
    }

    // getter & setter for favoritePornVideo
    public String getFavoritePornVideo(String username) {
        String sql = "SELECT favoritePornVideo FROM highscore WHERE username = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{username}, String.class);
    }

    public void setFavoritePornVideo(String username, String favoritePornVideo) {
        String sql = "UPDATE highscore SET favoritePornVideo = ? WHERE username = ?";
        jdbcTemplate.update(sql, favoritePornVideo, username);
    }

    // getter & setter for sexuality
    public String getSexuality(String username) {
        String sql = "SELECT sexuality FROM highscore WHERE username = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{username}, String.class);
    }

    public void setSexuality(String username, String sexuality) {
        String sql = "UPDATE highscore SET sexuality = ? WHERE username = ?";
        jdbcTemplate.update(sql, sexuality, username);
    }


    // ^^^^ extra categories here ^^^^

    /*

    --- Template for new categories ---

    // getter & setter for XXX
    public String getXXX(String username) {
        String sql = "SELECT XXX FROM highscore WHERE username = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{username}, String.class);
    }

    public void setXXX(String username, String XXX) {
        String sql = "UPDATE highscore SET XXX = ? WHERE username = ?";
        jdbcTemplate.update(sql, XXX, username);
    }

    -----------------------------------
 */

    public void insertStats(Stats stats){
        String username = stats.getUsername();
        setCustomName(username, stats.getCustomName());
        setSolo(username, stats.getSolo());
        setSoloSession(username, stats.getSoloSessions());
        setDuo(username, stats.getDuo());
        setDuoSession(username, stats.getDuoSessions());
        setBcMale(username, stats.getBodycountMale());
        setBcFemale(username, stats.getBodycountFemale());
        setBcDiverse(username, stats.getBodycountDiverse());
        setSexuality(username, stats.getSexuality());
        setWeaponBraSize(username, stats.getWeaponBraSize());
        setFavoritePornCategory(username, stats.getFavoritePornCategory());
        setFavoritePornVideo(username, stats.getFavoritePornVideo());

        // ^^^^ extra categories here ^^^^

        if(stats.getSingle().equalsIgnoreCase("true")){
            setSingle(username, true);
        } else {
            setSingle(username, false);
        }
    }

    public User getAllUserData(String username){
        User user = new User();

        user.setUsername(username);
        user.setPasswordHash(getPasswordHash(username));
        user.setPasswordSalt(getPasswordSalt(username));
        user.setSessionID(getSessionID(username));
        user.setProfilePicture(getProfilePicture(username));
        user.setCustomName(getCustomName(username));
        user.setSolo(getSolo(username));
        user.setSoloSession(getSoloSession(username));
        user.setDuo(getDuo(username));
        user.setDuoSession(getDuoSession(username));
        user.setBcMale(getBcMale(username));
        user.setBcFemale(getBcFemale(username));
        user.setBcDiverse(getBcDiverse(username));
        user.setWeaponBraSize(getWeaponBraSize(username));
        user.setSingle(getSingle(username));
        user.setFavoritePornCategory(getFavoritePornCategory(username));
        user.setFavoritePornVideo(getFavoritePornVideo(username));
        user.setSexuality(getSexuality(username));

        // ^^^^ extra categories here ^^^^

        return user;
    }

    // methode to get all users with their attributes
    public List<User> getAllUsers() {
        String sql = "SELECT * FROM highscore";
        return jdbcTemplate.query(sql, (rs, rowNum) -> {
            return mapUser(rs);
        });
    }

    // auxiliary method for mapping the database rows to User objects
    private User mapUser(ResultSet rs) throws SQLException {
        User user = new User();
        user.setUsername(rs.getString("username"));
        user.setPasswordHash(rs.getString("passwordHash"));
        user.setPasswordSalt(rs.getString("passwordSalt"));
        user.setSessionID(rs.getString("sessionID"));
        user.setProfilePicture(rs.getString("profilePicture"));
        user.setCustomName(rs.getString("customName"));
        user.setSolo(rs.getString("solo"));
        user.setSoloSession(rs.getString("soloSession"));
        user.setDuo(rs.getString("duo"));
        user.setDuoSession(rs.getString("duoSession"));
        user.setBcMale(rs.getString("bcMale"));
        user.setBcFemale(rs.getString("bcFemale"));
        user.setBcDiverse(rs.getString("bcDiverse"));
        user.setWeaponBraSize(rs.getString("weaponBraSize"));
        user.setSingle(rs.getBoolean("single"));
        user.setFavoritePornCategory(rs.getString("favoritePornCategory"));
        user.setFavoritePornVideo(rs.getString("favoritePornVideo"));
        user.setSexuality(rs.getString("sexuality"));
        return user;
    }

    /**
     * Checks if a sessionID exists in the database.
     *
     * @param sessionID The session ID to check.
     * @return true if the sessionID exists, false otherwise.
     */
    public boolean doesSessionIdExist(String sessionID) {
        String sql = "SELECT COUNT(*) FROM highscore WHERE sessionID = ?";
        Integer count = jdbcTemplate.queryForObject(sql, new Object[]{sessionID}, Integer.class);
        return count != null && count > 0;
    }
}



