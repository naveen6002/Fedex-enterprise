package com.example.serverapp.ai_priority.converter;
import com.example.serverapp.ai_priority.enums.AgeingBucket;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class AgeingBucketConverter
        implements AttributeConverter<AgeingBucket, String> {

    @Override
    public String convertToDatabaseColumn(AgeingBucket attribute) {
        return attribute == null ? null : attribute.getDbValue();
    }

    @Override
    public AgeingBucket convertToEntityAttribute(String dbData) {
        return dbData == null ? null : AgeingBucket.fromDb(dbData);
    }
}
