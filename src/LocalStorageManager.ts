import {type LocallyStoredData} from "./constants/LocallyStoredData";

const locallyStoredDataKey: string = "ellieRoomLocalData";

class LocalStorageManager
{
    private _localData: LocallyStoredData;

    public get loggedIn(): boolean
    {
        return this._localData.loggedIn;
    }

    public set loggedIn(value: boolean)
    {
        this._localData.loggedIn = value;
        localStorage.setItem(locallyStoredDataKey, JSON.stringify(this._localData));
    }

    constructor()
    {
        const locallyStoredDataString = localStorage.getItem(locallyStoredDataKey);   
        if (locallyStoredDataString === null)
        {
            this._localData = this._createDefaultLocallyStoredData();
        }
        else
        {
            this._localData = JSON.parse(locallyStoredDataString);
        }
    }

    private _createDefaultLocallyStoredData(): LocallyStoredData
    {
        const defaultLocallyStoredData = {
            loggedIn: false
        };
        localStorage.setItem(locallyStoredDataKey, JSON.stringify(defaultLocallyStoredData));
        return defaultLocallyStoredData;
    }
}

export const localStorageManager = new LocalStorageManager();