package de.offchat.highscore.main.api.connection.userlist;

import de.offchat.highscore.main.api.connection.user.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/userlist")
public class UserListController {

    private final UserListService userListService = new UserListService();

    @GetMapping("/data")
    public ResponseEntity<UserList> getAllUserData() {
        List<User> users = userListService.getAllUsers();
        if (users.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        UserList userList = new UserList(users);
        return ResponseEntity.ok(userList);
    }
}
