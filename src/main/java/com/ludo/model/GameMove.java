package com.ludo.model;

public class GameMove {
	
	String player;
	int position;
	
	public String getPlayer() {
		return player;
	}
	public void setPlayer(String player) {
		this.player = player;
	}
	public int getPosition() {
		return position;
	}
	public void setPosition(int position) {
		this.position = position;
	}
	
	@Override
	public String toString() {
		return "GameMove [player=" + player + ", position=" + position + "]";
	}
	
	
}
