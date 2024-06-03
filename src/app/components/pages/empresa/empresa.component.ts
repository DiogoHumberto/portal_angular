import { Component, OnInit } from '@angular/core';
import { EmpresaService } from './../../../service/empresa.service';
import { Empresa } from 'src/app/api/dto/empresa';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
    templateUrl: './empresa.component.html',
    providers: [MessageService],
})
export class EmpresaComponent implements OnInit {
    empresas: Empresa[];

    empresa: Empresa = {};

    empresaDialog: boolean = false;

    deleteEmpresaDialog: boolean = false;

    deleteEmpresasDialog: boolean = false;

    selectedEmpresas: Empresa[] = [];

    submitted: boolean = false;

    edit: boolean = false;

    reativeEmpresaDialog: boolean = false;

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    cols: any[] = [];

    constructor(
        private empresaService: EmpresaService,
        private messageService: MessageService
    ) {}

    ngOnInit() {
        this.empresaService
            .getList()
            .subscribe((data) => (this.empresas = data));

        this.cols = [
            { field: 'cnpj', header: 'CNPJ' },
            { field: 'fantasia', header: 'Nome Fantasia' },
            { field: 'razsoc', header: 'Razao Social' },
            { field: 'telefone', header: 'Telefone' },
            { field: 'email', header: 'E-Mail' },
            { field: 'status', header: 'Status' },
        ];
    }

    openNew() {
        this.empresa = {};
        this.submitted = false;
        this.empresaDialog = true;
        this.edit = false;
    }

    deleteSelectedEmpresas() {
        this.deleteEmpresasDialog = true;
    }

    editEmpresa(empresa: Empresa) {
        this.empresa = { ...empresa };
        if (this.empresa.status === 2) {
           this.reativeEmpresaDialog = true;
        }else{

            this.empresaDialog = true;
            this.edit = true;
        }

    }

    deleteEmpresa(empresa: Empresa) {
        this.deleteEmpresaDialog = true;
        this.empresa = { ...empresa };
    }

    confirmDeleteSelected() {
        this.deleteEmpresasDialog = false;
        this.empresas.forEach((empresa) => {
            empresa.status = 2;
            this.empresa = empresa;
            this.saveEmpresa();

        })

        this.empresa = {};
        this.selectedEmpresas = [];
    }

    confirmDelete() {
        this.deleteEmpresaDialog = false;
        this.empresa.status = 2;
        this.saveEmpresa();
        // this.empresas = this.empresas.filter(
        //     (val) => val.id !== this.empresa.id
        // );
        // this.messageService.add({
        //     severity: 'success',
        //     summary: 'Successful',
        //     detail: 'Empresa Desativada',
        //     life: 3000,
        // });
        this.empresa = {};
    }

    confirmReativeEmpresa() {
        this.reativeEmpresaDialog = false;
        this.empresa.status = 1;
        this.saveEmpresa();
        this.empresa = {};
    }

    hideDialog() {
        this.empresaDialog = false;
        this.submitted = false;
    }

    createId() {
        return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, (c) =>
            (
                +c ^
                (crypto.getRandomValues(new Uint8Array(1))[0] &
                    (15 >> (+c / 4)))
            ).toString(16)
        );
    }

    saveEmpresa() {
        this.submitted = true;

        if (this.empresa.cnpj?.trim()) {
            if (this.empresa.id) {
                this.empresaService
                    .update(this.empresa.id, this.empresa)
                    .subscribe({
                        next: (response) => {
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Successful',
                                detail: 'Empresa Updated',
                                life: 3000,
                            });
                        },
                        error: (error) => {
                            this.messageService.add({
                                severity: 'error',
                                summary: 'Error',
                                detail: 'Erro ao Atualizar',
                                life: 3000,
                            });
                        },
                        complete: () => {
                            this.empresaService
                                .getList()
                                .subscribe((data) => (this.empresas = data));
                            console.log(this.empresas);
                        },
                    });

                this.empresas[this.findIndexById(this.empresa.id)] =
                    this.empresa;
            } else {
                this.empresa.id = this.createId();
                this.empresa.status = 1;
                this.empresaService.create(this.empresa).subscribe({
                    next: (response) => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Successful',
                            detail: 'Empresa Created',
                            life: 3000,
                        });
                    },
                    error: (error) => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'Erro ao Criar',
                            life: 3000,
                        });
                    },
                    complete: () => {
                        this.empresaService
                            .getList()
                            .subscribe((data) => (this.empresas = data));
                        console.log(this.empresas);
                    },
                });
            }
            this.empresaDialog = false;
            this.empresa = {};
        }
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.empresas.length; i++) {
            if (this.empresas[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    // createId(): string {
    //     let id = '';
    //     const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    //     for (let i = 0; i < 5; i++) {
    //         id += chars.charAt(Math.floor(Math.random() * chars.length));
    //     }
    //     return id;
    // }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }
}
