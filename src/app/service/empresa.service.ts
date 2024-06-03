import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Empresa} from '../api/dto/empresa';
import { Observable } from 'rxjs';

@Injectable()
export class EmpresaService {

    private readonly apiUrl = 'http://localhost:3000/empresa';

    constructor(private http: HttpClient) { }

    getList(): Observable<Empresa[]> {
        return this.http.get<Empresa[]>(this.apiUrl)

    }

    create(empresa: Empresa): Observable<Empresa> {
        return this.http.post<Empresa>(this.apiUrl, empresa);
    }

    update(uuid: string, empresa: Empresa): Observable<Empresa> {
        return this.http.put<Empresa>(`${this.apiUrl}/${uuid}`, empresa);
    }

}
