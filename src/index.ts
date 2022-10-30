enum Sprite {
    characterIdle0,
    characterIdle1,
    characterIdle2,
    characterIdle3,
    characterRunRight0,
    characterRunRight1,
    characterRunRight2,
    characterRunRight3,
    characterRunLeft0,
    characterRunLeft1,
    characterRunLeft2,
    characterRunLeft3,
}

enum Key {
    Right = "ArrowRight",
    Left = "ArrowLeft",
}

function main() {

    const images = loadImages(
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
    
    document.addEventListener('keydown', function(event){
        Environment.markKeyAsPressed(event.key as Key)
    });

    document.addEventListener('keyup', function(event){
        Environment.markKeyAsReleased(event.key as Key)
    });

    window.requestAnimationFrame(() => {
        Environment.step();
    });
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
    x = 0;
    y = 0;
    velocity = 0;
    currentSprite: Sprite = Sprite.characterIdle0;    
    prevousSpriteTimeStamp = 0;

    tryUpdateIdleSprite() {
        if(Math.abs(this.velocity) > 4 || Environment.currentTimeStamp - this.prevousSpriteTimeStamp < 300) {
            return;
        }

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
            default :
                this.currentSprite = Sprite.characterIdle0;
        }
        this.prevousSpriteTimeStamp = Environment.currentTimeStamp;
    }

    tryUpdateRunSprite() {
        if(Math.abs(this.velocity) < 1 || Environment.currentTimeStamp - this.prevousSpriteTimeStamp < 70) {
            return;
        }
        if(this.velocity > 0){
            switch(this.currentSprite) {
                case Sprite.characterRunRight0:
                    this.currentSprite = Sprite.characterRunRight1;
                    break;
                case Sprite.characterRunRight1:
                    this.currentSprite = Sprite.characterRunRight2;
                    break;
                case Sprite.characterRunRight2:
                    this.currentSprite = Sprite.characterRunRight3;
                    break;
                default :
                    this.currentSprite = Sprite.characterRunRight0;
            }
        }
         else {
            switch(this.currentSprite) {
                case Sprite.characterRunLeft0:
                    this.currentSprite = Sprite.characterRunLeft1;
                    break;
                case Sprite.characterRunLeft1:
                    this.currentSprite = Sprite.characterRunLeft2;
                    break;
                case Sprite.characterRunLeft2:
                    this.currentSprite = Sprite.characterRunLeft3;
                    break;
                default :
                    this.currentSprite = Sprite.characterRunLeft0;
            }
        }
        this.prevousSpriteTimeStamp = Environment.currentTimeStamp;
    }


    handleMotion() {
        this.velocity *= Math.pow(0.95, Environment.timeDelta/10);
        if(Math.abs(this.velocity) < 0.1) {
            this.velocity = 0;
        }
        if(Environment.isKeyPressed.get(Key.Right)) {
            this.velocity += 0.1 * Environment.timeDelta;
        }
        if(Environment.isKeyPressed.get(Key.Left)) {
            this.velocity -= 0.1 * Environment.timeDelta;
        }
        this.x += this.velocity;
    }

    tryUpdateSprite() {
        this.tryUpdateRunSprite();
        this.tryUpdateIdleSprite();
    }

    getUpdated(){
        this.handleMotion();
        this.tryUpdateSprite();
    }

    getDrawnOnCanvas(canvas: Canvas) {
        canvas.drawSprite(this.currentSprite, this.x, this.y);
    }
}


class Canvas {
    private readonly images: Map<Sprite, CanvasImageSource>;
    private readonly canvas: HTMLCanvasElement;
    private readonly context: CanvasRenderingContext2D;
    private readonly width: number;
    private readonly height: number;

    constructor(id: string, images: Map<Sprite, CanvasImageSource>) {
        this.images = images;
        this.canvas = document.getElementById(id) as HTMLCanvasElement;
        this.context = this.canvas.getContext("2d") as CanvasRenderingContext2D;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
    }

    draw(...drawables: IDrawable[]) {
        drawables.forEach(drawable => drawable.getDrawnOnCanvas(this));
    }

    drawSprite (sprite: Sprite, x: number, y: number){
        this.context.drawImage(this.images.get(sprite)!, x, y);
    }

    getCleared() {
        this.context.clearRect(0, 0, this.width, this.height);
    }
}

class Environment {
    static previousTimeStamp = Date.now();
    static currentTimeStamp = Date.now();
    static timeDelta = 0;
    static isKeyPressed = new Map<Key, boolean>();
    static canvas = new Canvas("canvas");
    static character = new Character();

    static markKeyAsPressed(key: Key): void {
        Environment.isKeyPressed.set(key, true);
    }

    static markKeyAsReleased(key: Key): void {
        Environment.isKeyPressed.set(key, false);
    }

    static updateObjects(): void {
        Environment.character.getUpdated();
    }

    static getRendered(): void {
        Environment.canvas.getCleared();
        Environment.canvas.draw(Environment.character);
    }

    static step(): void {
        Environment.previousTimeStamp = Environment.currentTimeStamp;
        Environment.currentTimeStamp = Date.now();
        Environment.timeDelta = Date.now() - Environment.previousTimeStamp;
        Environment.updateObjects();
        Environment.getRendered();
        window.requestAnimationFrame(() => {
            Environment.step();
        });
    }
}
