package de.offchat.highscore.main.api.connection.userlist;

import de.offchat.highscore.main.Main;
import de.offchat.highscore.main.api.connection.user.User;
import de.offchat.highscore.main.database.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.logging.Logger;

@RestController
@RequestMapping("/api/userlist")
public class UserListController {

    private final Data data;
    private Logger logger = Logger.getLogger(UserListController.class.getName());

    @Autowired
    public UserListController(Data data) {
        this.data = data;
    }

    // returns all user data
    @GetMapping("/data")
    public ResponseEntity<List<User>> getAllUserData(@RequestParam("sessionId") String sessionId) {
        if (!data.doesSessionIdExist(sessionId)) {
            logger.warning("Invalid or non-existent sessionId provided: " + sessionId);
            return ResponseEntity.status(401).build(); // Unauthorized response
        }
        List<User> users = data.getAllUsers();
        if (users.isEmpty()) {
            logger.warning("No users found in the system.");
            return ResponseEntity.notFound().build();
        }

        if (Main.getDebugMode()) {
            logger.info("All Users Request sent from Session ID: " + sessionId);
            logger.info("Number of Users retrieved: " + users.size());
            users.forEach(user -> logger.info("User: " + user.getUsername()));
        }

        return ResponseEntity.ok(users);
    }
}
