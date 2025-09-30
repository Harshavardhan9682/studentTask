import { render, screen } from '@testing-library/react';
import Students from '../student/Students';
import { useSelector, useDispatch } from 'react-redux';

jest.mock('../axiosInstance/axiosInstance', () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
    post: jest.fn(),
    create: () => ({ get: jest.fn(), post: jest.fn() }),
  },
}));

jest.mock("../student/StudentsTable", () => ({
  __esModule: true,
  default: () => <div data-testid="mock-table" />
}));

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('react-toastify', () => ({
  ToastContainer: () => <div />,
  toast: { success: jest.fn(), error: jest.fn() },
}));

describe('Students Component', () => {
  const mockedDispatch = jest.fn();

  beforeEach(() => {
    (useDispatch as jest.Mock).mockReturnValue(mockedDispatch);
    (useSelector as jest.Mock).mockImplementation((selectorFn) =>
      selectorFn({
        students: {
          students: [
            { _id: '1', studentName: 'John Doe', email: 'john@example.com', studentClass: '10', age: 15, gender: 'Male', phone: '123', guardian: 'Parent' },
          ],
          loading: false,
          error: null,
          page: 1,
          limit: 5,
          totalPages: 1,
          query: '',
        },
      })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('studentTable renders', () => {
    render(<Students />);
    expect(screen.getByTestId("mock-table")).toBeInTheDocument();
  });
});
