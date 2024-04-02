import { useState, useEffect } from 'react';
import Store from 'electron-store';

const store = new Store();

function useFavTab(defaultValue: string, key: string): [string, React.Dispatch<React.SetStateAction<string>>] {
    const [state, setState] = useState(() => {
        const storedValue = store.get(key);
        return (typeof storedValue === 'string') ? storedValue : defaultValue;
    });

    useEffect(() => {
        store.set(key, state);
    }, [key, state]);

    return [state, setState];
}

export default useFavTab;