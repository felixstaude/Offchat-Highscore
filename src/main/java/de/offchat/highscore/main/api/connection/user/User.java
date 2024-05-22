package de.offchat.highscore.main.api.connection.user;

public class User {

    private String username;
    private String profilePicture;
    private String customName;
    private String solo;
    private String soloSession;
    private String duo;
    private String duoSession;
    private String bodycountMale;
    private String bodycountFemale;
    private String bodycountDiverse;
    private String weaponBraSize;
    private Boolean single;
    private String favoritePornCategory;
    private String favoritePornVideo;
    private String sexuality;

    public User(){
        username = this.getUsername();
        profilePicture = this.getProfilePicture();
        customName = this.getCustomName();
        solo = this.getSolo();
        soloSession = this.getSoloSession();
        duo = this.getDuo();
        duoSession = this.getDuoSession();
        bodycountMale = this.getBodycountMale();
        bodycountFemale = this.getBodycountFemale();
        bodycountDiverse = this.getBodycountDiverse();
        sexuality = this.getSexuality();
        weaponBraSize = this.getWeaponBraSize();
        single = this.getSingle();
        favoritePornCategory = this.getFavoritePornCategory();
        favoritePornVideo = this.getFavoritePornVideo();

        // ^^^^ extra categories here ^^^^

    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
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

    public String getBodycountMale() {
        return bodycountMale;
    }

    public void setBodycountMale(String bodycountMale) {
        this.bodycountMale = bodycountMale;
    }

    public String getBodycountFemale() {
        return bodycountFemale;
    }

    public void setBodycountFemale(String bodycountFemale) {
        this.bodycountFemale = bodycountFemale;
    }

    public String getBodycountDiverse() {
        return bodycountDiverse;
    }

    public void setBodycountDiverse(String bodycountDiverse) {
        this.bodycountDiverse = bodycountDiverse;
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
