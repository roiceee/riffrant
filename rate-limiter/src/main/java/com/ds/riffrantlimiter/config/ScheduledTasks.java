package com.ds.riffrantlimiter.config;

import com.ds.riffrantlimiter.service.PostLimiterService;
import com.ds.riffrantlimiter.service.VoteLimiterService;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

@Configuration
@EnableScheduling
@AllArgsConstructor
public class ScheduledTasks {

    private final PostLimiterService postLimiterService;
    private final VoteLimiterService voteLimiterService;

    //first delay and interval is 6 hours = 21600000 milliseconds
    @Async
    @Scheduled(initialDelay = 21600000, fixedDelay = 21600000)
    public void clearCache() {
        postLimiterService.clearUnusedKeysFromCache();
        voteLimiterService.clearUnusedKeysFromCache();
    }
}
