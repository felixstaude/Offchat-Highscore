package de.offchat.highscore.main.database;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
public class DatabaseGenerator {

    @Autowired
    private JdbcTemplate jdbcTemplate = new DatabaseConfig().jdbcTemplate(new DatabaseConfig().dataSource());

    public void generateTable() {
        String sqlHighscore = "CREATE TABLE IF NOT EXISTS highscore (" +
                "username VARCHAR(256) UNIQUE, " +
                "passwordHash VARCHAR(256), " +
                "passwordSalt VARCHAR(256), " +
                "sessionID VARCHAR(256), " +
                "profilePicture VARCHAR(256), " +
                "customName VARCHAR(256), " +
                "solo VARCHAR(8), " +
                "soloSession VARCHAR(8), " +
                "duo VARCHAR(8), " +
                "duoSession VARCHAR(8), " +
                "bcMale VARCHAR(8), " +
                "bcFemale VARCHAR(8), " +
                "bcDiverse VARCHAR(8), " +
                "weaponBraSize VARCHAR(8), " +
                "single BOOLEAN, " +
                "favoritePornCategory VARCHAR(256), " +
                "favoritePornVideo VARCHAR(256), " +
                "sexuality VARCHAR(256)" +
                ")";

        jdbcTemplate.execute(sqlHighscore);

        String sqlRating = "CREATE TABLE IF NOT EXISTS rating (" +
                "    usernameRated VARCHAR(256)," +
                "    username VARCHAR(256)," +
                "    ratingValue INT CHECK (ratingValue BETWEEN 1 AND 5)," +
                "    PRIMARY KEY (usernameRated, username)," +
                "    FOREIGN KEY (usernameRated) REFERENCES highscore(username) ON DELETE CASCADE," +
                "    FOREIGN KEY (username) REFERENCES highscore(username) ON DELETE CASCADE" +
                ")";

        jdbcTemplate.execute(sqlRating);
        System.out.println("DATABASE CREATED");
    }

}
