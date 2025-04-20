import { Injectable, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { URL } from "../../utils/utils";
import { Assignment } from "../../models/assignment";


export interface ConfigAssignment {
  modalOpened: boolean,
  assignment: any
}

@Injectable()
export class AssignmentService implements OnInit {
  configAssignmentToDelete!: ConfigAssignment;
  assignments!: any[];
  assignmentsPrepared!: Assignment[];
  assignmentTemp!: Assignment;
  configAssignmentToEdit!: ConfigAssignment;
  configAssignmentToAdd!: ConfigAssignment;
  URL!: string;
  prefix: string = "/assignments";

  constructor(private http: HttpClient) {
    this.URL = URL;
  }


  getAssignments(): Observable<Assignment[]> {
    return this.http.get<Assignment[]>(this.URL + this.prefix);
  }

  getAssignmentsLocal(): Observable<Assignment[]> {
    return this.http.get<Assignment[]>(`${URL}/assignments`);
  }

  ngOnInit(): void {
    this.getAssignments().subscribe(assignments => this.assignments = assignments);
  }

 
  generateId(): string {
    let id = 'avd' + Date.now();
    return id;
  }

  getOneAssignment(): Observable<Assignment> {
    return this.http.get<Assignment>(this.URL);
  }

  upDateAssignment(assignment: any): Observable<any> {
    return this.http.put<any>(URL + this.prefix + '/update/' + assignment._id, assignment);
  }

  addAssignment(assignment: Assignment): Observable<any> {
    return this.http.post<any>(URL + this.prefix + '/add', assignment);
  }

  deleteAssignment(id: any): Observable<any> {
    return this.http.delete<any>(URL + this.prefix + '/delete/' + id);
  }

  setConfigAssignmentToDelete(configAssignment: ConfigAssignment): Observable<boolean> {
    console.log(configAssignment)
    this.configAssignmentToDelete = configAssignment;
    return of(true);
  }

  setConfigAssignmentToEdit(configAssignment: ConfigAssignment): Observable<boolean> {
    console.log(configAssignment)
    this.configAssignmentToEdit = configAssignment;
    return of(true);
  }

  setConfigAssignmentToAdd(configAssignment: ConfigAssignment): Observable<boolean> {
    this.configAssignmentToAdd = configAssignment;
    return of(true);
  }

  initConfigAssignmentToDelete(): void {
    this.configAssignmentToDelete = {
      modalOpened: false,
      assignment: {}
    };
  }

  initConfigAssignmentToEdit(): void {
    this.configAssignmentToEdit = {
      modalOpened: false,
      assignment: {}
    };
  }

  initConfigAssignmentToAdd(): void {
    this.configAssignmentToAdd = {
      modalOpened: false,
      assignment: {}
    }
  }
}
