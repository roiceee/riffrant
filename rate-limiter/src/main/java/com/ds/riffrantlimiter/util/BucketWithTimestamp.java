package com.ds.riffrantlimiter.util;

import io.github.bucket4j.Bucket;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class BucketWithTimestamp {
    private Bucket bucket;
    private long timestamp;

}
