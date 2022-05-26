import {AfterViewInit, Component, ElementRef, NgZone, ViewChild} from '@angular/core'
import * as PIXI from 'pixi.js'

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements AfterViewInit {

  @ViewChild('canvasEditor') canvasEditor!: ElementRef;
  public pageHeight: number = 598
  public pageWidth: number = 424

  private elements = []
  private app!: PIXI.Application
  private editorContainer!: PIXI.Container

  constructor(public elRef: ElementRef, private zone: NgZone) {
  }

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(
      (): void => {
        this.app = new PIXI.Application({
          backgroundColor: 0xEEEEEE,
          width: this.pageWidth,
          height: this.pageHeight,
          view: this.canvasEditor.nativeElement,
        });

        this.editorContainer = new PIXI.Container()
        this.app.stage.addChild(this.editorContainer)

        this.app.renderer.render(this.app.stage)
      }
    )
  }

  cleanSlate() {
    this.editorContainer.destroy()
    this.editorContainer = new PIXI.Container()
    this.app.stage.addChild(this.editorContainer)
  }

  async loadTemplate() {
    // const el = PIXI.Sprite.from('assets/plab-logo-opti.png')
    // el.anchor.set(0.5)
    // el.x = this.app.screen.width / 2
    // el.y = this.app.screen.height / 2
    // el.scale.set(.2)
    // el.interactive = true
    // el.buttonMode = true
    // el.on('pointerdown', this.onDragStart)
    //   .on('pointerup', this.onDragEnd)
    //   .on('pointerupoutside', this.onDragEnd)
    //   .on('pointermove', this.onDragMove)
    // this.editorContainer.addChild(el)

    // TODO when click
    // Add selection resizing square
    // Add toolbox bar

    this.app
      .loader
      .add("svgTest", "assets/plab-logo.svg")
      .load((loader, res) => {
        const svg = new PIXI.Sprite(res['svgTest'].texture)
        svg.anchor.set(0.5)
        svg.x = this.app.screen.width / 2
        svg.y = this.app.screen.height / 2
        svg.scale.set(.5)
        svg.interactive = true
        svg.buttonMode = true
        svg.on('pointerdown', this.onDragStart)
           .on('pointerup', this.onDragEnd)
           .on('pointerupoutside', this.onDragEnd)
           .on('pointermove', this.onDragMove)
        this.editorContainer.addChild(svg)
      })

    const style = new PIXI.TextStyle({
      fontFamily: 'Arial',
      fontSize: 36,
      fontStyle: 'italic',
      fontWeight: 'bold',
      fill: ['#ffffff', '#00ff99'], // gradient
      stroke: '#4a1850',
      strokeThickness: 5,
      dropShadow: true,
      dropShadowColor: '#000000',
      dropShadowBlur: 4,
      dropShadowAngle: Math.PI / 6,
      dropShadowDistance: 6,
      wordWrap: true,
      wordWrapWidth: 440,
      lineJoin: 'round',
    });
    const txt = new PIXI.Text("Foo bar baz", style)
    txt.x = 50
    txt.y = 100
    this.editorContainer.addChild(txt)
  }

  onDragStart(event: any) {
    // store a reference to the data
    // the reason for this is because of multitouch
    // we want to track the movement of this particular touch
    // @ts-ignore
    this.data = event.data;
    // @ts-ignore
    this.alpha = 0.5;
    // @ts-ignore
    this.dragging = true;
  }

  onDragEnd() {
    // @ts-ignore
    this.alpha = 1;
    // @ts-ignore
    this.dragging = false;
    // set the interaction data to null
    // @ts-ignore
    this.data = null;
  }

  onDragMove() {
    // @ts-ignore
    if (this.dragging) {
      // @ts-ignore
      const newPosition = this.data.getLocalPosition(this.parent);
      // @ts-ignore
      this.x = newPosition.x;
      // @ts-ignore
      this.y = newPosition.y;
    }
  }
}
