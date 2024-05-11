package de.offchat.highscore.main;

import de.offchat.highscore.main.database.DatabaseGenerator;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;


@SpringBootApplication
@ComponentScan(basePackages = "de.offchat.highscore")
public class Main {

    private static boolean DebugMode = true;

    public static void main(String[] args) {
        SpringApplication.run(Main.class, args);
        new DatabaseGenerator().generateTable();

    }

    public static boolean getDebugMode(){
        return DebugMode;
    }
}
