package de.offchat.highscore.main;

import de.offchat.highscore.main.database.DatabaseConnector;
import de.offchat.highscore.main.database.DatabaseGenerator;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication
public class Main {
    public static void main(String[] args) {

        DatabaseConnector.getConnection();

        DatabaseGenerator.createUserTable();
        DatabaseGenerator.createHighscoreTable();
        DatabaseGenerator.createSessionIDTable();

        SpringApplication.run(Main.class, args);
    }
}
