module Game {
    export class EnvironmentState {
        private _previousTimeStamp: number = Date.now();
        private _currentTimeStamp: number = Date.now();
        private _timeDelta: number = 0;
        private _pressedKeys: Set<Key> = new Set<Key>();

        get previousTimeStamp(): number {
            return this._previousTimeStamp;
        }

        get currentTimeStamp(): number {
            return this._currentTimeStamp;
        }

        get timeDelta(): number {
            return this._timeDelta;
        }

        update(): void {
            this._previousTimeStamp = this.currentTimeStamp;
            this._currentTimeStamp = Date.now();
            this._timeDelta = this.currentTimeStamp - this.previousTimeStamp;
        }

        markKeyAsPressed(key: Key): void {
            this._pressedKeys.add(key);
        }

        markKeyAsReleased(key: Key): void {
            this._pressedKeys.delete(key);
        }

        isKeyPressed(key: Key): boolean {
            return this._pressedKeys.has(key);
        }
    }
}