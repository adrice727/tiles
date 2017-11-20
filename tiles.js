const runTiles = () => {

  const $body = document.body;
  const $tiles = (() => {
    const el = document.createElement('div');
    el.id = 'tiles';
    return el;
  })();

  const TILES_PER_ROW = 50;
  const TOTAL_ROWS = 30;
  const TOTAL_TILES = TILES_PER_ROW * TOTAL_ROWS;
  let tileSize;
  const tileRows = [];

  const colors = [
    '#e4ff00',
    '#fae700',
    '#62c3be',
    '#31c6ff',
    '#6dc563',
    '#88ffb8',
    '#259686'
  ];

  const setTileSize = () => {
  tileSize = `${window.innerWidth / TILES_PER_ROW}px`;
  }


  const randomColor = (row, column) => {
    // const hasColor = (1.0 - (.10 * (((row + 1) * (column + 1) / TILES_PER_ROW * TILES_PER_ROW)))) > .25;
    const hasColor =
      (Math.random() * (1.0 - (.50 * (((row + 1) * (column + 1) / TOTAL_TILES))))) > .5;

    // Math.random() * (2 * (.10 * (((row + 1) * (column + 1) / TILES_PER_ROW * TILES_PER_ROW) )
    return hasColor ? colors[(Math.random() * colors.length) | 0] : 'white';
  }
  const randomOpacity = (row, column) => {
    const adjustment = ((Math.random() * 30) * ((row + 1) * (column + 1)) / TOTAL_TILES);
    return .75 - adjustment;
  }
  const buildTile = (row, column) => {
    const el = document.createElement('div');
    el.classList.add('tile');
    el.style.backgroundColor = randomColor(row, column);
    el.style.opacity = randomOpacity(row, column);
    el.style.height = tileSize;
    el.style.width = tileSize;
    return el;
  }


  const buildTiles = () => {
    setTileSize();
    for (let i = 0; i < TOTAL_ROWS; i++) {
      const row = [];
      for (let j = 0; j < TILES_PER_ROW; j++) {
        const tile = buildTile(i, j);
        row.push(tile);
        $tiles.appendChild(tile);
      }
      tileRows.push(row);
    }
    $body.append($tiles);
  }

  const updateColors = () => {
    tileRows.forEach((row, rowIndex) => {
      row.forEach((tile, columnIndex) => {
        tile.style.backgroundColor = randomColor(rowIndex, columnIndex);
        tile.style.opacity = randomOpacity(rowIndex, columnIndex);
      })
    })
  }

  buildTiles();
  setInterval(updateColors, 4500);
}

document.addEventListener('DOMContentLoaded', runTiles);