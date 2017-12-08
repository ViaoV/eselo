package main

import (
	"github.com/jinzhu/gorm"
)

type (
	Player struct {
		gorm.Model
		Name string `json:"name" validate: "required"`
		Elo  int    `json:"elo"`
	}

	Game struct {
		gorm.Model
		WhitePlayer      Player `gorm:"ForeignKey:WhitePlayerID"`
		BlackPlayer      Player `gorm:"ForeignKey:BlackPlayerID"`
		WhitePlayerID    int    `json:"whitePlayerId"`
		BlackPlayerID    int    `json:"blackPlayerId"`
		WhiteStartingELO int    `json:"whiteStartingElo"`
		BlackStartingELO int    `json:"blackStartingElo"`
		BlackEndingELO   int    `json:"blackEndingElo"`
		WhiteEndingELO   int    `json:"whiteEndingElo"`
		Outcome          string `json:"outcome"`
	}
)
