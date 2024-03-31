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
     * @param sessionId SessionId.get
     * @return boolean
     */
    @PostMapping
    public ResponseEntity<String> handleFormSubmit(@RequestBody SessionId sessionId) {
        providedSessionID = sessionId.getSessionID();

        if(SessionIdPersister.doesSessionIdExist(providedSessionID)){
            return ResponseEntity.ok(SessionIdPersister.getUserFromSessionId(providedSessionID));
        }
        return ResponseEntity.ok(null);
    }

}
