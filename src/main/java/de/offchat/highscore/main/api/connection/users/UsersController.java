package de.offchat.highscore.main.api.connection.users;


import de.offchat.highscore.main.api.connection.session.SessionIdPersister;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
public class UsersController {

    public UsersController(){
    }

    @GetMapping("/data")
    public ResponseEntity<Users> getUserData(@RequestParam String sessionId){
        String username = new SessionIdPersister().getUserFromSessionId(sessionId);
        if(username == null){
            return ResponseEntity.notFound().build();
        }
        Users user = new UsersService().getUserByUsername(username);
        return ResponseEntity.ok(user);
    }
}
