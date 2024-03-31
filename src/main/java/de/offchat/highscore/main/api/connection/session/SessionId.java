package de.offchat.highscore.main.api.connection.session;

import com.fasterxml.uuid.Generators;

import java.util.Random;

public class SessionId {

    private String sessionID;

    public SessionId(){

    }

    /**
     * generates a new sessionID
     * @return sessionID as String
     */
    public String generateSessionID(){
        sessionID = Generators.randomBasedGenerator(new Random()).generate().toString() + Generators.randomBasedGenerator(new Random()).generate().toString();
        return sessionID.replace("-", "");
    }

    public String getSessionID(){
        return sessionID;
    }

    public void setSessionID(String sessionID) {
        this.sessionID = sessionID;
    }

}
