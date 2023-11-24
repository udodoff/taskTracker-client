import { makeAutoObservable, runInAction } from 'mobx';
import { api } from '../api/config';
import axios from 'axios';
import { ETaskStatus, ITodo, IUser, authDto } from './types';

class TodoStore {
  todos: ITodo[] = [];
  authorized: boolean = false;
  user: IUser | null = null;
  createStatus: ETaskStatus = ETaskStatus.Planned;
  selectedTodo: ITodo | null = null;
  constructor() {
    makeAutoObservable(this);
  }
  getTodos = async (userId: number) => {
    try {
      const response = await api.get(`/tasks?userId=${userId}`);
      runInAction(() => {
        this.todos = response.data;
      });
    } catch (error) {
      return;
    }
  };

  signIn = async (authDto: authDto) => {
    try {
      const response = await axios.post(
        'http://localhost:3000/api/auth/signin',
        authDto,
      );
      if (response.data?.status == 'ok') {
        runInAction(() => {
          this.authorized = true;
          this.user = response.data.user;
        });
        return { status: 'ok' };
      }
      return { error: 'Wrong login or password' };
    } catch (error) {
      return { error: 'Wrong login or password' };
    }
  };
  signUp = async (authDto: authDto) => {
    try {
      const response = await axios.post(
        'http://localhost:3000/api/auth/signup',
        authDto,
      );
      if (response.data?.status == 'ok') {
        return { status: 'ok' };
      }
      return { error: 'User already exists' };
    } catch (error) {
      return { error: 'User already exists' };
    }
  };
  logout = async () => {
    try {
      await api.get('/auth/logout');
      runInAction(() => {
        this.authorized = false;
        this.user = null;
        this.todos = [];
      });
    } catch (err) {
      return;
    }
  };
  checkAuth = async () => {
    try {
      const response = await api.get('/auth/check');
      const { user } = response.data;
      runInAction(() => {
        this.authorized = true;
        this.user = user;
      });
      return user;
    } catch (error) {
      return;
    }
  };
  createTask = async (task: ITodo) => {
    try {
      const response = await api.post('/tasks/create', task);

      if (response.data?.status == 'ok') {
        runInAction(() => {
          this.todos = [...this.todos, response.data.task];
        });
        return { status: 'ok' };
      } else {
        return { error: 'Something went wrong' };
      }
    } catch (error) {
      return { error: 'Something went wrong' };
    }
  };
  changeTaskStatus = async (task: ITodo | null, status: ETaskStatus | null) => {
    if (!task || !status) {
      return;
    }
    const newTodo = { ...task, status };
    this.todos.splice(this.todos.indexOf(task), 1);
    this.todos.push(newTodo);
    try {
      api.post('/tasks/update', newTodo);
      return { status: 'ok' };
    } catch (error) {
      return { error: 'Something went wrong' };
    }
  };
  changeSelectedTodo = (todo: ITodo | null) => {
    this.selectedTodo = todo;
  };
  updateExistingTask = async (task: ITodo) => {
    this.todos = this.todos.filter(t => t.id !== task.id);
    this.todos.push(task);
    try {
      await api.post('/tasks/update', task);
      return { status: 'ok' };
    } catch (error) {
      return { error: 'Something went wrong' };
    }
  };
  deleteTodo = async (todoId: number | undefined) => {
    if (!todoId) {
      return { error: 'Something went wrong' };
    }
    this.todos = this.todos.filter(todo => todo.id !== todoId);
    try {
      await api.delete(`/tasks/${todoId}`);
      runInAction(() => {
        this.todos = this.todos.map(t => {
          if (t.parentTask == todoId) {
            t.parentTask = null;
          }
          return t;
        });
      });
      return { status: 'ok' };
    } catch {
      return { error: 'Something went wrong' };
    }
  };
  getChildrenTree = async (todoId: number) => {
    try {
      const response = await api.get(`/tasks/children?parentTask=${todoId}`);
      return response.data;
    } catch (error) {
      return;
    }
  };
}

export default new TodoStore();
