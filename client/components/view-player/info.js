import React from 'react'
import { KeyValRow, KeyVal } from '../keyval';

export default (props) => {
  const { player, games } = props
  const whiteGames = games.filter(g => g.whitePlayerId === player.ID);
  const blackGames = games.filter(g => g.blackPlayerId === player.ID);
  const whiteWins = whiteGames.filter(g => (g.outcome === 'white'))
  const blackWins = blackGames.filter(g => (g.outcome === 'black'))
  const totalWins = blackWins.length + whiteWins.length;
  const stales = games.filter(g => g.outcome === 'stale');

  return (
    <div>
      <KeyValRow>
        <KeyVal label="Name">{ player.name }</KeyVal>
        <KeyVal label="Games won">{ totalWins } / { games.length }</KeyVal>
        <KeyVal label="White wins">{ whiteWins.length } / { whiteGames.length }</KeyVal>
        <KeyVal label="Black wins">{ blackWins.length } / { blackGames.length }</KeyVal>
        <KeyVal label="Stalemates">{ stales.length }</KeyVal>
      </KeyValRow>
    </div>
  )
}
