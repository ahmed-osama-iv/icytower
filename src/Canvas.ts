module Game {
    export class Canvas {
        private _images: Map<Sprite, CanvasImageSource> = new Map<CharacterSprite, CanvasImageSource>;
        private readonly canvas: HTMLCanvasElement;
        private readonly context: CanvasRenderingContext2D;
        private readonly width: number;
        private readonly height: number;

        constructor(id: string) {
            this.canvas = document.getElementById(id) as HTMLCanvasElement;
            this.context = this.canvas.getContext("2d") as CanvasRenderingContext2D;
            this.width = this.canvas.width;
            this.height = this.canvas.height;
        }

        loadImages(spriteImages: [Sprite, string][]): void {
            spriteImages.forEach(([sprite, path]) => {
                const img = new Image;
                img.src = path;
                this._images.set(sprite, img);
            });
        }

        draw(...drawables: IDrawable[]) {
            drawables.forEach(drawable => drawable.getDrawnOnCanvas(this));
        }

        drawSprite(sprite: Sprite, x: number, y: number) {
            this.context.drawImage(this._images.get(sprite)!, x, y);
        }

        getCleared() {
            this.context.clearRect(0, 0, this.width, this.height);
        }
    }
}