package de.offchat.highscore.main.rating;

import de.offchat.highscore.main.database.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.logging.Logger;

@RestController
@RequestMapping("/api/rating")
public class RatingController {

    Logger logger = Logger.getLogger(RatingController.class.getName());

    @Autowired
    private RatingService ratingService;
    @Autowired
    private Data dataService; // Assuming Data service is correctly implemented

    @PostMapping("/add")
    public ResponseEntity<Map<String, Object>> addOrUpdateRating(@RequestParam("sessionId") String sessionId, @RequestBody RatingRequest request) {
        if (!dataService.doesSessionIdExist(sessionId)) {
            logger.warning("Invalid or expired session ID for sessionID: " + sessionId);
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("message", "Invalid session ID.");
            return ResponseEntity.badRequest().body(errorResponse);
        }
        logger.info("Received rating update request: " + request.getUsername() + " rates " + request.getUsernameRated() + " with " + request.getRatingValue());
        ratingService.addOrUpdateRating(request.getUsernameRated(), request.getUsername(), request.getRatingValue());
        Map<String, Object> successResponse = new HashMap<>();
        successResponse.put("success", true);
        successResponse.put("message", "Rating updated successfully");
        return ResponseEntity.ok(successResponse);
    }


    @DeleteMapping("/remove")
    public ResponseEntity<String> removeRating(@RequestParam("sessionID") String sessionId, @RequestBody RatingRequest request) {
        if (!dataService.doesSessionIdExist(sessionId)) {
            logger.warning("Session ID does not exist for deletion: " + sessionId);
            return ResponseEntity.badRequest().body("Invalid session ID.");
        }
        logger.info("Received rating delete request for: " + request.getUsernameRated() + " by " + request.getUsername());
        ratingService.removeRating(request.getUsernameRated(), request.getUsername());
        return ResponseEntity.ok("Rating removed successfully");
    }

    @GetMapping("/average")
    public ResponseEntity<Double> getAverageRating(@RequestParam String usernameRated) {
        double average = ratingService.calculateAverageRating(usernameRated);
        logger.info("Average rating calculated for: " + usernameRated + " is " + average);
        return ResponseEntity.ok(average);
    }
}
