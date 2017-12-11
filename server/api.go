package main

import (
	"github.com/labstack/echo"
	"math"
	"strconv"
)

type API struct{}

// Bind attaches api routes
func (api *API) Bind(group *echo.Group) {
	group.GET("/v1/conf", api.ConfHandler)
	group.GET("/v1/players/:playerId/games", api.playerGames)
	group.GET("/v1/players/:id", api.getPlayer)
	group.GET("/v1/players", api.listPlayers)
	group.POST("/v1/players", api.createPlayer)
	group.GET("/v1/games/:id", api.getGame)
	group.POST("/v1/games", api.createGame)
	group.GET("/v1/games", api.listGames)
	group.GET("/v1/matchups", api.matchups)
}

// ConfHandler handle the app config, for example
func (api *API) ConfHandler(c echo.Context) error {
	app := c.Get("app").(*App)
	return c.JSON(200, app.Conf.Root)
}

func (api *API) listPlayers(c echo.Context) error {
	app := c.Get("app").(*App)
	var players []Player
	app.DB.Order("elo desc").Find(&players)
	return c.JSON(200, players)
}

func (api *API) createPlayer(c echo.Context) error {
	app := c.Get("app").(*App)
	p := new(Player)
	if err := c.Bind(p); err != nil {
		println(err.Error())
		return err
	}
	p.Elo = 1500
	app.DB.Create(&p)
	return c.JSON(200, &p)
}

func (api *API) getPlayer(c echo.Context) error {
	app := c.Get("app").(*App)
	var player Player
	app.DB.First(&player, c.Param("id"))
	return c.JSON(200, player)
}

func (api *API) createGame(c echo.Context) error {
	app := c.Get("app").(*App)
	g := new(Game)
	if err := c.Bind(g); err != nil {
		println(err.Error())
		return err
	}

	var (
		whitePlayer Player
		blackPlayer Player
		k           float64 = 32
		r1          float64
		r2          float64
		e1          float64
		e2          float64
		s1          float64
		s2          float64
	)

	// load players
	app.DB.First(&whitePlayer, g.WhitePlayerID)
	app.DB.First(&blackPlayer, g.BlackPlayerID)

	// set initial ELOs for tracking
	g.WhiteStartingELO = whitePlayer.Elo
	g.BlackStartingELO = blackPlayer.Elo

	//calculate elo changes

	//transformed ratiings
	r1 = math.Pow(10, (float64(whitePlayer.Elo) / 400))
	r2 = math.Pow(10, (float64(blackPlayer.Elo) / 400))

	// expected change
	e1 = r1 / (r1 + r2)
	e2 = r2 / (r1 + r2)

	// variance
	if g.Outcome == "white" {
		s1 = 1
		s2 = 0
	}
	if g.Outcome == "black" {
		s1 = 0
		s2 = 1
	}
	if g.Outcome == "stale" {
		s1 = 0.5
		s2 = 0.5
	}

	// rating change
	whitePlayer.Elo = int(float64(whitePlayer.Elo) + k*(s1-e1))
	blackPlayer.Elo = int(float64(blackPlayer.Elo) + k*(s2-e2))
	g.WhiteEndingELO = whitePlayer.Elo
	g.BlackEndingELO = blackPlayer.Elo
	app.DB.Create(&g)
	app.DB.Save(whitePlayer)
	app.DB.Save(blackPlayer)
	return c.JSON(200, &g)
}

func (api *API) listGames(c echo.Context) error {
	app := c.Get("app").(*App)
	var games []Game
	app.DB.Preload("WhitePlayer").Preload("BlackPlayer").Find(&games)
	return c.JSON(200, games)
}

func (api *API) playerGames(c echo.Context) error {
	playerId, err := strconv.Atoi(c.Param("playerId"))
	if err != nil {
		return err
	}

	app := c.Get("app").(*App)
	var games []Game
	app.DB.Where("white_player_id = ? OR black_player_id = ?", playerId, playerId).
		Preload("WhitePlayer").
		Preload("BlackPlayer").
		Find(&games)
	return c.JSON(200, games)
}

func (api *API) getGame(c echo.Context) error {
	app := c.Get("app").(*App)
	var game Game
	app.DB.Preload("WhitePlayer").Preload("BlackPlayer").First(&game, c.Param("id"))
	return c.JSON(200, game)
}

func (api *API) matchups(c echo.Context) error {
	app := c.Get("app").(*App)
	player1 := c.QueryParam("player1")
	player2 := c.QueryParam("player2")

	var games []Game
	app.DB.
		Where("(white_player_id = ? OR white_player_id = ?)", player1, player2).
		Where("(black_player_id = ? OR black_player_id = ?)", player1, player2).
		Preload("WhitePlayer").
		Preload("BlackPlayer").
		Find(&games)
	return c.JSON(200, games)
}
