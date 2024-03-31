package de.offchat.highscore.main.api.connection.session;

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
    public ResponseEntity<String> handleFormSubmit(@RequestBody SessionId sessionID) {
        providedSessionID = sessionID.getSessionID();
        System.out.println("provided SessionID: " + providedSessionID);
        System.out.println("User SessionID" + SessionIdPersister.getUserFromSessionId(providedSessionID));
        if(SessionIdPersister.doesSessionIdExist(providedSessionID)){
            return ResponseEntity.ok(SessionIdPersister.getUserFromSessionId(providedSessionID));
        }
        return ResponseEntity.ok(null);
    }

}