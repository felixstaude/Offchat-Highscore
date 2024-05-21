package de.offchat.highscore.main.rating;

public class RatingRequest {
    private String username;
    private String usernameRated;
    private int ratingValue;

    // Getters and Setters
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getUsernameRated() {
        return usernameRated;
    }

    public void setUsernameRated(String usernameRated) {
        this.usernameRated = usernameRated;
    }

    public int getRatingValue() {
        return ratingValue;
    }

    public void setRatingValue(int ratingValue) {
        this.ratingValue = ratingValue;
    }

}

