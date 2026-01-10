package com.example.serverapp.ai_priority.enums;

public enum AgeingBucket {

    ZERO_THIRTY("0_30"),
    THIRTY_ONE_SIXTY("31_60"),
    SIXTY_ONE_NINETY("61_90"),
    NINETY_PLUS("90_PLUS");

    private final String dbValue;

    AgeingBucket(String dbValue) {
        this.dbValue = dbValue;
    }

    public String getDbValue() {
        return dbValue;
    }

    public static AgeingBucket fromDb(String value) {
        for (AgeingBucket b : values()) {
            if (b.dbValue.equals(value)) {
                return b;
            }
        }
        throw new IllegalArgumentException(
            "Unknown AgeingBucket value from DB: " + value
        );
    }
}
