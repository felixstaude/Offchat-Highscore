package de.offchat.highscore.main.database;

import javax.xml.crypto.Data;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;

public class DatabaseHandler {

    public static void createUserTable(){
        String sql = "CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(256) NOT NULL, password VARCHAR(256) NOT NULL)";

        try (Connection connection = DatabaseConnector.getConnection();
             Statement statement = connection.createStatement()) {
            statement.execute(sql);
            System.out.println("'users' table successfully created!");

        } catch (SQLException e) {
            throw new RuntimeException("Error whilst creating table:" + e);
        }

    }

    public static void createHighscoreTable(){

    }
}
