import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html'
})
export class LandingComponent {

    constructor(public layoutService: LayoutService, public router: Router) { }

    navigateToWhatsapplUrl(): void {
        window.open('https://api.whatsapp.com/send?phone=5548999976405', '_blank');
    }

    navigateToGithubUrl(): void {
        window.open('https://github.com/DiogoHumberto', '_blank');
    }

    navigateToLinkedinUrl(): void {
        window.open('https://www.linkedin.com/in/diogo-humberto', '_blank');
    }

}
