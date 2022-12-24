module Game {
    export class Floor implements IDrawable {
        width: number = 35;
        hight: number = 900-37;
        material: FloorMaterial = FloorMaterial.Rock;
        direction: Direction = Direction.Right;

        getDrawnOnCanvas(canvas: Canvas): void{
            let offset: number = 0;
            if(this.direction == Direction.Right) {
                offset = 1120 - this.width * 32;
            }
            
            for(var i=0; i<this.width; i++) {
                if(i==0) {
                    canvas.drawSprite(FloorSprite.RockLeft, offset + i * 32, this.hight);
                }
                else if(i==this.width-1) {
                    canvas.drawSprite(FloorSprite.RockRight, offset + i * 32, this.hight);
                }
                else {
                    canvas.drawSprite(FloorSprite.RockMiddle, offset + i * 32, this.hight);
                }
            }
        }
    }
}