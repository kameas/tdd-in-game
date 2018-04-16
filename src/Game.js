export default class Game {
  constructor() {
    this._board = [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ]

    this._history = []
    this._userMoveSymbol = '×'
    this._computerMoveSymbol = 'o'

    this._userName = 'user'
    this._computerName = 'computer'
  }

  getState() {
    return this._board
  }

  acceptUserMove(x, y) {
    if (!this._isCellFree(x, y)) {
      return this._throwException('cell is already taken')
    }

    this._updateBoard(x, y)

    this._saveMove(this._userName, x, y)
  }

  createComputerMove() {
    this._updateBoard(0, 0, {
      symbol: this._computerMoveSymbol
    })

    this._saveMove(this._computerName, 0, 0)
  }

  getMoveHistory() {
    return this._history
  }

  _saveMove(turn, x, y) {
    this._history.push({turn, x, y})
  }

  _updateBoard(x, y, config = {}) {
    const {symbol = this._userMoveSymbol} = config
    this._board[x][y] = symbol
  }

  _isCellFree(x, y) {
    return !this._board[x][y]
  }

  _throwException(msg) {
    throw new Error(msg)
  }
}