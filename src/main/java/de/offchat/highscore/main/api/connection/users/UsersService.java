package de.offchat.highscore.main.api.connection.users;

public class UsersService {



    public UsersService() {

    }

    public Users getUserByUsername(String username){
        Users users = new Users();
        users.setUsername(username);
        users.setProfilepicture("test");

        return users;
    }

}
