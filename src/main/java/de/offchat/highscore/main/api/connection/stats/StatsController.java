package de.offchat.highscore.main.api.connection.stats;

import de.offchat.highscore.main.Main;
import de.offchat.highscore.main.database.Data;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.logging.Logger;

@RestController
@RequestMapping("/api/stats")
public class StatsController {

    Logger logger = Logger.getLogger(StatsController.class.getName());

    /**
     * get the stats from the frontend and insert them into the database
     * @param stats
     * @return response entity stats
     */
    @PostMapping
    public ResponseEntity<Stats> handleFormSubmit(@RequestParam("sessionId") String sessionId, @RequestBody Stats stats) {
        new Data().insertStats(stats);
        if(!new Data().doesSessionIdExist(sessionId)){
            return ResponseEntity.badRequest().build();
        }
        if(Main.getDebugMode()){

            logger.info("Stats Request send from: " + stats.getUsername());
            logger.info("Stats Request answer: " + new Data().getAllUserDataString(stats.getUsername()));
        }

        return ResponseEntity.ok().body(stats);
    }
}
