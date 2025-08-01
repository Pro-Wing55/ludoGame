package com.ludo.webConfig;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

public class SharedPageHandler extends TextWebSocketHandler {

	 private final List<WebSocketSession> sessions = new ArrayList<>();
	    private final Map<String, String> sessionRoles = new HashMap<>();

	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		 String role = sessions.isEmpty() ? "browser1" : "browser2";
		 
		 System.out.println("New session opened: " + session.getId() +"\n : roll is : "+role);
	        sessionRoles.put(session.getId(), role);
	        sessions.add(session);

	        session.sendMessage(new TextMessage("{\"type\":\"role\", \"role\":\"" + role + "\"}"));

		
	}

	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
	
		  String payload = message.getPayload();
		  System.out.println("Received message: " + payload);

	        if (payload.contains("done_browser1")) {
	            // Notify browser2
	            for (WebSocketSession sess : sessions) {
	                if (!sess.getId().equals(session.getId()) &&
	                    sessionRoles.get(sess.getId()).equals("browser2")) {
	                    sess.sendMessage(new TextMessage("{\"type\":\"enable_browser2\"}"));
	                }
	            }
	        }
		
	}

	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		   sessions.remove(session);
	        sessionRoles.remove(session.getId());
		
	}

}
