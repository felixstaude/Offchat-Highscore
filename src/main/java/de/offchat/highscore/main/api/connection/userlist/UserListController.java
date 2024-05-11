package de.offchat.highscore.main.api.connection.userlist;

import de.offchat.highscore.main.api.connection.user.User;
import de.offchat.highscore.main.database.Data;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/userlist")
public class UserListController {

    private final Data data;

    public UserListController(Data data) {
        this.data = data;
    }

    // returns all user data
    @GetMapping("/data")
    public ResponseEntity<List<User>> getAllUserData() {
        List<User> users = data.getAllUsers();
        System.out.println(Arrays.stream(data.getAllUsers().toArray()));
        if (users.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(users);
    }
}
