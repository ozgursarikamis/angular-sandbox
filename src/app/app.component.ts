import { Component } from '@angular/core';

import { bind, play } from "cuelume";

type sound = "chime" | "sparkle" | "droplet" | "bloom" | "whisper" | "tick" | "press" | "release" | "toggle" | "success" | undefined;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent {
  title = 'MapLibre';

  sound(sound: sound) {
    // bind();
    play(sound);
  }
}
