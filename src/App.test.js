import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

const mockLog = jest.fn()
jest.mock('./useLogging', () => () => ({ log: mockLog }))

afterEach(() => {
  jest.clearAllMocks()
})

global.fetch = () => Promise.resolve({ status: 500 })

test('fails on the mockLog assertion', async () => {
  render(<App />);

  await screen.findByText('Failed!');
  expect(mockLog).toHaveBeenCalledWith('kaboom!')
})

test('passes on the mockLog assertion, because we waitFor it?', async () => {
  render(<App />);

  await screen.findByText('Failed!');
  await waitFor(() => {
    expect(mockLog).toHaveBeenCalledWith('kaboom!')
  })  
});