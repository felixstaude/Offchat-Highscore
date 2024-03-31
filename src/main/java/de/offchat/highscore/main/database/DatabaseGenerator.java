package de.offchat.highscore.main.database;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;

public class DatabaseGenerator {

    /**
     * generates the user table if not exists
     */
    public static void createUserTable(){
        String sql = "CREATE TABLE IF NOT EXISTS users (" +
                " username VARCHAR(256) UNIQUE NOT NULL," +
                " password_hash VARCHAR(256) NOT NULL," +
                " salt VARCHAR(256) NOT NULL, profilepicture VARCHAR(256))";

        try (Connection connection = DatabaseConnector.getConnection();
             Statement statement = connection.createStatement()) {
            statement.execute(sql);
            System.out.println("'users' table successfully created!");

        } catch (SQLException e) {
            throw new RuntimeException("Error whilst creating table:" + e);
        }

    }
    /**
     * generates the highscore table if not exists
     */
    public static void createHighscoreTable(){
        String sql = "CREATE TABLE IF NOT EXISTS highscore (username VARCHAR(256) NOT NULL UNIQUE KEY, name VARCHAR(256) NOT NULL, solo VARCHAR(8) NOT NULL," +
                " soloSession VARCHAR(8) NOT NULL, duo VARCHAR(8) NOT NULL, duoSession VARCHAR(8) NOT NULL, bodycount VARCHAR(8) NOT NULL," +
                " bcmale VARCHAR(8) NOT NULL, bcfemale VARCHAR(8) NOT NULL, bcdiverse VARCHAR(8) NOT NULL, weapon_bra_size VARCHAR(8) NOT NULL," +
                " single BOOLEAN NOT NULL, favPornCategory VARCHAR(256) NOT NULL, favPornVid VARCHAR(256) NOT NULL, sexuality VARCHAR(256) NOT NULL)";

        try (Connection connection = DatabaseConnector.getConnection();
             Statement statement = connection.createStatement()) {
            statement.execute(sql);
            System.out.println("'highscore' table successfully created!");

        } catch (SQLException e) {
            throw new RuntimeException("Error whilst creating table:" + e);
        }
    }

    /**
     * generates the sessionID table if not exists
     */
    public static void createSessionIDTable(){
        String sql = "CREATE TABLE IF NOT EXISTS sessionid (username VARCHAR(256) NOT NULL UNIQUE KEY, sessionid VARCHAR(256) NOT NULL UNIQUE KEY)";

        try(Connection connection = DatabaseConnector.getConnection(); Statement statement = connection.createStatement()){
            statement.execute(sql);
            System.out.println("'sessionid' table successfully created!");

        } catch (SQLException e){
            throw new RuntimeException("Error whilst creating table:" + e);
        }
    }

}
