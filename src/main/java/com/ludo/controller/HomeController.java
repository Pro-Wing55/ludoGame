package com.ludo.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


import com.ludo.model.GameMove;
import com.ludo.model.GameRoom;

import com.ludo.model.Player;

@RestController
public class HomeController {
	GameRoom gr= new GameRoom();
	
	 String [] playerColor= {"green","yellow","blue","red"};
	 String [] playerId= {"p1","p2","p3","p4"};
	 Map<String, String> map= new HashMap<>();

	private int count=0;
	
	public HomeController() {
		map.put("p1", "g");
		map.put("p2", "y");
		map.put("p3", "b");
		map.put("p4", "r");
	}
	
	
	@MessageMapping("/room/handle")
	@SendTo("/topic/handle}")
	public String handlePlayerMove(@DestinationVariable String roomId, @RequestBody GameMove move) {
	
		System.out.println("chack for halePlayer move");
		
		return "gm";
	   
	}
	@MessageMapping("/room/{roomId}/join")
	@SendTo("/topic/room/{roomId}")
	public  Player joinroom(@DestinationVariable String roomId,@RequestBody Player player) {
		
		player.setColor(playerColor[count]);
		player.setId(playerId[count]);
		
		List<Player> room = gr.createRoom(roomId, player);
		count++;
		return player;                              
	}
	
	@MessageMapping("/move")  
	@SendTo("/topic/return-to-moveValue")
		public GameMove sentMassage(@RequestBody GameMove move) {
		
			try {
				Thread.sleep(10);
			} catch (Exception e) {
				e.printStackTrace();
			}
			return move;             
		}
	
	@MessageMapping("/rollDisc/{rollValue}")
	@SendTo("/topic/return-to")
		public String rollDiscValue(@DestinationVariable String rollValue ) {
		 
			try {
				Thread.sleep(100);
			} catch (Exception e) {
				e.printStackTrace();
			}
			return rollValue;     
		} 
		
	@MessageMapping("/arrangeBody/{divId}")
	@SendTo("/topic/return-to-arrageBody")
		public IntegerListRequest arrangeBody(@DestinationVariable String divId,
				        @Payload IntegerListRequest request) {
		
		System.out.println("this is body div "+divId);
		request.setNum(divId);
		request.setT(map.get(request.getT()));
			try {
				Thread.sleep(10);
			} catch (Exception e) {
				e.printStackTrace();
			}
			return request;
		}
	
}

class IntegerListRequest {
	
	 public List<Integer> numbers;

	 public String num;
	 public String t;
	    // Getter and Setter
	    public List<Integer> getNumbers() {
	        return numbers;
	    }

	    public void setNumbers(List<Integer> numbers) {
	        this.numbers = numbers;
	    }

		public String getNum() {
			return num;
		}

		public void setNum(String num) {
			this.num = num;
		}

		public String getT() {
			return t;
		}

		public void setT(String t) {
			this.t = t;
		}
	    
}
