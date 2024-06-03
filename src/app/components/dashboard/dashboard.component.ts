import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { HistContrbPartc } from '../../api/histContrbPartc';
import { Subscription, debounceTime } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Router } from '@angular/router';

@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {

    listHist!: HistContrbPartc[];

    loading: boolean = true;

    @ViewChild('filter') filter!: ElementRef;

    constructor(private router: Router, public layoutService: LayoutService) { }

    ngOnInit() {
        this.loading = false;
        this.redirect();

    }

    redirect(): void {
        this.router.navigate(['/pages/empresa']);
      }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }

    ngOnDestroy() { }
}
