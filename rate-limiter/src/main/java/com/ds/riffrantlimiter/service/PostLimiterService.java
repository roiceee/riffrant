package com.ds.riffrantlimiter.service;

import com.ds.riffrantlimiter.util.ResourceControllerLimiter;
import org.springframework.stereotype.Service;

@Service
public class PostLimiterService {

    private final ResourceControllerLimiter resourceControllerLimiter;

    public PostLimiterService() {
        this.resourceControllerLimiter = new ResourceControllerLimiter(20, 2);
    }

    public void addExistingKeyIfAbsentInCache(String apiKey) {
        resourceControllerLimiter.addExistingKeyIfAbsentInCache(apiKey);
    }

    public void consumeOne(String apiKey) {
        resourceControllerLimiter.consumeOne(apiKey);
    }

    public void clearUnusedKeysFromCache() {
        resourceControllerLimiter.clearUnusedKeysFromCache();
    }


}
