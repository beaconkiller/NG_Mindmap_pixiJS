export class srvMapEngine {

    private ctx!: CanvasRenderingContext2D;
    private animationId = 0;

    constructor(
        private canvas: HTMLCanvasElement
    ) { }


    start() {
        this.ctx = this.canvas.getContext('2d')!;

        this.resize();

        this.loop();
    }


    private loop = () => {
        this.render();
        this.animationId = requestAnimationFrame(this.loop);
    }

    private render() {
        // We'll draw here later

        this.ctx.clearRect(
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );


        this.ctx.fillStyle = "red";

        this.ctx.fillRect(
            100,
            100,
            100,
            100
        );

    }

    private resize() {
        console.log('resizing canvas...')
        this.canvas.width = this.canvas.clientWidth;
        this.canvas.height = this.canvas.clientHeight;
        console.log('resizing canvas done.')
    }


}