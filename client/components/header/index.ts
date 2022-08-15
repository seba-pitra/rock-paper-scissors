import { state } from "../../state";

export function initHistoryComp() {
    class Header extends HTMLElement {
        constructor() {
            super();
            this.render();
        }
        render() {
            const shadow = this.attachShadow({ mode: "open" });
            const cs = state.getState()
            const playerOneName = cs.rtdbData.playerOne.name;
            const playerTwoName = cs.rtdbData.playerTwo.name;
            const historyOne = cs.rtdbData.playerOne.history || 0;
            const historyTwo = cs.rtdbData.playerTwo.history || 0;
            const roomId = cs.roomId;

            const header = document.createElement("header");
            header.className = "header"
            header.innerHTML = `
            <div class="header-container">
            <div class="history-container">
               <span class="player-history">${playerOneName}: ${historyOne}</span>
               <span class="player2-history">${playerTwoName}: ${historyTwo}</span>
            </div>
            <div class="room-id-container">
               <span class="room-id">Sala:</span>
               <span class="room-id">${roomId}</span>
            </div>
            </div>
            `            
            
            const style =  document.createElement("style");
            style.innerText = `
            .header-container {
                heigth:50px;
                display:flex;
                justify-content: space-around;
                align-item:center;
                padding-bottom: 30px;
            }
            .history-container {
                display: flex;
                flex-direction: column;
                font-size:24px;
            }
            .player2-history {
                color: #FF5733
            }
            .room-id-container {
                display: flex;
                flex-direction:column;
                font-size:24px;
            }
            `;

            shadow.appendChild(header);
            shadow.appendChild(style);
        }
    }
    customElements.define("custom-header", Header)
}