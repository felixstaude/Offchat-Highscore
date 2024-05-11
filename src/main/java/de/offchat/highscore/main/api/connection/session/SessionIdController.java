package de.offchat.highscore.main.api.connection.session;

import de.offchat.highscore.main.api.connection.user.User;
import de.offchat.highscore.main.database.Data;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/checksession")
public class SessionIdController {

    private String providedSessionID;

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

            if(user.getProfilePicture() == null || user.getProfilePicture().equalsIgnoreCase("null")){
                return ResponseEntity.ok(null);
            }
            return ResponseEntity.ok(user);

        }
        return ResponseEntity.ok(null);
    }

}
