import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PLayoutViewComponent } from "./pages/p-layout-view/p-layout-view.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'MindMap';
}
