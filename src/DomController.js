class DomController {
  constructor({root, game}) {
    this.active = true
    this.game = game
    this.rootNode = document.querySelector(root)
    this.lastClickedIndices = [-1, -1]
  }

  init() {
    const size = this.game.getSize()
    this.createTable(size, size)
  }
  
  createTable(rows = 0, cols = 0) {
    const table = document.createElement('table')

    // const table = this.rootNode.querySelector('table')

    for (let i = 0; i < rows; i++) {
      const row = table.insertRow(i)

      for (let j = 0; j < cols; j++) {
        const cell = row.insertCell(j)

        cell.addEventListener('click', this._handleCellClick.bind(this, i, j))
      }
    }

    this.rootNode.appendChild(table)
  }

  _handleCellClick(row, col) {
    this.lastClickedIndices = [row, col]

    try {
      this._makeUserMove(row, col)
    }
    catch(e) {
      // TODO - change to window.alert, now it throw "Not implemented: window.alert"
      console.log(e.message);
    }
  }
  
  _makeUserMove(row, col) {
    this.game.acceptUserMove(row, col)
  }
}

export default DomController