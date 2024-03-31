package de.offchat.highscore.main.api.connection.users;


import de.offchat.highscore.main.api.connection.session.SessionIdPersister;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class UsersController {

    /**
     * sends the following user data:
     * String username
     * String name
     * String solo
     * String soloSession
     * String duo
     * String duoSession
     * String bodycount
     * String bodycountmale
     * String bodycountfemale
     * String bodycountdiverse
     * String sexuality
     * String weapon_bra_size
     * Boolean single
     * String favePornCategory
     * String favePornVid
     */

    @PostMapping
    public ResponseEntity<Users> handleFormSubmit(@RequestBody Users users) {
        return ResponseEntity.ok(new Users(SessionIdPersister.getUserFromSessionId(users.getSessionID())));

    }
}
