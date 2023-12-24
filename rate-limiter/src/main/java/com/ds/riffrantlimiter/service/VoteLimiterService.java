package com.ds.riffrantlimiter.service;

import com.ds.riffrantlimiter.util.ResourceControllerLimiter;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

@Service
public class VoteLimiterService {

    private final ResourceControllerLimiter resourceControllerLimiter;

    public VoteLimiterService() {
        this.resourceControllerLimiter = new ResourceControllerLimiter(10, 2);
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
