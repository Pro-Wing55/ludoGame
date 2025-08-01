let stompClient;
let roomId;
let playerName;

 let playerColor=["blue","red","green","yellow"]
 let pCou=0;

function joinRoom() {
          roomId = document.getElementById("roomId").value.trim();
          playerName = document.getElementById("playerName").value.trim();
          if (!roomId || !playerName) {
            alert("Enter Room ID and Name");
            return;
          } 

          document.getElementById("room-screen").style.display = "none";
          document.getElementById("game-screen").style.display = "block";
          document.getElementById("displayRoomId").textContent = roomId;
          document.getElementById("displayPlayer").textContent = playerName;

              const socket = new SockJS('/ludo');
              stompClient = Stomp.over(socket);

              stompClient.connect({}, function (frame) {
              console.log("Connected: " + frame);

                stompClient.subscribe(`/topic/room/${roomId}`, function (message) {
                  const gameState = JSON.parse(message.body);
				  console.log("GameState is : ", gameState)
                  startGameBoard(gameState);
                });
				
				
				stompClient.subscribe(`/topic/return-to`, function (message) {
				               
				                 const j = JSON.parse(message.body);
				                 
				                  document.getElementById("diceValue").textContent = j;
				 });
				 
				 
				 stompClient.subscribe("/topic/return-to-moveValue",(response)=>{
				              let j=JSON.parse(response.body);
				 			              	subMoveDisc(j.position , j.player)
				 });
				 
				 
				 stompClient.subscribe("/topic/return-to-arrageBody", function (message){
				 				              let j=JSON.parse(message.body);
							
				 				 			              	arrengeDiv(j);
				 				 });

                // Notify server that player has joined
                stompClient.send(`/app/room/${roomId}/join`, {}, JSON.stringify({
                  name: playerName,
                  roomId: roomId,
                  id  : "P1"
				 // color: playerColor[pCou++]
                }));
              });


            }

 $(document).ready(()=>{
  
          


    $(`#btn_sub`).click(()=>{
        joinRoom();

    })


 })

  let disCount=0;

        let text=(count,value)=>{
                  moveDisc(count,value);
        }

        let subMoveDisc=(count,value)=>{
              let mhtml= document.getElementById(value);
			  mhtml.remove();
			  let divM=  document.getElementById(`cell-${array[count]}`);
			                        let divIn = document.createElement("div");
			                             divIn.setAttribute("style","cursor: pointer")
			                             divIn.setAttribute("id",`${value}`)
			                             divIn.setAttribute("onClick",`text(${count},'${value}')`);
			                             divIn.textContent=" ★ "
			                       divM.prepend(divIn);
			  
        }

        let array=[136,126,116,106,96,85,84,83,82,81,80,70,60,
					61,62,63,64,65,56,46,36,26,16,'06','07','08',
					18,28,38,48,58,69,610,611,612,613,614,714,814,
					813,812,811,810,89,98,108,118,128,138,148,147,146]
		
       let  moveDisc=(count,value)=>{
            // stompClient.send(`/app/room/${roomId}/move`, {}, JSON.stringify(move));
			console.log(count+" : thie value is : "+value);
            let i=6;
            let j=1;
          //  let count=0;
            
           let t=   setInterval(()=>{
            
              let mhtml= document.getElementById(value);
              mhtml.remove();
             
             count++;
              // document.getElementById(`cell-${array[count]}`).innerHTML=
              //             `
              //             <div style="cursor: pointer" id="r_cell1" onClick="text(${count});"> ★ </div>
              //             `;
            let divM=  document.getElementById(`cell-${array[count]}`);
                       let divIn = document.createElement("div");
                            divIn.setAttribute("style","cursor: pointer")
                            divIn.setAttribute("id",`${value}`)
                            divIn.setAttribute("onClick",`text(${count},'${value}')`);
                            divIn.textContent=" ★ "
                      divM.prepend(divIn);
					  
					        let jsonOb={
					                      position:count,
					                      player:value
					                    }
					  stompClient.send("/app/move",{},JSON.stringify(jsonOb));  

                  // divM.appendChild(divIn)    
              if(i==5){

              }

            },500)

              setTimeout(()=>{
                clearTimeout(t);
                console.log("time is Closed")
              },500*disCount) 

           
                  
            
           
       }


      function rollDice() {
            const diceValue = Math.floor(Math.random() * 6) + 1;
            document.getElementById("diceValue").textContent = diceValue;
            disCount=diceValue;

            const move = {
              playerId: playerName, // using name as ID for now
              roomId: roomId,
              diceValue: diceValue,
              tokenId: "T1" // Example token ID
            };
        
               const socket = new SockJS('/ludo');
              stompClient = Stomp.over(socket);

              stompClient.connect({}, function (frame) {
              console.log("Connected: " + frame);

              // Notify server that player has joined
              stompClient.send(`/app/rollDisc/${diceValue}`, {}, JSON.stringify({
                name: playerName,
                roomId: roomId
              }));
              
               

              });

          }
       



function startGameBoard(gameState) {
   const board = document.getElementById("actualBoardId");
      if($(`#actualBoardId`).children().length > 0){

         
      }
      else{
                loopFuntion();
					
				if(gameState.id=="p2"){
						 p2Funtion(gameState.id);				 
				}
				
				else if(gameState.id=="p3"){
		               	 	p3Funtion(gameState.id);
														 
				}
				else if(gameState.id=="p4"){
		               	 	p4Funtion(gameState.id);
														 
				}
                       
				const integerList1 = [101, 104, 131, 134];
				for(let i =0 ; i<= 3;i++){
					  document.getElementById(`cell-${integerList1[i]}`).innerHTML=  `
						<div style="cursor: pointer" id="g_disc${i}" onClick="text(${0},'g_disc${i}');"> ★ </div>
					`
				}
				document.getElementById(`displayPlayer_${gameState.id}`).textContent=gameState.name
				 
          }
}

