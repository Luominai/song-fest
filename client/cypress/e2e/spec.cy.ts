import { io, Socket } from 'socket.io-client';
import { ClientToServerEvents, ServerToClientEvents } from '../../../common';

const URL = 'http://localhost:3000';
const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(URL);

describe('template spec', () => {
  it("resets server", () => {
    socket.emit("reset")
    cy.wait(1000)
  })
  it('creates a songfest', () => {
    cy.visit('http://localhost:5173')
    createSongfest("awe-inspiring", "waluigi", "1")
  })
  it(`submits multiple songs`, () => {
    cy.visit('http://localhost:5173')
    submitSong("waluigi", "https://www.youtube.com/watch?v=AYtZ7GFV9ys", "0", "15")
    submitSong("wario", "https://www.youtube.com/watch?v=AYtZ7GFV9ys", "15", "30")
  })
  it(`plays the game`, () => {
    cy.visit('http://localhost:5173')
    startGame()

    for (let i = 0; i < 2; i++) {
        rateSong("High", "Low")
        nextPhase()
        guessSong()
        nextPhase()
    }
  })
})

function guessSong() {
    cy.get("body").then((body) => {
        if (body.find(".guessSongSubmitter").text() == "Confirm") {
            cy.get(".name").type("wario")
            cy.get(".option1").click()
            cy.wait(1000)
            cy.get(".guessSongSubmitter").click()
        }
        else {
            cy.wait(1000)
            socket.emit("guessSongSubmitter", {
                playerName: "waluigi",
                time: 50
            })
        }
    })

}

function nextPhase() {
    cy.get("button.nextPhase").click()
}

function rateSong(likedScore: string, themeScore: string) {
    cy.get("body").then((body) => {
        if (body.find(".rateSong").text() == "Confirm") {
            cy.get(`.liked${likedScore}`).click()
            cy.get(`.theme${themeScore}`).click()
            cy.wait(1000)
            cy.get(".rateSong").click()
        }
        else {
            cy.wait(1000)
            socket.emit("rateSong", {
                liked: {low: 1, mid: 0, high: 0, total: 1},
                theme: {low: 1, mid: 0, high: 0, total: 1}
            })
        }
        cy.wait(3000)
    })
}

function startGame() {
    cy.get('button.startGame').click()
    cy.contains("waluigi").click()
    socket.emit("updateSocket", "wario")
    cy.wait(1000)
    cy.get("button.nextPhase").click()
}

function createSongfest(theme: string, host: string, songsPerPerson: string) {
    cy.get(`button.openCreationModal`).click()
    cy.get("input.theme").type(theme)
    cy.get("input.host").type(host)
    cy.get("input.songsPerPerson").type(songsPerPerson)
    cy.get("button.startSongfest").click()
}

function submitSong(name: string, url: string, start: string, end: string) {
    cy.get("button.openSubmissionModal").click()
    cy.get(".name").type(name)
    // if cy.find
    cy.get("body").then((body) => {
        if (body.find(".dynamicOption").length > 0) {
            cy.get(".dynamicOption").click()
        }
        else {
            cy.get(".option1").click()
        }
    })
    cy.get("input.url1").type(url)
    cy.get("input.startTime1").clear()
    cy.get("input.startTime1").type(start)
    cy.get("input.endTime1").clear()
    cy.get("input.endTime1").type(end)
    cy.get("button.submitSongs").click()
    cy.wait(500)
    cy.get("button.closeSubmissionModal").click()
}