package com.ludo.model;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class GameRoom {
    private String roomId;
    private  Map<String,List<Player>> map ;
    private  List<Player> list;
    private String status = "WAITING"; // WAITING, PLAYING, ENDED

    public GameRoom(String roomId) {
        this.roomId = roomId;
    }
    public GameRoom() {
    	list = new ArrayList<>();
        map=new HashMap<>();
    }
    public  List<Player> createRoom(String roomId,Player player) {
    	
    	List<Player> list = addPlayer(roomId, player);
    	if(list.size() >= 2) {
    		
    	}
    	else {
    				
    	}
    
    	return list;
    }

    public String getRoomId() {
        return roomId;
    }

    public List<Player> getPlayers(String roomId) {	
        return map.get(roomId);
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public List<Player> addPlayer(String roomId,Player player) {
         if (map.size() >= 4) {
        	  
        }
        else {
        
        	list.add(player);
        	map.put(roomId, list);
        }
        return map.get(roomId);
    }

	@Override
	public String toString() {
		return "GameRoom [roomId=" + roomId + ", players=" + map + ", status=" + status + "]";
	}
    
    
} 
