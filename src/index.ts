module Game {
    let Environment: {
        state: EnvironmentState,
        canvas: Canvas,
        character: Character,
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
            [Sprite.characterIdle0, "images/character/idle/0.png"],
            [Sprite.characterIdle1, "images/character/idle/1.png"],
            [Sprite.characterIdle2, "images/character/idle/2.png"],
            [Sprite.characterIdle3, "images/character/idle/3.png"],
            [Sprite.characterRunRight0, "images/character/run/right/0.png"],
            [Sprite.characterRunRight1, "images/character/run/right/1.png"],
            [Sprite.characterRunRight2, "images/character/run/right/2.png"],
            [Sprite.characterRunRight3, "images/character/run/right/3.png"],
            [Sprite.characterRunLeft0, "images/character/run/left/0.png"],
            [Sprite.characterRunLeft1, "images/character/run/left/1.png"],
            [Sprite.characterRunLeft2, "images/character/run/left/2.png"],
            [Sprite.characterRunLeft3, "images/character/run/left/3.png"],
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