import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITask } from '../types/task.interface';
import { Observable } from 'rxjs';
import { ITaskResponse } from '../types/task-response.interface';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  create(taskPayload: ITask): Observable<ITaskResponse> {
    return this._http.post<ITaskResponse>(
      'http://localhost:8080/api/v1/tasks',
      taskPayload
    );
  }

  getAll(): Observable<ITaskResponse[]> {
    return this._http.get<ITaskResponse[]>(
      'http://localhost:8080/api/v1/tasks'
    );
  }

  updateTask(
    updateData: Partial<ITask>,
    id: number
  ): Observable<ITaskResponse> {
    return this._http.put<ITaskResponse>(
      `http://localhost:8080/api/v1/tasks/${id}`,
      updateData
    );
  }

  // getById(id: number): Observable<ITask> {
  //   return this._http.get();
  // }

  // update(id: number, data: Partial<ITask>): Observable<ITask> {
  //   return this._http.put();
  // }

  // delete(id: number): Observable<ITask> {
  //   return this._http.delete();
  //}

  constructor(private readonly _http: HttpClient) {}
}
