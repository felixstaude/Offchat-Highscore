package de.offchat.highscore.main.api.connection.session;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/checklogin")
public class SessionIdController {

    /**
     * checks if the user has a sessionID
     * @param sessionId SessionId.get
     * @return boolean
     */
    @PostMapping
    public ResponseEntity<Boolean> handleFormSubmit(@RequestBody SessionId sessionId) {
        checkSessionID(sessionId.getUsername(), sessionId.getSessionID());

        return ResponseEntity.accepted().body(false);
    }

    public void checkSessionID(String username, String sessionID){

    }


}
