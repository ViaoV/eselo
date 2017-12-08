package main

import (
	"github.com/labstack/echo"
)

type API struct{}

// Bind attaches api routes
func (api *API) Bind(group *echo.Group) {
	group.GET("/v1/conf", api.ConfHandler)
	group.GET("/v1/players/:id", api.getPlayer)
	group.GET("/v1/players", api.listPlayers)
	group.POST("/v1/players", api.createPlayer)
	group.POST("/v1/games", api.createGame)
	group.GET("/v1/games", api.listGames)
}

// ConfHandler handle the app config, for example
func (api *API) ConfHandler(c echo.Context) error {
	app := c.Get("app").(*App)
	return c.JSON(200, app.Conf.Root)
}

func (api *API) listPlayers(c echo.Context) error {
	app := c.Get("app").(*App)
	var players []Player
	app.DB.Find(&players)
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
	app.DB.Create(&g)
	return c.JSON(200, &g)
}

func (api *API) listGames(c echo.Context) error {
	app := c.Get("app").(*App)
	var games []Game
	app.DB.Find(&games)
	return c.JSON(200, games)
}
