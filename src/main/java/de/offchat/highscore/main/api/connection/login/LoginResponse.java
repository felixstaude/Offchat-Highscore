package de.offchat.highscore.main.api.connection.login;

public class LoginResponse {
    private boolean success;
    private String sessionID;

    public LoginResponse(boolean success, String sessionID){
        this.success = success;
        this.sessionID = sessionID;

    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getSessionID() {
        return sessionID;
    }

    public void setSessionID(String sessionID) {
        this.sessionID = sessionID;
    }
}
