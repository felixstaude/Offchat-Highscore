package de.offchat.highscore.main.api.connection.session;

import de.offchat.highscore.main.api.connection.user.User;
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
    public ResponseEntity<User> handleFormSubmit(@RequestBody SessionId sessionID) {
        providedSessionID = sessionID.getSessionID();
        if(SessionIdPersister.doesSessionIdExist(providedSessionID)){
            User users = new User();
            String username = SessionIdPersister.getUserFromSessionId(providedSessionID);
            users.setUsername(username);
            users.setProfilePicture(getProfilePicture(username));

            if(users.getProfilePicture() == null || users.getProfilePicture() == "null"){
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(users);
        }
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
