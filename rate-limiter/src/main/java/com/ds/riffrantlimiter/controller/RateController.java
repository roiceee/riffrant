package com.ds.riffrantlimiter.controller;

import com.ds.riffrantlimiter.dto.RequestDTO;
import com.ds.riffrantlimiter.service.PostLimiterService;
import com.ds.riffrantlimiter.service.VoteLimiterService;
import com.ds.riffrantlimiter.util.Message;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000", "https://riffrant.vercel.app"})
public class RateController {

    private final PostLimiterService postLimiterService;
    private final VoteLimiterService voteLimiterService;

    @GetMapping("test")
    public ResponseEntity<String> rate() {
        return ResponseEntity.ok("Hello World!");
    }

    @PostMapping("post")
    public ResponseEntity<Message> post(
            @RequestBody RequestDTO requestDTO
    ) {
        postLimiterService.addExistingKeyIfAbsentInCache(requestDTO.getCreatorId());
        postLimiterService.consumeOne(requestDTO.getCreatorId());
        return ResponseEntity.ok(new Message(200, "Success"));
    }

    @PostMapping("vote")
    public ResponseEntity<Message> vote(
            @RequestBody RequestDTO requestDTO
    ) {
        voteLimiterService.addExistingKeyIfAbsentInCache(requestDTO.getCreatorId());
        voteLimiterService.consumeOne(requestDTO.getCreatorId());
        return ResponseEntity.ok(new Message(200, "Success"));
    }
}
