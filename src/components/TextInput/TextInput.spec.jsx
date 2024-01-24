import { TextInput } from '.';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('<Posts />', () => {
  it('should have a value of searchValue', () => {
    const fn = jest.fn();

    render(<TextInput searchValue={'testing'} handleChange={fn} />);
    const input = screen.getByPlaceholderText(/type your search/i);
    expect(input).toBeInTheDocument();
    expect(input.value).toBe('testing');
  });
  it('should call handleChange function on each key press', () => {
    const fn = jest.fn();
    render(<TextInput handleChange={fn} searchValue="any value" />);
    const input = screen.getByPlaceholderText(/type your search/i);
    const value = 'the value';
    userEvent.type(input, value);
    expect(input.value).toBe('any value');
    expect(fn).toHaveBeenCalledTimes(value.length);
  });
  it('should match snapshot', () => {
    const fn = jest.fn();
    const { container } = render(<TextInput searchValue="" handleChange={fn} />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
