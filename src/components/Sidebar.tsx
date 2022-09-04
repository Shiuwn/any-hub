import { ChangeEvent, FC, useContext, useState } from "react";
import { StoreContext } from '../App'
import type { MethodKeys } from '../utils'


const Sidebar: FC = () => {

  const store = useContext(StoreContext)
  type Store = typeof store
  type Keys = keyof Omit<Store, MethodKeys<Store>>
  const [size, setSize] = useState(store.size)
  const [fontSize, setFontSize] = useState(store.fontSize)
  const [text, setText] = useState(store.text)

  const actions = {
    size: setSize,
    fontSize: setFontSize,
    text: setText
  }

  const changeFactory = (prop: Keys, type: 'number' | 'string', index?: number) => {
    return (e: ChangeEvent<HTMLInputElement>) => {
      let value: number | string = e.target.value
      if (type === 'number') {
        value = parseInt(value)
      }

      if (index !== undefined) {
        let originVal = store[prop] as (string[] | number[])
        let newVal = [...originVal]
        newVal.splice(index, 1, value)
        store[prop] = newVal as number[] & string[] & number
        setSize(newVal as number[])
        return
      }
      store[prop] = value as number[] & string[] & number
    }
  }

  return (
    <div className="flex flex-col w-320px h-full px-4 pt-4 space-y-4 text-gray-800 text-base bg-gray-50">
      <label className="flex border border-dashed border-blue-500 p-4">
        <span className="mr-2 min-w-80px">尺寸：</span>
        <input className="border border-gray-300 outline-none rounded-sm px-2 w-16" type="number" value={size[0]} placeholder="数字" onChange={changeFactory('size', 'number', 0)} />
        <span className="text-yellow-500">x</span>
        <input className="border border-gray-300 outline-none rounded-sm px-2 w-16" type="number" value={size[1]} placeholder="数字" onChange={changeFactory('size', 'number', 1)} />
      </label>
      <label className="flex border border-dashed border-blue-500 p-4">
        <span className="mr-2 min-w-80px">文字：</span>
        <input className="border border-gray-300 outline-none rounded-sm px-2 w-16" type="text" value={text[0]} placeholder="输入文字" onChange={changeFactory('text', 'string', 0)} />
        <span className="text-yellow-500">+</span>
        <input className="border border-gray-300 outline-none rounded-sm px-2 w-16" type="text" value={text[1]} placeholder="输入文字" onChange={changeFactory('text', 'string', 1)} />
      </label>
      <label className="flex border border-dashed border-blue-500 p-4">
        <span className="mr-2 min-w-80px">大小：</span>
        <input className="border border-gray-300 outline-none rounded-sm px-2 w-16" type="number" value={fontSize} onChange={changeFactory('fontSize', 'number')} />
      </label>
      <button className="px-2 py-4 bg-blue-500 text-white">下载</button>
    </div>
  )
}

export default Sidebar