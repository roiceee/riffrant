package com.ds.riffrantlimiter.util;


import com.ds.riffrantlimiter.exception.TooManyRequestsException;
import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import io.github.bucket4j.Refill;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.Duration;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

public class ResourceControllerLimiter {
    private final ConcurrentHashMap<String, BucketWithTimestamp> bucketCache;

    private final Logger logger = LoggerFactory.getLogger(ResourceControllerLimiter.class);

    private final int maxRequestPerBucket;

    private final int refreshIntervalInMinutes;

    public ResourceControllerLimiter(int maxRequestPerBucket, int refreshIntervalInMinutes) {

        this.maxRequestPerBucket = maxRequestPerBucket;
        this.refreshIntervalInMinutes = refreshIntervalInMinutes;

        this.bucketCache = new ConcurrentHashMap<>();
        logger.info(this.getClass().getSimpleName() + " instantiated.");
    }


    public void addExistingKeyIfAbsentInCache(String key) {
        BucketWithTimestamp bucketWithTimestamp = new BucketWithTimestamp(this.newBucket(),
                System.currentTimeMillis());

        var value = bucketCache.putIfAbsent(key, bucketWithTimestamp);
        if (value != null) {
            return;
        }
        logger.info("Added new key to cache: " + key);
    }

    public void consumeOne(String key) {
        BucketWithTimestamp bucket = bucketCache.get(key);
        if (bucket == null) {
            return;
        }
        if (bucket.getBucket().tryConsume(1)) {
            bucket.setTimestamp(System.currentTimeMillis());
            return;
        }
        throw new TooManyRequestsException();
    }

    public void clearUnusedKeysFromCache() {
        long HOURS_LAST_INVOKED_BEFORE_DELETE = 3;
        long removedItems = 0;
        Set<Map.Entry<String, BucketWithTimestamp>> entrySet = bucketCache.entrySet();
        Iterator<Map.Entry<String, BucketWithTimestamp>> iterator = entrySet.iterator();
        logger.info("Clean action starting...");
        while (iterator.hasNext()) {
            Map.Entry<String, BucketWithTimestamp> entry = iterator.next();
            long lastAccessed = entry.getValue().getTimestamp();
            long difference = System.currentTimeMillis() - lastAccessed;
            if (Conversions.hoursToMilliseconds(HOURS_LAST_INVOKED_BEFORE_DELETE) > difference) {
                continue;
            }
            removedItems++;
            iterator.remove();
        }
        logger.info("Removed from cache: " + removedItems + ".");
        logger.info("Cache size: " + bucketCache.size());
    }

    private Bucket newBucket() {
        Bandwidth bandwidth = Bandwidth.classic(maxRequestPerBucket, Refill.intervally(maxRequestPerBucket,
                Duration.ofMinutes(refreshIntervalInMinutes)));
        return Bucket.builder().addLimit(bandwidth).build();
    }

    public ConcurrentHashMap<String, BucketWithTimestamp> getBucketCache() {
        return this.bucketCache;
    }
}
