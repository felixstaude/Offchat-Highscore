package de.offchat.highscore.main.api.connection.user;


import de.offchat.highscore.main.api.connection.session.SessionIdPersister;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
public class UserController {

    public UserController(){
    }

    @GetMapping("/data")
    public ResponseEntity<User> getUserData(@RequestParam String sessionId){
        String username = new SessionIdPersister().getUserFromSessionId(sessionId);
        if(username == null){
            return ResponseEntity.notFound().build();
        }
        User user = new UserService().getUserByUsername(username);
        System.out.println("Anfrage an /api/user/data gestellt: " + user);
        return ResponseEntity.ok(user);
    }
}
