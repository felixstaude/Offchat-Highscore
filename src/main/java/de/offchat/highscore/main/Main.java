package de.offchat.highscore.main;

import de.offchat.highscore.main.database.DatabaseGenerator;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;


@SpringBootApplication
@ComponentScan(basePackages = "de.offchat.highscore")
public class Main {

    @Value("${spring.datasource.url}")
    private String datasourceUrl;

    @Value("${spring.datasource.username}")
    private String datasourceUsername;

    @Value("${spring.datasource.password}")
    private String datasourcePassword;


    private static boolean DebugMode = true;

    public static void main(String[] args) {
        SpringApplication.run(Main.class, args);
        new DatabaseGenerator().generateTable();

    }

    @PostConstruct
    public void init() {
        System.out.println("Datasource URL: " + datasourceUrl);
        System.out.println("Datasource Username: " + datasourceUsername);
        System.out.println("Datasource Password: " + datasourcePassword);
    }

    public static boolean getDebugMode(){
        return DebugMode;
    }
}
