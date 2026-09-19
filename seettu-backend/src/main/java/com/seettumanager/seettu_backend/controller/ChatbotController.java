package com.seettumanager.seettu_backend.controller;

import com.seettumanager.seettu_backend.service.ChatbotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/chatbot")
@CrossOrigin(origins = "*")
public class ChatbotController {

    @Autowired
    private ChatbotService chatbotService;

    // Handle incoming chatbot queries from frontend
    @PostMapping("/ask")
    public ResponseEntity<Map<String, String>> askChatbot(@RequestBody Map<String, Object> payload) {
        String userMessage = (String) payload.get("message");

        // Extract userId if passed in request body
        Long userId = null;
        if (payload.containsKey("userId") && payload.get("userId") != null) {
            userId = Long.valueOf(payload.get("userId").toString());
        }

        // Fetch response from service layer
        String reply = chatbotService.getBotResponse(userMessage, userId);

        return ResponseEntity.ok(Map.of("reply", reply));
    }
}                                                                                                          