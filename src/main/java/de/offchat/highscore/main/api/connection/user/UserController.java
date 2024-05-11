package de.offchat.highscore.main.api.connection.user;


import de.offchat.highscore.main.database.Data;
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
        String username = new Data().getUsernameFromSessionID(sessionId);
        if(username == null){
            return ResponseEntity.notFound().build();
        }
        System.out.println(new Data().getAllUserData(username).getCustomName());
        return ResponseEntity.ok(new Data().getAllUserData(username));
    }
}
