package de.offchat.highscore.main.rating;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class RatingService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Transactional
    public void addOrUpdateRating(String usernameRated, String username, int ratingValue) {
        String sql = "INSERT INTO rating (usernameRated, username, ratingValue) VALUES (?, ?, ?) " +
                "ON DUPLICATE KEY UPDATE ratingValue = ?";
        jdbcTemplate.update(sql, usernameRated, username, ratingValue, ratingValue);
    }

    public void removeRating(String usernameRated, String username) {
        String sql = "DELETE FROM rating WHERE usernameRated = ? AND username = ?";
        jdbcTemplate.update(sql, usernameRated, username);
    }

    public double calculateAverageRating(String usernameRated) {
        String sql = "SELECT AVG(ratingValue) FROM rating WHERE usernameRated = ?";
        Double average = jdbcTemplate.queryForObject(sql, new Object[]{usernameRated}, Double.class);
        return average != null ? average : 0.0;
    }
}

