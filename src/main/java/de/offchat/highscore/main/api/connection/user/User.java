package de.offchat.highscore.main.api.connection.user;

public class User {

    private String username;
    private String passwordHash;
    private String passwordSalt;
    private String sessionID;
    private String profilePicture;
    private String customName;
    private String solo;
    private String soloSession;
    private String duo;
    private String duoSession;
    private String bcMale;
    private String bcFemale;
    private String bcDiverse;
    private String weaponBraSize;
    private Boolean single;
    private String favoritePornCategory;
    private String favoritePornVideo;
    private String sexuality;

    public User(){
        username = this.getUsername();
        passwordHash = this.getPasswordHash();
        passwordSalt = this.getPasswordSalt();
        sessionID = this.getSessionID();
        profilePicture = this.getProfilePicture();
        customName = this.getCustomName();
        solo = this.getSolo();
        soloSession = this.getSoloSession();
        duo = this.getDuo();
        duoSession = this.getDuoSession();
        bcMale = this.getBcMale();
        bcFemale = this.getBcFemale();
        bcDiverse = this.getBcDiverse();
        weaponBraSize = this.getWeaponBraSize();
        single = this.getSingle();
        favoritePornCategory = this.getFavoritePornCategory();
        favoritePornVideo = this.getFavoritePornVideo();
        sexuality = this.getSexuality();

        // ^^^^ extra categories here ^^^^

    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPasswordHash() {
        return passwordHash;
    }

    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }

    public String getPasswordSalt() {
        return passwordSalt;
    }

    public void setPasswordSalt(String passwordSalt) {
        this.passwordSalt = passwordSalt;
    }

    public String getSessionID() {
        return sessionID;
    }

    public void setSessionID(String sessionID) {
        this.sessionID = sessionID;
    }

    public String getProfilePicture() {
        return profilePicture;
    }

    public void setProfilePicture(String profilePicture) {
        this.profilePicture = profilePicture;
    }

    public String getCustomName() {
        return customName;
    }

    public void setCustomName(String customName) {
        this.customName = customName;
    }

    public String getSolo() {
        return solo;
    }

    public void setSolo(String solo) {
        this.solo = solo;
    }

    public String getSoloSession() {
        return soloSession;
    }

    public void setSoloSession(String soloSession) {
        this.soloSession = soloSession;
    }

    public String getDuo() {
        return duo;
    }

    public void setDuo(String duo) {
        this.duo = duo;
    }

    public String getDuoSession() {
        return duoSession;
    }

    public void setDuoSession(String duoSession) {
        this.duoSession = duoSession;
    }

    public String getBcMale() {
        return bcMale;
    }

    public void setBcMale(String bcMale) {
        this.bcMale = bcMale;
    }

    public String getBcFemale() {
        return bcFemale;
    }

    public void setBcFemale(String bcFemale) {
        this.bcFemale = bcFemale;
    }

    public String getBcDiverse() {
        return bcDiverse;
    }

    public void setBcDiverse(String bcDiverse) {
        this.bcDiverse = bcDiverse;
    }

    public String getWeaponBraSize() {
        return weaponBraSize;
    }

    public void setWeaponBraSize(String weaponBraSize) {
        this.weaponBraSize = weaponBraSize;
    }

    public Boolean getSingle() {
        return single;
    }

    public void setSingle(Boolean single) {
        this.single = single;
    }

    public String getFavoritePornCategory() {
        return favoritePornCategory;
    }

    public void setFavoritePornCategory(String favoritePornCategory) {
        this.favoritePornCategory = favoritePornCategory;
    }

    public String getFavoritePornVideo() {
        return favoritePornVideo;
    }

    public void setFavoritePornVideo(String favoritePornVideo) {
        this.favoritePornVideo = favoritePornVideo;
    }

    public String getSexuality() {
        return sexuality;
    }

    public void setSexuality(String sexuality) {
        this.sexuality = sexuality;
    }

    // ^^^^ extra categories here ^^^^

}

