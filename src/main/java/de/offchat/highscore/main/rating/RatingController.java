package de.offchat.highscore.main.rating;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/rating")
public class RatingController {

    @Autowired
    private RatingService ratingService;

    @PostMapping("/add")
    public ResponseEntity<String> addOrUpdateRating(@RequestParam String usernameRated, @RequestParam String username, @RequestParam int ratingValue) {
        ratingService.addOrUpdateRating(usernameRated, username, ratingValue);
        return ResponseEntity.ok("Rating updated successfully");
    }

    @DeleteMapping("/remove")
    public ResponseEntity<String> removeRating(@RequestParam String usernameRated, @RequestParam String username) {
        ratingService.removeRating(usernameRated, username);
        return ResponseEntity.ok("Rating removed successfully");
    }

    @GetMapping("/average")
    public ResponseEntity<Double> getAverageRating(@RequestParam String usernameRated) {
        double average = ratingService.calculateAverageRating(usernameRated);
        return ResponseEntity.ok(average);
    }

}

