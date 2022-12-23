module Game {
    export class Character implements IDrawable {
        x: number = 0;
        y: number = 0;
        velocity: number = 0;
        currentSprite: Sprite = Sprite.characterIdle0;
        previousSpriteTimeStamp: number = 0;

        tryUpdateIdleSprite(environmentState: EnvironmentState) {
            if (Math.abs(this.velocity) > 4 || environmentState.currentTimeStamp - this.previousSpriteTimeStamp < 300) {
                return;
            }

            switch (this.currentSprite) {
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
            this.previousSpriteTimeStamp = environmentState.currentTimeStamp;
        }

        tryUpdateRunSprite(environmentState: EnvironmentState) {
            if (Math.abs(this.velocity) < 1 || environmentState.currentTimeStamp - this.previousSpriteTimeStamp < 70) {
                return;
            }
            if (this.velocity > 0) {
                switch (this.currentSprite) {
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
            } else {
                switch (this.currentSprite) {
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
            this.previousSpriteTimeStamp = environmentState.currentTimeStamp;
        }

        handleMotion(environmentState: EnvironmentState) {
            this.velocity *= Math.pow(0.95, environmentState.timeDelta / 10);
            if (Math.abs(this.velocity) < 0.1) {
                this.velocity = 0;
            }
            if (environmentState.isKeyPressed(Key.Right)) {
                this.velocity += 0.1 * environmentState.timeDelta;
            }
            if (environmentState.isKeyPressed(Key.Left)) {
                this.velocity -= 0.1 * environmentState.timeDelta;
            }
            this.x += this.velocity;
        }

        tryUpdateSprite(environmentState: EnvironmentState) {
            this.tryUpdateRunSprite(environmentState);
            this.tryUpdateIdleSprite(environmentState);
        }

        getUpdated(environmentState: EnvironmentState) {
            this.handleMotion(environmentState);
            this.tryUpdateSprite(environmentState);
        }

        getDrawnOnCanvas(canvas: Canvas) {
            canvas.drawSprite(this.currentSprite, this.x, this.y);
        }
    }
}