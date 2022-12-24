module Game {
    let Environment: {
        state: EnvironmentState,
        canvas: Canvas,
        character: Character,
        floors: Floor[],
        step(): void,
        loadImages(spriteImages: [Sprite, string][]): void,
        markKeyAsPressed(key: Key): void,
        markKeyAsReleased(key: Key): void,
        updateObjects(): void,
        getRendered(): void,
    } = {
        state: new EnvironmentState(),
        canvas: new Canvas("canvas"),
        character: new Character(),
        floors: [new Floor()],

        loadImages(spriteImages: [Sprite, string][]): void {
            this.canvas.loadImages(spriteImages);
        },

        markKeyAsPressed(key: Key): void {
            this.state.markKeyAsPressed(key);
        },

        markKeyAsReleased(key: Key): void {
            this.state.markKeyAsReleased(key);
        },

        updateObjects(): void {
            this.character.getUpdated(this.state);
        },

        getRendered(): void {
            this.canvas.getCleared();
            this.canvas.draw(this.character);
            this.floors.forEach(floor => this.canvas.draw(floor));
        },

        step(): void {
            this.state.update();
            Environment.updateObjects();
            Environment.getRendered();
            window.requestAnimationFrame(() => {
                Environment.step();
            });
        }
    }

    Environment.loadImages(
        [
            [CharacterSprite.Idle0, "images/character/idle/0.png"],
            [CharacterSprite.Idle1, "images/character/idle/1.png"],
            [CharacterSprite.Idle2, "images/character/idle/2.png"],
            [CharacterSprite.Idle3, "images/character/idle/3.png"],
            [CharacterSprite.RunRight0, "images/character/run/right/0.png"],
            [CharacterSprite.RunRight1, "images/character/run/right/1.png"],
            [CharacterSprite.RunRight2, "images/character/run/right/2.png"],
            [CharacterSprite.RunRight3, "images/character/run/right/3.png"],
            [CharacterSprite.RunLeft0, "images/character/run/left/0.png"],
            [CharacterSprite.RunLeft1, "images/character/run/left/1.png"],
            [CharacterSprite.RunLeft2, "images/character/run/left/2.png"],
            [CharacterSprite.RunLeft3, "images/character/run/left/3.png"],
            
            [FloorSprite.RockLeft, "images/floor/rock/left.png"],
            [FloorSprite.RockMiddle, "images/floor/rock/middle.png"],
            [FloorSprite.RockRight, "images/floor/rock/right.png"],
        ]
    );

    document.addEventListener('keydown', function (event) {
        Environment.markKeyAsPressed(event.key as Key)
    });

    document.addEventListener('keyup', function (event) {
        Environment.markKeyAsReleased(event.key as Key)
    });

    window.requestAnimationFrame(() => {
        Environment.step();
    });
}