let p2Funtion=(id)=>{
	document.getElementById("actualBoardId").style.transform="rotate(180deg)"
									const integerList = [110, 113, 410, 413];
									for(let i =0 ; i<= 3;i++){
					                document.getElementById(`cell-${integerList[i]}`).innerHTML=  `
					                         <div style="cursor: pointer" id="y_disc${i}" onClick="text(${25},'y_disc${i}');"> ★ </div>
					                         `
									}
		let outP2 =	document.getElementById("outP2");
		let outP1 =	document.getElementById("outP1");
		// outP2.setAttribute("id","outP1");
		// outP1.setAttribute("id","outP2");
		document.getElementById("outdiv").style.transform="rotate(180deg)"
		
								
									 stompClient.send(`/app/arrangeBody/25`, {}, JSON.stringify({
									               numbers:integerList,
												    t:id
									              }));	
}

let p3Funtion=(id)=>{
	p2Funtion("p2");
	document.getElementById("actualBoardId").style.transform="rotate(90deg)"
						const integerList = [1010, 1013, 1310, 1313];
						for(let i =0 ; i<= 3;i++){
		                document.getElementById(`cell-${integerList[i]}`).innerHTML=  `
		                         <div style="cursor: pointer" id="b_disc${i}" onClick="text(${38},'b_disc${i}');"> ★ </div>
		                         `
						}
						 stompClient.send(`/app/arrangeBody/38`, {}, JSON.stringify({
						               numbers:integerList,
									   t:id
						              }));	
     }
	 
	 let p4Funtion=(id)=>{
		p3Funtion("p3");
			document.getElementById("actualBoardId").style.transform="rotate(270deg)"
								const integerList = [11, 14, 41, 44];
								for(let i =0 ; i<= 3;i++){
				                document.getElementById(`cell-${integerList[i]}`).innerHTML=  `
				                         <div style="cursor: pointer" id="r_disc${i}" onClick="text(${12},'r_disc${i}');"> ★ </div>
				                         `
								}
								 stompClient.send(`/app/arrangeBody/13`, {}, JSON.stringify({
								               numbers:integerList,
											   t:id
								              }));	
	 }

let loopFuntion=()=>{
const board = document.getElementById("actualBoardId");
for (let i = 0; i < 15; i++) {
	                       for(let j=0; j < 15; j++){
	                         const cell = document.createElement("div");
	                         cell.id = "cell-"+ i+j;
	                         cell.textContent = " " ;
	                     
	                         
	                         if((i < 6 && j < 6)){
	                           const board = document.getElementById("actualBoardId");
	                           // board.style.style.
	                           cell.setAttribute("class","red");
	                                 cell.style.backgroundColor="red"
	                                


	                         }
	                       else if(i >= 9  &&  j < 6){
	                               cell.textContent = " " ;
	                                 cell.setAttribute("class","green");
	                                 cell.style.backgroundColor="green"
	                         }
	                         else if  (i < 6  &&  j >= 9){
	                               cell.textContent = " " ;
	                                 cell.setAttribute("class","yellow");
	                                 cell.style.backgroundColor="Yellow"
	                         }
	                       else if(i >= 9  &&  j >= 9){
	                               cell.textContent = " " ;
	                                 cell.setAttribute("class","blue");
	                                 cell.style.backgroundColor="blue"
	                         }
	                       else if((i>=6 && i< 9) && (j>=6 && j< 9 )){
	                             cell.textContent = " " ;
	                                 cell.setAttribute("class","win");
	                                 cell.style.backgroundColor="black"
	                       } 
	                       else{
	                                 if( (j==1 && i==6) || (i==7 && (j >=1 && j<6) )){
	                                       cell.setAttribute("class","red1");
	                                       cell.style.backgroundColor="red"
	                                         cell.textContent = "  " ;
	                                 }
	                                 if( (j==8 && i==1) ||  ( j==7 && (i >=1 && i<6) )){
	                                       cell.setAttribute("class","red1");
	                                       cell.style.backgroundColor="yellow"
	                                         cell.textContent = "  " ;
	                                 }

	                                 if( (j==13 && i==8) ||  ( i==7 && (j >=9 && j<14) )){
	                                       cell.setAttribute("class","red1");
	                                       cell.style.backgroundColor="blue"
	                                         cell.textContent = "  " ;
	                                 }
	                                 if( (j==6 && i==13) ||  ( j==7 && (i >=9 && i<14) )){
	                                       cell.setAttribute("class","red1");
	                                       cell.style.backgroundColor="green"
	                                         cell.textContent = "  " ;
	                                 }
	                         }
	                           board.appendChild(cell);
	                       }

	                     
	                 }
}

	let arrengeDiv=(divId)=>{
		for(let i=0 ; i<= 3; i++){
			document.getElementById(`cell-${divId.numbers[i]}`).innerHTML=  `
	  <div style="cursor: pointer" id="${divId.t}_disc${i}" onClick="text(${divId.num},'${divId.t}_disc${i}');"> ★ </div>
					`
			}

	}

	
	
	
	
	


