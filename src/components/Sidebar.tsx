import { ChangeEvent, Dispatch, FC, useContext, useState } from "react";
import { Action, Store, StoreContext } from '../App'
import { DownloadFunc } from "../utils";


const Sidebar: FC = () => {

  const store = useContext(StoreContext)
  const { state, dispatch } = store as { state: Store, dispatch: Dispatch<Action> }
  type Keys = keyof Store
  const { size, text, fontSize } = state

  const changeFactory = (prop: Keys, type: 'number' | 'string', index?: number) => {
    return (e: ChangeEvent<HTMLInputElement>) => {
      let value: number | string = e.target.value
      if (type === 'number') {
        value = parseInt(value)
      }

      if (index !== undefined) {
        let origin = state[prop] as any[]
        origin = [...origin]
        origin.splice(index, 1, value)
        dispatch({ type: prop, payload: origin })
        return
      }
      console.log(value)
      dispatch({ type: prop, payload: value as number })
    }
  }

  return (
    <div className="flex flex-col w-320px h-full px-4 pt-4 space-y-4 text-gray-800 text-base bg-gray-50">
      <label className="flex border border-dashed border-blue-500 p-4">
        <span className="mr-2 min-w-80px">尺寸：</span>
        <input className="border border-gray-300 outline-none rounded-sm px-2 w-16" type="number" min={200} value={size[0]} placeholder="数字" onChange={changeFactory('size', 'number', 0)} />
        <span className="text-yellow-500">&nbsp;x&nbsp;</span>
        <input className="border border-gray-300 outline-none rounded-sm px-2 w-16" type="number" min={150} value={size[1]} placeholder="数字" onChange={changeFactory('size', 'number', 1)} />
      </label>
      <label className="flex border border-dashed border-blue-500 p-4">
        <span className="mr-2 min-w-80px">文字：</span>
        <input className="border border-gray-300 outline-none rounded-sm px-2 w-16" type="text" value={text[0]} placeholder="输入文字" onChange={changeFactory('text', 'string', 0)} />
        <span className="text-yellow-500">&nbsp;+&nbsp;</span>
        <input className="border border-gray-300 outline-none rounded-sm px-2 w-16" type="text" value={text[1]} placeholder="输入文字" onChange={changeFactory('text', 'string', 1)} />
      </label>
      <label className="flex border border-dashed border-blue-500 p-4">
        <span className="mr-2 min-w-80px">字号：</span>
        <input className="border border-gray-300 outline-none rounded-sm px-2 w-16" type="number" min={30} value={fontSize} onChange={changeFactory('fontSize', 'number')} />
      </label>
      <button className="px-2 py-4 bg-blue-500 text-white" onClick={() => {DownloadFunc.download()}}>下载</button>
    </div>
  )
}

export default Sidebar
