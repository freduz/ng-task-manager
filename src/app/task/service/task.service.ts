import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITask } from '../types/task.interface';
import { Observable } from 'rxjs';
import { ITaskResponse } from '../types/task-response.interface';
import { environment } from 'src/environments/environment';

const API_URL = `${environment.apiUrl}/tasks`;

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  create(taskPayload: ITask): Observable<ITaskResponse> {
    return this._http.post<ITaskResponse>(API_URL, taskPayload);
  }

  getAll(): Observable<ITaskResponse[]> {
    return this._http.get<ITaskResponse[]>(API_URL);
  }

  updateTask(
    updateData: Partial<ITask>,
    id: number
  ): Observable<ITaskResponse> {
    return this._http.put<ITaskResponse>(`${API_URL}/${id}`, updateData);
  }

  delete(id: number): Observable<void> {
    return this._http.delete<void>(`${API_URL}/${id}`);
  }

  constructor(private readonly _http: HttpClient) {}
}
