package de.offchat.highscore.main.api.connection.stats;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/stats")
public class StatsController {

    /**
     * get the stats from the frontend and insert them into the database
     * @param stats
     * @return response entity stats
     */
    @PostMapping
    public ResponseEntity<Stats> handleFormSubmit(@RequestBody Stats stats) {
        StatsPersister.insertStats(stats);
        return ResponseEntity.ok().body(stats);
    }
}
