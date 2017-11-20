const runTiles = () => {

  const $body = document.body;
  const $tiles = (() => {
    const el = document.createElement('div');
    el.id = 'tiles';
    el.style.width = '100vw';
    return el;
  })();

  const TILES_PER_ROW = 50;
  const TOTAL_ROWS = 30;
  const TOTAL_TILES = TILES_PER_ROW * TOTAL_ROWS;
  let tileSize;
  const tileRows = [];

  const colors = [
    '#edc23c',
    '#36d9cc',
    '#cbe446',
    '#04a085',
    '#f2ede3',
    '#fdd419',
  ]

  const setTileSize = () => {
    tileSize = `${window.innerWidth / TILES_PER_ROW}px`;
  };

  const randomColor = (row, column) => {
    const hasColor =
      (Math.random() * (1.0 - (.50 * (((row + 1) * (column + 1) / TOTAL_TILES))))) > .5;
    return hasColor ? colors[(Math.random() * colors.length) | 0] : 'white';
  };

  const randomOpacity = (row, column) => {
    const adjustment = ((Math.random() * 30) * ((row + 1) * (column + 1)) / TOTAL_TILES);
    return .45 - adjustment;
  }
  const buildTile = (row, column) => {
    const el = document.createElement('div');
    el.classList.add('tile');
    el.style.backgroundColor = randomColor(row, column);
    el.style.opacity = randomOpacity(row, column);
    el.style.height = tileSize;
    el.style.width = tileSize;
    el.style.float = 'left';
    el.style.transition = 'all 2.0s cubic-bezier(0.47, 0, 0.75, 0.72)';
    return el;
  };

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
  };

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