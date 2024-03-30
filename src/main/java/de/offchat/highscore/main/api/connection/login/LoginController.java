package de.offchat.highscore.main.api.connection.login;

import de.offchat.highscore.main.password.PasswordVerification;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/login")
public class LoginController {


    @PostMapping
    public ResponseEntity<Login> handleFormSubmit(@RequestBody Login login) {
        if(PasswordVerification.verifyPassword(login.getPassword(), login.getUsername())){
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }


}
