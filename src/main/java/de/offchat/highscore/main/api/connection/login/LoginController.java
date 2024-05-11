package de.offchat.highscore.main.api.connection.login;

import de.offchat.highscore.main.api.connection.session.SessionId;
import de.offchat.highscore.main.database.Data;
import de.offchat.highscore.main.database.DatabaseConfig;
import de.offchat.highscore.main.password.PasswordVerification;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/login")
public class LoginController {


    /**
     * checks if the given login credentials are correct, if so send true and a sessionID to the frontend
     *
     * @param login
     * @return boolean success, String sessionID
     */
    @PostMapping
    public ResponseEntity<LoginResponse> handleFormSubmit(@RequestBody Login login) {
        if(new PasswordVerification(new DatabaseConfig().jdbcTemplate(new DatabaseConfig().dataSource())).verifyPassword(login.getPassword(), login.getUsername())){
            String sessionID = new SessionId().generateSessionID();
            new Data().setSessionID(login.getUsername(), sessionID);
            System.out.println(sessionID);
            return ResponseEntity.ok(new LoginResponse(true, sessionID));
        }
        return ResponseEntity.ok(new LoginResponse(false, null));
    }

}
