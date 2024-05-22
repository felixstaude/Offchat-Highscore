package de.offchat.highscore.main.api.connection.user;

import de.offchat.highscore.main.Main;
import de.offchat.highscore.main.database.Data;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.logging.Logger;

@RestController
@RequestMapping("/api/user")
public class UserController {

    Logger logger = Logger.getLogger(UserController.class.getName());

    public UserController() {
    }

    @GetMapping("/data")
    public ResponseEntity<User> getUserData(@RequestParam("sessionId") String sessionId) {
        if (!new Data().doesSessionIdExist(sessionId)) {
            logger.warning("Invalid or non-existent sessionId provided: " + sessionId);
            return ResponseEntity.status(401).body(null); // Unauthorised response
        }

        String username = new Data().getUsernameFromSessionID(sessionId);
        if (username == null) {
            logger.warning("No username found for the provided sessionId: " + sessionId);
            return ResponseEntity.notFound().build();
        }

        if (Main.getDebugMode()) {
            logger.info("Userdata Request received for Session ID: " + sessionId);
            logger.info("Username retrieved: " + username);
            logger.info("User Data Response: " + new Data().getAllUserData(username));
        }

        return ResponseEntity.ok(new Data().getAllUserData(username));
    }
}
