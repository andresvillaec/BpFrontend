import { Component } from '@angular/core';
import { HeaderComponent } from "./shared/components/header/header.component";
import { ContentComponent } from "./shared/components/content/content.component";

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, ContentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Andres Villavicencio BpFrontend';
}
