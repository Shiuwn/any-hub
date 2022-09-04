export class Store {
  private _text: string[]
  private _size: number[]
  private _fontSize: number
  private actions: Set<Function>
  constructor() {
    this._text = ['Git', 'Hub']
    this._size = [400, 300]
    this.actions = new Set()
    this._fontSize = 52
  }

  add(action: () => void) {
    this.actions.add(action)
  }

  remove(action: () => void) {
    if (this.actions.has(action)) {
      this.actions.delete(action)
    }
  }

  perform(prop?: string) {
    this.actions.forEach((action) => (typeof action === 'function' && action(prop)))
  }

  get text() {
    return this._text
  }

  set text(val: string[]) {
    this._text = val
    this.perform()
  }
  
  get size() {
    return this._size
  }
  set size(val: number[]) {
    this._size = val
    this.perform('size')
  }
  get fontSize() {
    return this._fontSize
  }
  set fontSize(val: number) {
    this._fontSize = val
    this.perform()
  }
  
}

export default new Store()
