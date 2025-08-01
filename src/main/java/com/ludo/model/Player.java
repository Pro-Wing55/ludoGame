package com.ludo.model;

public class Player {
    private String id;
    private String name;
    private String color;

    public Player(String id, String name, String color) {
        this.id = id;
        this.name = name;
        this.color = color;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getColor() {
        return color;
    }

    
	public void setId(String id) {
		this.id = id;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setColor(String color) {
		this.color = color;
	}

	@Override
	public String toString() {
		return "Player [id=" + id + ", name=" + name + ", color=" + color + "]";
	}
    
    
}
