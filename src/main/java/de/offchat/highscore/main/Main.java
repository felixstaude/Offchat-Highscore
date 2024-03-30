package de.offchat.highscore.main;

import de.offchat.highscore.main.database.DatabaseConnector;
import de.offchat.highscore.main.database.DatabaseHandler;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.sql.SQLException;


@SpringBootApplication
public class Main {
    public static void main(String[] args) {
        try {
            DatabaseConnector.getConnection();
            DatabaseHandler.createUserTable();
            DatabaseHandler.createHighscoreTable();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

        SpringApplication.run(Main.class, args);
    }
}
