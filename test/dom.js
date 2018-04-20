import {expect} from 'chai'
import jsdom from 'jsdom'
import sinon from 'sinon'

import Game from '../src/Game'
import DomController from '../src/DomController'

const {JSDOM} = jsdom
const dom = new JSDOM('<html><body id="root"></body></html>')

const createInstance = (game = new Game()) => {
  return new DomController({
    game: game,
    root: '#root'
  })
}

global.window = dom.window
global.document = dom.window.document

afterEach(() => {
  document.body.innerHTML = ''
})

describe('DOM controller', () => {
  it('Creates empty table', () => {
    const domController = createInstance()

    domController.createTable()

    expect(document.querySelectorAll('table').length).to.equal(1)
  })
})

it('Creates table with 3 rows and 3 columns', () => {
  const domController = createInstance()

  domController.createTable(3, 3)

  expect(document.querySelectorAll('table').length).to.equal(1)
  expect(document.querySelectorAll('tr').length).to.equal(3)
  expect(document.querySelectorAll('td').length).to.equal(9)
})

it('Remembers indices of last clicked cell', () => {
  const domController = createInstance()

  domController.createTable(3, 3)
  document.querySelector('table td').click()

  expect(domController.lastClickedIndices).to.deep.equal([0, 0])
})

it('Makes user move in game on cell click', () => {
  const gameMock = { acceptUserMove: sinon.spy() }
  const domController = createInstance(gameMock)

  domController.createTable(3, 3)
  document.querySelector('table td').click()

  expect(domController.game.acceptUserMove.called).to.be.true
})