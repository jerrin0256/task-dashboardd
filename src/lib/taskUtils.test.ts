import { changeStatus, filterTasks, sortTasks, Task } from './taskUtils';
describe('taskUtils', () => {
const sample: Task[] = [
{ id: 1, title: 'A', description: '', status: 'Todo', dueDate: '2025-01-01' },
{ id: 2, title: 'B', description: '', status: 'In Progress', dueDate: '2024-12-31' },
  ];
test('changeStatus cycles state', () => {
    const after = changeStatus(sample, 1);
    expect(after.find(t => t.id === 1)?.status).toBe('In Progress');
    const again = changeStatus(after, 1);
    expect(again.find(t => t.id === 1)?.status).toBe('Completed');
  });
test('filterTasks by status', () => {
    const filtered = filterTasks(sample, 'Todo', '');
    expect(filtered.length).toBe(1);
  });
test('search by title', () => {
    const filtered = filterTasks(sample, '', 'b');
    expect(filtered[0].title).toBe('B');
  });
test('sortTasks by date', () => {
    const sorted = sortTasks(sample);
    expect(sorted[0].id).toBe(2);
  });
});
