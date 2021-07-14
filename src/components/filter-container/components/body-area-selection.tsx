import { FC, MouseEvent, useCallback, useEffect, useReducer } from 'react';

interface BodyAreaSelectionProps {
    bodyAreas: string[]
    onChange: (selectedItems: string[]) => void
}

interface BodyAreaState {
    items: string[]
    show: boolean
}

export enum BodyAreaActionType {
    AddBodyArea,
    RemoveBodyArea,
    ToggleMenu,
    BulkAdd
}

export interface AddBodyArea {
    type: BodyAreaActionType.AddBodyArea
    payload: string
}

export interface RemoveBodyArea {
    type: BodyAreaActionType.RemoveBodyArea
    payload: string
}

export interface ToggleMenu {
    type: BodyAreaActionType.ToggleMenu
}

export interface BulkAdd {
    type: BodyAreaActionType.BulkAdd
    bodyAreas: string[]
}

export type GameActions = AddBodyArea | RemoveBodyArea | ToggleMenu | BulkAdd

export const BodyAreaSelection: FC<BodyAreaSelectionProps> = ({ bodyAreas, onChange }) => {

    const [state, dispatch] = useReducer((state: BodyAreaState, action: GameActions) => {
        switch (action.type) {
            case BodyAreaActionType.AddBodyArea:
                return { ...state, items: [...state.items, action.payload]};
            case BodyAreaActionType.RemoveBodyArea:
                return { ...state, items: [...state.items.filter(i => i !== action.payload)] }
            case BodyAreaActionType.ToggleMenu:
                return { ...state, show: !state.show }
            case BodyAreaActionType.BulkAdd:
                return { ...state, items: [ ...state.items, ...action.bodyAreas ] }
            default:
                throw new Error();
        }
    }, { items: [...bodyAreas], show: false});

    useEffect(() => {
        onChange(state.items)
    }, [state.items, onChange]);

    useEffect(() => {
        dispatch({
            type: BodyAreaActionType.BulkAdd,
            bodyAreas: bodyAreas
        })
    }, [bodyAreas]);


    const handleOnClick = useCallback(() => {
        dispatch({ type: BodyAreaActionType.ToggleMenu })
    }, [])

    const handleSelectItemOnClick = useCallback((event: MouseEvent<HTMLInputElement>) => {
        const isChecked = event.currentTarget.checked
        const value = event.currentTarget.value

        if (isChecked) {
            dispatch({ type: BodyAreaActionType.AddBodyArea, payload: value })
        } else {
            dispatch({ type: BodyAreaActionType.RemoveBodyArea, payload: value})
        }

    }, [])

    return (
        <div className={`dropdown ${ state.show ? 'is-active' : ''}`}>
            <div className="dropdown-trigger">
                <button className="button" aria-haspopup="true" aria-controls="dropdown-menu" onClick={handleOnClick}>
                    <span>Body Areas</span>
                    <span className="icon is-small">
                        <i className="fas fa-angle-down" aria-hidden="true"/>
                    </span>
                </button>
            </div>

            <div className="dropdown-menu" id="dropdown-menu" role="menu">
                <div className="dropdown-content">
                    {
                        bodyAreas.map(ba =>
                            <div key={ba} className="dropdown-item">
                                <label className="checkbox">
                                    <input type="checkbox" value={ba} defaultChecked={true} onClick={handleSelectItemOnClick}/>
                                    {ba}
                                </label>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}
