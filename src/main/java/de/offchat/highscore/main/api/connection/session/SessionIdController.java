package de.offchat.highscore.main.api.connection.session;

import de.offchat.highscore.main.api.connection.users.Users;
import de.offchat.highscore.main.database.DatabaseConnector;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

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
        if(SessionIdPersister.doesSessionIdExist(providedSessionID)){
            Users users = new Users();
            String username = SessionIdPersister.getUserFromSessionId(providedSessionID);
            users.setUsername(username);
            users.setProfilepicture(getProfilePicture(username));

            if(users.getProfilepicture() == null || users.getProfilepicture() == "null"){
                users.setProfilepicture("https://static-cdn.jtvnw.net/jtv_user_pictures/04abc1b4-7bad-4b55-8da8-c0f1cf031bda-profile_image-70x70.png");
            }

            System.out.println("Username: " + users.getUsername());
            System.out.println("pfp: " + users.getProfilepicture());
            return ResponseEntity.ok(users);
        }
        System.out.println("mhm");
        return ResponseEntity.notFound().build();
    }

    private String getProfilePicture(String username){
        String sql = "SELECT profilepicture FROM users WHERE username = ?";
        String profilePicture = null;

        try (Connection connection = DatabaseConnector.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {

            statement.setString(1, username);
            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    profilePicture = resultSet.getString("profilepicture");
                }
            }
        } catch (SQLException e) {
            throw new RuntimeException("Error while retrieving username from sessionid: " + e.getMessage(), e);
        }

        return profilePicture;

    }
}
