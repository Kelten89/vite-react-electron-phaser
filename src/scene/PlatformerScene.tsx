import Phaser from "phaser";

import sky from "../assets/sky.png";
import ground from "../assets/platform.png";
import star from "../assets/star.png";
import bomb from "../assets/bomb.png";
import monkey from "../assets/dude.png";

export default class MyGame extends Phaser.Scene {
  player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody = undefined;
  constructor() {
    super("PlatformerScene");
  }

  // 세가지 메인 함수를 제공함 preload, create, update

  // 사전에 로드나 셋팅이 필요한것들 데이터나, 이미지 등
  preload() {
    this.load.image("sky", sky);
    this.load.image("ground", ground);
    this.load.image("star", star);
    this.load.image("bomb", bomb);
    this.load.spritesheet("dude", monkey, {
      frameWidth: 32,
      frameHeight: 48,
    });
  }

  // 배경이나, 생성하고 싶은 것들을 그려냄
  create() {
    this.add.image(400, 300, "sky");

    const platforms = this.physics.add.staticGroup();
    // platforms
    platforms.create(400, 568, "ground").setScale(2).refreshBody();
    platforms.create(600, 400, "ground");
    platforms.create(50, 250, "ground");
    platforms.create(750, 220, "ground");
    this.player = this.physics.add.sprite(100, 450, "dude");
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, platforms);

    //animation
    this.anims.create({
      key: "turn",
      frames: [{ key: "dude", frame: 4 }],
      frameRate: 20,
    });
    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });
  }

  // 매 초마다 실행하고 싶은 것, 틱당 실행함, 움직임, 충돌 등
  update() {
    const cursors = this.input.keyboard.createCursorKeys();
    if (cursors.left.isDown) {
      this.player.setVelocityX(-160);
      this.player.anims.play("left", true);
    } else if (cursors.right.isDown) {
      this.player.setVelocityX(160);
      this.player.anims.play("right", true);
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play("turn");
    }

    if (cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-420);
    }
  }
}
