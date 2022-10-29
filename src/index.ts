enum Sprite {
    characterIdle0,
    characterIdle1,
    characterIdle2,
    characterIdle3
}

let images: Map<Sprite,CanvasImageSource>;

function main() {

    images = loadImages(
        [
            [Sprite.characterIdle0, "images/character/idle/0.png"],
            [Sprite.characterIdle1, "images/character/idle/1.png"],
            [Sprite.characterIdle2, "images/character/idle/2.png"],
            [Sprite.characterIdle3, "images/character/idle/3.png"]
        ]
    );
    
    const milliseconds: number = 60;
    var x = 0;

    setInterval(() => {
        Environment.getUpdated();
        Environment.getRendered();
    }, milliseconds);
}


function loadImages(spriteImages: [Sprite, string][]): Map<Sprite,CanvasImageSource> {
    let images = new Map<Sprite,HTMLImageElement>();
    spriteImages.forEach(([sprite, path]) => {
        const img = new Image;
        img.src = path;
        images.set(sprite, img);
    });
    return images;
}

interface IDrawable {
    getDrawnOnCanvas(canvas: Canvas): void;
}

class Character implements IDrawable {
    x: number = 0;
    y: number = 0;
    currentSprite: Sprite = Sprite.characterIdle0;    

    renewFrame() {
        switch(this.currentSprite) {
            case Sprite.characterIdle0:
                this.currentSprite = Sprite.characterIdle1;
                break;
            case Sprite.characterIdle1:
                this.currentSprite = Sprite.characterIdle2;
                break;
            case Sprite.characterIdle2:
                this.currentSprite = Sprite.characterIdle3;
                break;
            case Sprite.characterIdle3:
                this.currentSprite = Sprite.characterIdle0;
                break;
            default :
                alert("Error "+ this.currentSprite!);
        }

    }

    getDrawnOnCanvas(canvas: Canvas) {
        canvas.drawSprite(this.currentSprite, this.x, this.y);
    }
}


class Canvas {
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

    draw(...drawables: IDrawable[]) {
        drawables.forEach(drawable => drawable.getDrawnOnCanvas(this));
    }

    drawSprite (sprite: Sprite, x: number, y: number){
        this.context.drawImage(images.get(sprite)!, x, y);
    }

    getCleared() {
        this.context.clearRect(0, 0, this.width, this.height);
    }
}

let Environment: {
    timer: number,
    canvas: Canvas,
    character: Character,
    getUpdated(): void,
    getRendered(): void,
} = {
    timer: 0,
    canvas: new Canvas("canvas"),
    character: new Character(),

    getUpdated(): void {
        this.timer++;
        if(this.timer % 4 == 0) {
            this.character.renewFrame();
        }
    },

    getRendered(): void {
        this.canvas.getCleared();
        this.canvas.draw(this.character);
    }
}
