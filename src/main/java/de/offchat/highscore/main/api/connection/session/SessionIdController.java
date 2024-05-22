package de.offchat.highscore.main.api.connection.session;

import de.offchat.highscore.main.Main;
import de.offchat.highscore.main.api.connection.user.User;
import de.offchat.highscore.main.database.Data;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.logging.Logger;

@RestController
@RequestMapping("/api/checksession")
public class SessionIdController {

    private String providedSessionID;
    Logger logger = Logger.getLogger(SessionIdController.class.getName());

    /**
     * checks if the user has a sessionID
     * @param sessionID SessionId.get
     * @return boolean
     */
    @PostMapping
    public ResponseEntity<User> handleFormSubmit(@RequestBody SessionId sessionID) {
        providedSessionID = sessionID.getSessionID();
        if(new Data().doesSessionIdExist(providedSessionID)){
            User user = new User();
            String username = new Data().getUsernameFromSessionID(providedSessionID);
            user.setUsername(username);
            user.setProfilePicture(new Data().getProfilePicture(username));
            if(Main.getDebugMode()){
                logger.info("SessionID Request send from: " + sessionID.getSessionID());
            }
            if(user.getProfilePicture() == null || user.getProfilePicture().equalsIgnoreCase("null")){
                logger.warning("User has no profilepicture!");
                return ResponseEntity.ok(null);
            }
            if(Main.getDebugMode()){
                logger.info("SessionID Response: " + new Data().getAllUserDataString(user.getUsername()));
            }
            return ResponseEntity.ok(user);

        }
        logger.warning("provided sessionID does not exist");
        return ResponseEntity.ok(null);
    }

}
