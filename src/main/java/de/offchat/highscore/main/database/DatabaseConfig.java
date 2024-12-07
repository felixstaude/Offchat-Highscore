package de.offchat.highscore.main.database;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

import javax.sql.DataSource;
import java.io.FileInputStream;
import java.nio.file.Paths;
import java.util.Properties;

@Configuration
public class DatabaseConfig {

    @Bean
    public DataSource dataSource() {
        Properties props = new Properties();
        String propFileName = "config.properties";

        try {
            // Assuming the properties file is in the same directory as the jar file
            String jarPath = Paths.get(DatabaseConfig.class.getProtectionDomain().getCodeSource().getLocation().toURI()).getParent().toString();
            props.load(new FileInputStream(jarPath + "/" + propFileName));
        } catch (Exception e) {
            throw new RuntimeException("Unable to load database credentials", e);
        }

        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName("com.mysql.cj.jdbc.Driver");
        dataSource.setUrl("jdbc:mysql://localhost:3306/offchat_highscore?serverTimezone=UTC");
        dataSource.setUsername(props.getProperty("db.username"));
        dataSource.setPassword(props.getProperty("db.password"));
        return dataSource;
    }

    @Bean
    public JdbcTemplate jdbcTemplate(DataSource dataSource) {
        return new JdbcTemplate(dataSource);
    }
}
