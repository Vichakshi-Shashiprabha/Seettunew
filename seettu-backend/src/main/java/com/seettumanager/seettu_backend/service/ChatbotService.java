package com.seettumanager.seettu_backend.service;

import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;

@Service
public class ChatbotService {

    // Simple FAQ map to hold question keywords and answers
    private final Map<String, String> faqData = new HashMap<>();

    public ChatbotService() {
        // Pre-populating basic FAQ answers
        faqData.put("rules", "Seettu rules: All members must pay their monthly installment on or before the due date.");
        faqData.put("join", "To join a Seettu, go to the available groups tab and request to join an active group.");
        faqData.put("seettu", "Seettu (ROSCA) is a traditional rotating savings scheme modernized on our platform.");
        faqData.put("contact", "For support, please contact the admin via the help desk or email admin@seettu.lk.");
    }


     //Process user message and return an appropriate response
     //@param userMessage Message typed by user
     //@param userId Logged in user ID (can be null for general guests)
     //@return Bot reply message

    public String getBotResponse(String userMessage, Long userId) {
        if (userMessage == null || userMessage.trim().isEmpty()) {
            return "Please ask a valid question!";
        }

        String messageLower = userMessage.toLowerCase();

        // Check if user is asking about due dates or payment deadlines
        if (messageLower.contains("due") || messageLower.contains("payment") || messageLower.contains("date")) {
            if (userId != null) {
                // In production, fetch actual due date from Installment Repository using userId
                return "Your next installment payment is due on the 25th of this month.";
            } else {
                return "Please log in to view your specific payment due date.";
            }
        }

        // Match with predefined FAQ keywords
        for (Map.Entry<String, String> entry : faqData.entrySet()) {
            if (messageLower.contains(entry.getKey())) {
                return entry.getValue();
            }
        }

        // Default response if no keyword matched
        return "I'm sorry, I didn't quite understand that. You can ask me about 'rules', 'due dates', or 'how to join'.";
    }
}
