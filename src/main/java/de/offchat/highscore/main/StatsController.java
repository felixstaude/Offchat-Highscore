package de.offchat.highscore.main;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class StatsController {

    @PostMapping
    public ResponseEntity<Stats> handleFormSubmit(@RequestBody Stats stats) {
        // Hier kannst du mit den Daten der 'stats'-Instanz arbeiten
        System.out.println(stats.getName());
        System.out.println(stats.getSolo());
        // ...

        // Verarbeitung der Daten oder Speicherung in der Datenbank etc.

        return ResponseEntity.ok(stats); // Oder gebe eine andere geeignete Antwort zurück
    }
}
