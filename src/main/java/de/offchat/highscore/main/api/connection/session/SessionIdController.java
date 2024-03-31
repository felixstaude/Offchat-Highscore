package de.offchat.highscore.main.api.connection.session;

import de.offchat.highscore.main.api.connection.users.Users;
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
    public ResponseEntity<Users> handleFormSubmit(@RequestBody SessionId sessionID) {
        providedSessionID = sessionID.getSessionID();
        System.out.println("provided SessionID: " + providedSessionID);
        System.out.println("User: " + SessionIdPersister.getUserFromSessionId(providedSessionID));
        if(SessionIdPersister.doesSessionIdExist(providedSessionID)){
            String username = SessionIdPersister.getUserFromSessionId(providedSessionID);
            return ResponseEntity.ok(new Users(username));
        }
        return ResponseEntity.ok().body(null);
    }

}
