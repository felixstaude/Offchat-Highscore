package de.offchat.highscore.main.api.connection.stats;

import de.offchat.highscore.main.database.DatabaseConnector;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class StatsPersister {

    /**
     * inserts the given stats into the highscore database
     * @param stats
     */
    public static void insertStats(Stats stats){
        String sql = "INSERT INTO highscore (username, name, solo, soloSession, duo, duoSession, " +
                "bodycount, bcmale, bcfemale, bcdiverse, weapon_bra_size, single, favPornCategory, favPornVid, sexuality) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE name = VALUES(name), solo " +
                "= VALUES(solo), soloSession = VALUES(soloSession)," +
                "duo = VALUES(duo), duoSession = VALUES(duoSession), bodycount = VALUES(bodycount)," +
                "bcmale = VALUES(bcmale), bcfemale = VALUES(bcfemale), bcdiverse = VALUES(bcdiverse)," +
                "weapon_bra_size = VALUES(weapon_bra_size), single = VALUES(single)," +
                "favPornCategory = VALUES(favPornCategory), favPornVid = VALUES(favPornVid), sexuality = VALUES(sexuality)";

        try(Connection connection = DatabaseConnector.getConnection(); PreparedStatement statement =
                connection.prepareStatement(sql)){
            stats.setUsername("felix");
            statement.setString(1, stats.getUsername());
            statement.setString(2, stats.getName());
            statement.setString(3, stats.getSolo());
            statement.setString(4, stats.getSoloSessions());
            statement.setString(5, stats.getDuo());
            statement.setString(6, stats.getDuoSessions());
            statement.setString(7, stats.getBodycount());
            statement.setString(8, stats.getBcm());
            statement.setString(9, stats.getBcf());
            statement.setString(10, stats.getBcd());
            statement.setString(11, stats.getWeapon_bra_size());
            if(stats.getSingle().equals("on")){
                statement.setBoolean(12, true);
            } else {
                statement.setBoolean(12, false);
            }
            statement.setString(13, stats.getFavPornCategory());
            statement.setString(14, stats.getFavePornVid());
            statement.setString(15, stats.getSexuality());

            statement.executeUpdate();

        } catch (SQLException e){
            System.out.println("Error whilst insert into database: " + e.getMessage());
        }
    }

}
