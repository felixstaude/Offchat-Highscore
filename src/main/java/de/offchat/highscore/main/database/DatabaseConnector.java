package de.offchat.highscore.main.database;

import java.io.InputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;

public class DatabaseConnector {

    private static final String PROPERTIES_FILE = "database.properties";
    private static Properties properties = new Properties();

    static {
        try (InputStream input = DatabaseConnector.class.getClassLoader().getResourceAsStream(PROPERTIES_FILE)) {
            if (input == null) {
                throw new RuntimeException("Could not find: " + PROPERTIES_FILE);
            }
            properties.load(input);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Error while loading properties", e);
        }

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
            throw new RuntimeException("MySQL JDBC-Driver not found!", e);
        }
    }

    public static Connection getConnection() throws SQLException {
        String url = properties.getProperty("database.url");
        String user = properties.getProperty("database.user");
        String password = properties.getProperty("database.password");
        return DriverManager.getConnection(url, user, password);
    }
}