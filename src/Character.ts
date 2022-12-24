module Game {
    export class Character implements IDrawable {
        x: number = 0;
        y: number = 0;
        velocity: number = 0;
        currentSprite: CharacterSprite = CharacterSprite.Idle0;
        previousSpriteTimeStamp: number = 0;

        tryUpdateIdleSprite(environmentState: EnvironmentState) {
            if (Math.abs(this.velocity) > 4 || environmentState.currentTimeStamp - this.previousSpriteTimeStamp < 300) {
                return;
            }

            switch (this.currentSprite) {
                case CharacterSprite.Idle0:
                    this.currentSprite = CharacterSprite.Idle1;
                    break;
                case CharacterSprite.Idle1:
                    this.currentSprite = CharacterSprite.Idle2;
                    break;
                case CharacterSprite.Idle2:
                    this.currentSprite = CharacterSprite.Idle3;
                    break;
                default :
                    this.currentSprite = CharacterSprite.Idle0;
            }
            this.previousSpriteTimeStamp = environmentState.currentTimeStamp;
        }

        tryUpdateRunSprite(environmentState: EnvironmentState) {
            if (Math.abs(this.velocity) < 4 || environmentState.currentTimeStamp - this.previousSpriteTimeStamp < 70) {
                return;
            }
            if (this.velocity > 0) {
                switch (this.currentSprite) {
                    case CharacterSprite.RunRight0:
                        this.currentSprite = CharacterSprite.RunRight1;
                        break;
                    case CharacterSprite.RunRight1:
                        this.currentSprite = CharacterSprite.RunRight2;
                        break;
                    case CharacterSprite.RunRight2:
                        this.currentSprite = CharacterSprite.RunRight3;
                        break;
                    default :
                        this.currentSprite = CharacterSprite.RunRight0;
                }
            } else {
                switch (this.currentSprite) {
                    case CharacterSprite.RunLeft0:
                        this.currentSprite = CharacterSprite.RunLeft1;
                        break;
                    case CharacterSprite.RunLeft1:
                        this.currentSprite = CharacterSprite.RunLeft2;
                        break;
                    case CharacterSprite.RunLeft2:
                        this.currentSprite = CharacterSprite.RunLeft3;
                        break;
                    default :
                        this.currentSprite = CharacterSprite.RunLeft0;
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